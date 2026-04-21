import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiArrowRight, FiX } from "react-icons/fi";


const Success = ({
  title = "Success",
  message = "Operation completed successfully.",
  isDarkMode = true,
  compact = false,
  onAction,
  actionLabel = "Continue",
  onDismiss,
  autoDismiss = 0,
  className = "",
}) => {
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  const startRef = useRef(null);

  // Auto-dismiss with a visible countdown progress bar
  useEffect(() => {
    if (!autoDismiss || !onDismiss) return;

    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, 100 - (elapsed / autoDismiss) * 100);
      setProgress(remaining);
      if (remaining === 0) {
        clearInterval(intervalRef.current);
        onDismiss();
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [autoDismiss, onDismiss]);

  const iconSize = compact ? 16 : 18;
  const padding = compact ? "p-3 sm:p-3.5" : "p-4 sm:p-5";
  const titleSize = compact ? "text-sm" : "text-base";
  const bodySize = compact ? "text-xs" : "text-sm";
  const btnPadding = compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-xs sm:text-sm";
  const iconBoxSize = compact ? "w-7 h-7" : "w-9 h-9";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[
        "rounded-xl border overflow-hidden",
        isDarkMode
          ? "bg-green-950/30 border-green-900/50 text-green-100"
          : "bg-green-50 border-green-200 text-green-900",
        className,
      ].join(" ")}
    >
      {/* Auto-dismiss countdown bar */}
      {autoDismiss > 0 && onDismiss && (
        <div
          className={`h-0.5 transition-none ${
            isDarkMode ? "bg-green-400/50" : "bg-green-400"
          }`}
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      )}

      <div className={`flex items-start gap-3 ${padding}`}>
        {/* Icon */}
        <span
          className={[
            "rounded-lg flex items-center justify-center shrink-0",
            iconBoxSize,
            isDarkMode
              ? "bg-green-900/40 text-green-300"
              : "bg-green-100 text-green-600",
          ].join(" ")}
          aria-hidden="true"
        >
          <FiCheckCircle size={iconSize} />
        </span>

        {/* Body */}
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold leading-snug ${titleSize}`}>{title}</h3>

          {message && (
            <p
              className={[
                "mt-1 leading-relaxed",
                bodySize,
                isDarkMode ? "text-green-200/90" : "text-green-800/90",
              ].join(" ")}
            >
              {message}
            </p>
          )}

          {typeof onAction === "function" && (
            <button
              type="button"
              onClick={onAction}
              className={[
                "mt-2.5 inline-flex items-center gap-1.5 rounded-lg font-semibold transition-colors",
                btnPadding,
                isDarkMode
                  ? "bg-green-900/50 hover:bg-green-900/70 text-green-100"
                  : "bg-green-100 hover:bg-green-200 text-green-700",
              ].join(" ")}
            >
              <FiArrowRight size={14} aria-hidden="true" />
              {actionLabel}
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {typeof onDismiss === "function" && (
          <button
            type="button"
            onClick={() => {
              clearInterval(intervalRef.current);
              onDismiss();
            }}
            aria-label="Dismiss"
            className={[
              "shrink-0 rounded-md p-1 transition-colors -mr-1 -mt-0.5",
              isDarkMode
                ? "text-green-400 hover:text-green-200 hover:bg-green-900/40"
                : "text-green-500 hover:text-green-700 hover:bg-green-100",
            ].join(" ")}
          >
            <FiX size={15} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Success;