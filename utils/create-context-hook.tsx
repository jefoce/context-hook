import { createContext, useContext } from "react";
import { PascalCase, toPascalCase } from "./to-pascal-case";

type HookFunc<Payload, Return> = void extends Payload ? () => Return : (payload: Payload) => Return;
type Props<P> = void extends P ? { children?: React.ReactNode } : P & { children?: React.ReactNode };

type HookName<Name extends string> = `use${PascalCase<Name>}`;
type ProviderName<Name extends string> = `${PascalCase<Name>}Provider`;

type Result<P, R, Name extends string> = {
  [K in HookName<Name> | ProviderName<Name>]: K extends HookName<Name>
    ? () => R
    : <OutP = P>(props: Props<OutP>) => JSX.Element;
};

export const createContextHook = <P, R, Name extends string>(name: Name, useHook: HookFunc<P, R>) => {
  const Context = createContext({} as R);
  const pascal = toPascalCase(name);

  const hookName = `use${pascal}` as const;
  const providerName = `${pascal}Provider` as const;

  Context.displayName = name;

  return {
    [hookName]: () => useContext(Context),
    [providerName]: ({ children, ...props }: Props<P>) => (
      <Context.Provider value={useHook(props as any)} children={children} />
    ),
  } as Result<P, R, Name>;
};
