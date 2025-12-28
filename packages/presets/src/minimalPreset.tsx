import React from "react";
import { ModalLayout } from "@ivex0002/stack-modal";

export const minimalPreset: ModalLayout = {
  Background: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => {
    React.useEffect(() => {
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keyup", handleKeyUp);
      return () => window.removeEventListener("keyup", handleKeyUp);
    }, [onClose]);

    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    );
  },

  ModalWrap: ({
    children,
    isTop,
  }: {
    children: React.ReactNode;
    depth: number;
    isTop: boolean;
  }) => {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "hidden",
          opacity: isTop ? 1 : 0,
          pointerEvents: isTop ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      >
        {children}
      </div>
    );
  },
};
