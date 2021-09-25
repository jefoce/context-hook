import React, { createContext, useContext } from "react";
import { PascalCase, toPascalCase } from "./to-pascal-case";

type HookFunc<P extends object | void, R extends object> = void extends P ? () => R : (payload: P) => R;
type Props<P extends object | void> = void extends P ? { children?: React.ReactNode } : P & { children?: React.ReactNode };

type HookName<Name extends string> = `use${PascalCase<Name>}`;
type ProviderName<Name extends string> = `${PascalCase<Name>}Provider`;

type Result<P extends object | void, R extends object, Name extends string> = {
  [K in HookName<Name> | ProviderName<Name>]: K extends HookName<Name>
    ? () => R
    : (props: Props<P>) => JSX.Element;
};

export const createContextHook = <P extends object | void, R extends object, Name extends string>(name: Name, useHook: HookFunc<P, R>) => {
  if (typeof name !== 'string' || !name)
    throw new TypeError('You should to pass string name.');
  
  if (typeof useHook !== 'function')
    throw new TypeError('You should to pass hook function.');

  const Context = createContext({} as R);
  const pascal = toPascalCase(name);

  const hookName = `use${pascal}` as const;
  const providerName = `${pascal}Provider` as const;

  Context.displayName = `${pascal}Context`;

  return {
    [hookName]: () => useContext(Context),
    [providerName]: ({ children, ...payload }: Props<any>) => (
      <Context.Provider value={useHook(payload as P)} children={children} />
    ),
  } as Result<P, R, Name>;
};