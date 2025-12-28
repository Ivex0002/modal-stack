import type { StackItem } from "./type";

export const createStackStore = () => {
  let stack: StackItem[] = [];
  const listeners = new Set<() => void>();
  return {
    push(item: StackItem) {
      stack = [...stack, item];
      listeners.forEach((l) => l());
    },
    pop() {
      stack = stack.slice(0, -1);
      listeners.forEach((l) => l());
    },
    get() {
      return stack;
    },
    subscribe(fn: () => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
};

export type StackStore = ReturnType<typeof createStackStore>;
