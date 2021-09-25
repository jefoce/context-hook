# React Context Hook Builder

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

## Usage

### Void payload

```typescript
// useCounter.tsx
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

  // Uses Context.Provider with 'CounterContext' displayName.
  CounterProvider, 

  // Uses useContext(Context).
  useCounter 

} = createContextHook('Counter', useCounterLocal);

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
import { useCounter } from './useCounter';

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

### Typed payload

```typescript
// useCounter.tsx
import { useState } from 'react';
import { createContextHook } from 'context-hook';

type Payload = {
  defaultCount: number;
}

const useCounterLocal = (payload: Payload) => {
  const [count, setCount] = useState(payload.defaultCount);

  const increment = () => setCount((prev) => ++prev);
  const decrement = () => setCount((prev) => --prev);

  return [count, increment, decrement];
};

export const { CounterProvider, useCounter } = createContextHook('Counter', useCounterLocal) ;

// SomeUi.tsx
import { useCounter } from './useCounter';
import { SomeUiComponent } from './SomeUiComponent';

const SomeUi: React.VFC = () => {
  return (
    <CounterProvider defaultCount={2}>
      <SomeUiComponent />
    </CounterProvider>
  );
};

// SomeUiComponent.tsx
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
