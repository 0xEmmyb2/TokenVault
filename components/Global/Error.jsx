import { useEffect, useRef, useState } from "react";
import { FiAlertTriangle, FiRefreshCw, FiClock, FiAlertCircle } from "react-icons/fi";

const Error = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  isDarkMode = true,
  compact = false,
  onRetry,
  retryLabel = "Try Again",
  onResetRetries,
  className = "",
}) => {
  const [retryCount, setRetryCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);
  const intervalRef = useRef(null);

  const MAX_FIRST_TIER = 3; // 3 retries with 30s cooldown
  const MAX_SECOND_TIER = 5; // 2 more retries with 60s cooldown
  const FIRST_COOLDOWN = 30; // 30 seconds
  const SECOND_COOLDOWN = 60; // 60 seconds

  // Determine cooldown duration based on retry count
  const getCooldownDuration = (count) => {
    if (count >= MAX_FIRST_TIER && count < MAX_SECOND_TIER) {
      return SECOND_COOLDOWN;
    }
    return FIRST_COOLDOWN;
  };

  // Determine if user has exceeded all retries
  const hasExceededRetries = retryCount >= MAX_SECOND_TIER;

  // Handle cooldown timer
  useEffect(() => {
    if (cooldownTime <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCooldownTime((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(intervalRef.current);
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cooldownTime]);

  const handleRetry = () => {
    if (cooldownTime > 0 || hasExceededRetries) return;

    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);

    // Trigger cooldown after reaching the tier limit
    if (
      (newRetryCount === MAX_FIRST_TIER || newRetryCount === MAX_SECOND_TIER)
    ) {
      const cooldownDuration = getCooldownDuration(newRetryCount);
      setCooldownTime(cooldownDuration);
    }

    onRetry?.();
  };

  const handleReset = () => {
    setRetryCount(0);
    setCooldownTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onResetRetries?.();
  };

  const isRetryDisabled = cooldownTime > 0 || hasExceededRetries;
  const currentTier = retryCount > MAX_FIRST_TIER ? "second" : "first";
  const isInSecondTier = retryCount >= MAX_FIRST_TIER;

  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 sm:p-5 ${
        isDarkMode
          ? "bg-red-950/30 border-red-900/50 text-red-100"
          : "bg-red-50 border-red-200 text-red-900"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            isDarkMode
              ? "bg-red-900/40 text-red-300"
              : "bg-red-100 text-red-600"
          }`}
        >
          <FiAlertTriangle />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>
            {title}
          </h3>
          {message && (
            <p
              className={`mt-1 leading-relaxed ${
                compact ? "text-xs" : "text-sm"
              } ${isDarkMode ? "text-red-200/90" : "text-red-800/90"}`}
            >
              {message}
            </p>
          )}

          {/* Retry count display */}
          {retryCount > 0 && (
            <div
              className={`mt-2 flex items-center gap-1.5 p-2 rounded-lg ${
                isDarkMode
                  ? isInSecondTier
                    ? "bg-red-900/40 text-red-200"
                    : "bg-red-900/20 text-red-200/70"
                  : isInSecondTier
                    ? "bg-red-100 text-red-700"
                    : "bg-red-50 text-red-600/70"
              } ${compact ? "text-xs" : "text-sm"}`}
            >
              <span className="font-semibold">
                Retry attempts: {retryCount}/{MAX_SECOND_TIER}
              </span>
              {isInSecondTier && (
                <span className="ml-auto px-2 py-1 rounded text-xs font-bold bg-yellow-600/40 text-yellow-200">
                  Escalated
                </span>
              )}
            </div>
          )}

          {/* Cooldown message */}
          {cooldownTime > 0 && (
            <div
              className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 ${
                isInSecondTier
                  ? isDarkMode
                    ? "bg-yellow-900/40 text-yellow-200"
                    : "bg-yellow-100/50 text-yellow-700"
                  : isDarkMode
                    ? "bg-red-900/30 text-red-200"
                    : "bg-red-100/50 text-red-700"
              }`}
            >
              <FiClock className="w-4 h-4 shrink-0" />
              <span
                className={`font-semibold ${compact ? "text-xs" : "text-sm"}`}
              >
                Please wait {cooldownTime}s before retrying
                {isInSecondTier && " (Escalated cooldown)"}
              </span>
            </div>
          )}

          {/* Max retries exceeded message */}
          {hasExceededRetries && cooldownTime === 0 && (
            <div
              className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 ${
                isDarkMode
                  ? "bg-red-900/50 text-red-100"
                  : "bg-red-200/50 text-red-800"
              }`}
            >
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              <span className={`font-semibold ${compact ? "text-xs" : "text-sm"}`}>
                Maximum retry attempts exceeded. Please contact support or try again later.
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {typeof onRetry === "function" && (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetryDisabled}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  isRetryDisabled
                    ? isDarkMode
                      ? "bg-red-900/20 text-red-300/50 cursor-not-allowed"
                      : "bg-red-50 text-red-400 cursor-not-allowed"
                    : isDarkMode
                      ? "bg-red-900/50 hover:bg-red-900/70 text-red-100"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                }`}
              >
                <FiRefreshCw />
                {hasExceededRetries
                  ? "Max retries reached"
                  : isRetryDisabled
                    ? "Retry disabled"
                    : retryLabel}
              </button>
            )}

            {/* Reset button - shown only when retries have been attempted */}
            {retryCount > 0 && typeof onResetRetries === "function" && (
              <button
                type="button"
                onClick={handleReset}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  isDarkMode
                    ? "bg-gray-700/50 hover:bg-gray-700/70 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
