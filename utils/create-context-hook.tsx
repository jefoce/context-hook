import { createContext, useContext } from "react";
import { PascalCase, toPascalCase } from "./to-pascal-case";

type HookFunc<P extends object, R extends object> = void extends P ? () => R : (payload: P) => R;
type Props<P extends object> = void extends P ? { children?: React.ReactNode } : P & { children?: React.ReactNode };

type HookName<Name extends string> = `use${PascalCase<Name>}`;
type ProviderName<Name extends string> = `${PascalCase<Name>}Provider`;

type Result<P extends object, R extends object, Name extends string> = {
  [K in HookName<Name> | ProviderName<Name>]: K extends HookName<Name>
    ? () => R
    : <OutP extends object = P>(props: Props<OutP>) => JSX.Element;
};

export const createContextHook = <P extends object, R extends object, Name extends string>(name: Name, useHook: HookFunc<P, R>) => {
  const Context = createContext({} as R);
  const pascal = toPascalCase(name);

  const hookName = `use${pascal}` as const;
  const providerName = `${pascal}Provider` as const;

  Context.displayName = name;

  return {
    [hookName]: () => useContext(Context),
    [providerName]: ({ children, ...payload }: Props<P>) => (
      <Context.Provider value={useHook(payload as P)} children={children} />
    ),
  } as Result<P, R, Name>;
};
