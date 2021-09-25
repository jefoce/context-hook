# React Context Hook Builder

[![Version][version]][npm] [![Bundled size][size-badge]][size] ![Coverage badge gree][coverage-badge-green] ![Typed Codebase][typescript] ![MIT License][license]

[version]: https://flat.badgen.net/npm/v/context-hook
[npm]: https://npmjs.com/package/context-hook
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=context-hook
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/context-hook
[typescript]: https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label
[coverage-badge-green]: https://flat.badgen.net/coveralls/c/github/jekyll/jekyll

Simple util that resolves common cases with react Context API.

Util generates provider and hook dynamically from passed name.

## Installation

```terminal
npm install context-hook
```

```terminal
yarn add context-hook
```

## Usage

> Create context

```typescript
/* 
 * useCounter.ts
 */
import { useState } from 'react';
import { createContextHook } from 'context-hook';

type Props = {
  defaultCount: number;
}

// Or you can create without props
const useCounterLocal = (props: Props) => {
  const [count, setCount] = useState(payload.defaultCount);

  const increment = () => setCount((prev) => ++prev);
  const decrement = () => setCount((prev) => --prev);

  return [count, increment, decrement];
};

export const { CounterProvider, useCounter } = createContextHook('Counter', useCounterLocal) ;
```

> Connect to UI

```typescript
/* 
 * SomeUi.tsx
 */
import { useCounter } from './useCounter';
import { SomeUiComponent } from './SomeUiComponent';

const SomeUi: React.VFC = () => {
  return (
    <CounterProvider defaultCount={2}>
      <SomeUiComponent />
    </CounterProvider>
  );
};
```

> Use

```typescript
/* 
 * SomeUiComponent.tsx
 */
import { useCounter } from './useCounter';

export const SomeUiComponent: React.VFC = () => {
  const [count, increment, decrement] = useCounter();

  // - Count: 2 +
  return (
    <div>
      <button onClick={increment}>-</button>
      <p>Count: {count}</p>
      <button onClick={decrement}>+</button>
    </div>
  );
};
```
