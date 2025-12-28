import React from "react";
import type { ModalRegistry, ModalLayout } from "./type";
import { type StackStore } from "./createStackStore";

export function ModalRender<M extends ModalRegistry>({
  modals,
  modalLayout,
  store,
}: {
  modals: M;
  modalLayout: ModalLayout;
  store: StackStore;
}) {
  const stack = React.useSyncExternalStore(
    store.subscribe,
    store.get,
    store.get
  );

  if (stack.length === 0) return null;

  return (
    <modalLayout.Background onClose={() => store.pop()}>
      {stack.map((item, index) => {
        const depth = stack.length - 1 - index;
        return (
          <modalLayout.ModalWrap
            depth={depth}
            isTop={index === stack.length - 1}
            key={index}
          >
            {modals[item.key](item.props as never)}
          </modalLayout.ModalWrap>
        );
      })}
    </modalLayout.Background>
  );
}
