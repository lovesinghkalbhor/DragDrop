import React from "react";
import type { ToastMessageProps } from "../Types/Toast";

export const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  type,
}) => {
  const baseStyle: React.CSSProperties = {
    padding: "10px 15px",
    borderRadius: "5px",
    color: "white",
    marginBottom: "10px",
    opacity: 0.9,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "opacity 0.3s ease-in-out",
  };

  const typeStyles = {
    success: { backgroundColor: "#4CAF50" },
    error: { backgroundColor: "#F44336" },
    info: { backgroundColor: "#2196F3" },
  };

  return <div style={{ ...baseStyle, ...typeStyles[type] }}>{message}</div>;
};
