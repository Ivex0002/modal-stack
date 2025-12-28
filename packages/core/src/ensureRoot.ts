import { createRoot } from "react-dom/client";
import type { ReactElement } from "react";

export function ensureRoot(render: () => ReactElement) {
  const container = document.createElement("div");
  container.setAttribute("data-modal-root", "true");
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(render());
  return {
    destroy: () => {
      root.unmount();
      container.remove();
    },
  };
}
