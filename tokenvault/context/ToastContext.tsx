"use client";
import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ToastStyle {
  background?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  boxShadow?: string;
  borderLeft?: string;
}

interface NotifyType {
  start: (message?: string) => string;
  update: (id: string, state: ToastState, message: string) => string | undefined;
  approve: (id: string, message?: string) => string | undefined;
  complete: (id: string, message?: string) => string | undefined;
  reject: (id: string, message?: string) => string | undefined;
  failed: (id: string, message?: string) => string | undefined;
}

interface ToastContextType {
  showProcessing: (message: string) => string;
  showApprove: (message: string) => string;
  showComplete: (message: string) => string;
  showReject: (message: string) => string;
  showFailed: (message: string) => string;
  showInfo: (message: string) => string;
  updateToast: (id: string, state: ToastState, message: string) => string | undefined;
  notify: NotifyType;
  toast: typeof toast;
}

type ToastState = "processing" | "approve" | "complete" | "reject" | "failed" | "info";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_COLOR = "#13101A";

const TOAST_STYLE: Record<string, ToastStyle> = {
  common: {
    background: BRAND_COLOR,
    color: "white",
    padding: "16px",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  processing: {
    borderLeft: "4px solid #facc15",
  },
  approve: {
    borderLeft: "4px solid #22c55e",
  },
  complete: {
    borderLeft: "4px solid #22c55e",
  },
  reject: {
    borderLeft: "4px solid #d20e0e",
  },
  failed: {
    borderLeft: "4px solid #dd0b0b",
  },
  info: {
    borderLeft: "4px solid #2ed3c0",
  },
};

// ── Context ───────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showProcessing = (message: string): string => {
    return toast.loading(message, {
      style: {
        ...TOAST_STYLE.common,
        ...TOAST_STYLE.processing,
      },
    });
  };

  const showApprove = (message: string): string => {
    return toast.success(message, {
      style: {
        ...TOAST_STYLE.common,
        ...TOAST_STYLE.approve,
      },
      duration: 5000,
    });
  };

  const showComplete = (message: string): string => {
    return toast.success(message, {
      style: {
        ...TOAST_STYLE.common,
        ...TOAST_STYLE.complete,
      },
      duration: 5000,
    });
  };

  const showReject = (message: string): string => {
    return toast.error(message, {
      style: {
        ...TOAST_STYLE.common,
        ...TOAST_STYLE.reject,
      },
      duration: 5000,
    });
  };

  const showFailed = (message: string): string => {
    return toast.error(message, {
      style: {
        ...TOAST_STYLE.common,
        ...TOAST_STYLE.failed,
      },
      duration: 5000,
    });
  };

  const showInfo = (message: string): string => {
    return toast.error(message, {
      style: {
        ...TOAST_STYLE.common,
        ...TOAST_STYLE.info,
      },
      duration: 4000,
    });
  };

  const updateToast = (id: string, state: ToastState, message: string): string | undefined => {
    if (!id) return; // Check for the id Availability
    toast.dismiss(id);

    switch (state) {
      case "processing":
        return showProcessing(message);
      case "approve":
        return showApprove(message);
      case "complete":
        return showComplete(message);
      case "reject":
        return showReject(message);
      case "failed":
        return showFailed(message);
      case "info":
      default:
        return showInfo(message);
    }
  };

  const notify: NotifyType = {
    start: (message: string = "Processing transaction......") => {
      return showProcessing(message);
    },
    update: (id: string, state: ToastState, message: string) => {
      return updateToast(id, state, message);
    },
    approve: (id: string, message: string = "Transaction Approved!") => {
      return updateToast(id, "approve", message);
    },
    complete: (id: string, message: string = "Transaction Completed Successfully!") => {
      return updateToast(id, "complete", message);
    },
    reject: (id: string, message: string = "Transaction rejected!") => {
      return updateToast(id, "reject", message);
    },
    failed: (id: string, message: string = "Transaction failed!") => {
      return updateToast(id, "failed", message);
    },
  };

  return (
    <ToastContext.Provider
      value={{
        showProcessing,
        showApprove,
        showComplete,
        showReject,
        showFailed,
        showInfo,
        updateToast,
        notify,
        toast,
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#00ff5e",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#d11919",
              secondary: "white",
            },
          },
        }}
      />
      {children}
    </ToastContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be within a ToastProvider");
  }

  return context;
};