import React from "react";
import { ModalLayout } from "modal-stack";

export const drawerPreset: ModalLayout = {
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
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          transition: "background-color 0.3s ease",
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
    const translateY = depth * 50;

    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: `
          translate(-50%, 0)
          translateY(-${translateY}px)
        `,
          backgroundColor: "#fff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "20px",
          paddingTop: "12px",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isTop ? "auto" : "none",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "#e0e0e0",
            borderRadius: "2px",
            margin: "0 auto 16px",
          }}
        />
        {children}
      </div>
    );
  },
};
