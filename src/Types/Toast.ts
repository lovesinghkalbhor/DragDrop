export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export interface ToastMessageProps {
  message: string;
  type: "success" | "error" | "info";
}
