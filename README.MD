# **React Context Hook Builder**

Simple util that resolves common cases with react Context API.

Util generates provider and hook dynamically from passed name.

## Installation

```terminal
npm install context-hook
```

or

```terminal
yarn add context-hook
```

## Build examples

### Separated logic hook and context

```typescript
import { useState } from 'react';
import { createContextHook } from 'context-hook';

// Some logic (able to test separately)
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

### Built-in

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

### With provided payload

```typescript
import { useState } from 'react';
import { createContextHook } from 'context-hook';

type Payload = {
  defaultCount: number;
}

export const { CounterProvider, useCounter } = createContextHook('Counter', (payload: Payload) => {
  const [count, setCount] = useState(payload.defaultCount);

  const increment = () => setCount((prev) => ++prev);
  const decrement = () => setCount((prev) => --prev);

  return [count, increment, decrement];
});
```

## Using examples

### Default

```typescript
// SomeUi.tsx
import { CounterProvider } from './useCounter';
import { SomeUiComponent } from './SomeUiComponent';

const SomeUi: React.VFC = () => {
  return (
    <CounterProvider>
      <SomeUiComponent />
    </CounterProvider>
  );
};

// SomeUiComponent.tsx
import { CounterProvider } from './useCounter';

export const SomeUiComponent: React.VFC = () => {
  const [count, increment, decrement] = useCounter();

  // - Count: 0 +
  return (
    <div>
      <button onClick={increment}>-</button>
      <p>Count: {count}</p>
      <button onClick={decrement}>+</button>
    </div>
  );
};
```

### With payload

```typescript
// SomeUi.tsx
import { CounterProvider } from './useCounter';
import { SomeUiComponent } from './SomeUiComponent';

const SomeUi: React.VFC = () => {
  return (
    <CounterProvider defaultCount={2}>
      <SomeUiComponent />
    </CounterProvider>
  );
};

// SomeUiComponent.tsx
import { CounterProvider } from './useCounter';

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
