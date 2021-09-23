# React Context Hook Builder

Simple util that resolves common cases with react Context API.

Util generates provider and hook dynamically of passed name.

## Installation

```terminal
npm install context-hook
```

or

```terminal
yarn add context-hook
```

## Using example

```typescript
import { useState } from 'react';
import { createContextHook } from 'context-hook';

// Some logic
const useCounterLocal = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => ++prev);
  const decrement = () => setCount((prev) => --prev);

  return [count, increment, decrement];
}

export const { 

  // Using Context.Provider with 'Counter' displayName, where call useCounterLocal.
  CounterProvider, 

  // Using useContext(Context).
  useCounter 

} = createContextHook('Counter', useCounterLocal)
```

or

```typescript
import { useState } from 'react';
import { createContextHook } from 'context-hook';

export const { CounterProvider, useCounter } = createContextHook('Counter', () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => ++prev);
  const decrement = () => setCount((prev) => --prev);

  return [count, increment, decrement];
});
```
