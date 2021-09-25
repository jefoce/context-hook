import { toPascalCase } from "../to-pascal-case";

test('Empty string', () => {
  expect(toPascalCase('')).toBe('');
  expect(toPascalCase(null as any)).toBe('');
  expect(toPascalCase(undefined as any)).toBe('');
  expect(toPascalCase(isNaN as any)).toBe('');
  expect(toPascalCase({} as any)).toBe('');
  expect(toPascalCase([] as any)).toBe('');
});

test('Returns pascal string', () => {
  expect(toPascalCase('hiJest')).toBe('HiJest');
  expect(toPascalCase('hi_jest')).toBe('HiJest');
  expect(toPascalCase('hi-jest')).toBe('HiJest');
});
