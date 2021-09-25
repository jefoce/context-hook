import camelCase from 'lodash/camelCase';

export const toPascalCase = <T extends string>(value: T) => {
  if (value?.length === 0 || typeof value !== 'string') return '';
  const camel = camelCase(value);
  return camel[0].toLocaleUpperCase() + camel.slice(1) as PascalCase<T>;
};

export type PascalCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Capitalize<P1>}${Uppercase<P2>}${PascalCase<P3>}`
  : Capitalize<S>
