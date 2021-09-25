import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";
import { createContextHook } from "../create-context-hook";

type Props = {
  str: string;
}

test("Empty func", () => {
  const create = () => createContextHook("Some", null as any);
  expect(create).toThrowError("You should to pass hook function.");
});

test("Empty name", () => {
  const create = () => createContextHook("", () => ({}));
  expect(create).toThrowError("You should to pass string name.");
});

test("With correct args and provided props", async () => {
  const { HookProvider, useHook } = createContextHook(
    "Hook",
    (props: Props) => ({
      count: 10,
      ...props,
    })
  );

  const Component: React.VFC = () => {
    const { count, str } = useHook();
    return <>{count + str}</>;
  };

  const Wrapper: React.VFC = () => (
    <HookProvider str='string'>
      <Component />
    </HookProvider>
  );

  const { findByText } = render(<Wrapper />);
  const component = await findByText('10string');

  expect(component).not.toBeNull();
});
