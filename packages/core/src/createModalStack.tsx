import { ensureRoot } from "./ensureRoot";
import { ModalRender } from "./ModalRender";
import { createStackStore } from "./createStackStore";
import type { ModalLayout, ModalRegistry, PushFn } from "./type";

export function createModalStack<M extends ModalRegistry = ModalRegistry>(
  modals: M,
  modalLayout: ModalLayout
) {
  type ModalKey = Extract<keyof M, string>;
  const store = createStackStore();

  ensureRoot(() => (
    <ModalRender modals={modals} modalLayout={modalLayout} store={store} />
  ));

  const modal = {} as {
    [K in ModalKey]: { push: PushFn<M[K]> };
  };

  (Object.keys(modals) as ModalKey[]).forEach((key) => {
    modal[key] = {
      push: (props?: unknown) => store.push({ key, props }),
    };
  });

  return { ...modal, pop: () => store.pop() };
}
