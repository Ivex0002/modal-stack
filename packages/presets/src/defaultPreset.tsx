import React from "react";
import { ModalLayout } from "@ivex0002/stack-modal";

const STACK_OFFSET = 100;
const SCALE_STEP = 0.08;

export const defaultPreset: ModalLayout = {
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
          zIndex: 1000,
          backgroundColor: "#00000020",
          backdropFilter: "blur(2px)",
          position: "fixed",
          inset: 0,
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
    depth,
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
          transform: `
          translate(-50%, -50%)
          translateX(-${depth * STACK_OFFSET}px)
          scale(${1 - depth * SCALE_STEP})
        `,
          transition: "transform 0.25s ease",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          pointerEvents: isTop ? "auto" : "none",
        }}
      >
        {children}
      </div>
    );
  },
};
