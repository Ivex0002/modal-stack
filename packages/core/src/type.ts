export type ModalRegistry = {
  [key: string]: (props?: unknown) => React.ReactNode;
};

type AnyFn = (...args: unknown[]) => unknown;

export type PushFn<F extends AnyFn> = Parameters<F> extends []
  ? () => void
  : (props?: Parameters<F>[0]) => void;

export type StackItem = {
  key: string;
  props: unknown;
};

export type ModalLayout = {
  Background: React.ComponentType<{
    children: React.ReactNode;
    onClose: () => void;
  }>;
  ModalWrap: React.ComponentType<{
    children: React.ReactNode;
    depth: number;
    isTop: boolean;
  }>;
};
