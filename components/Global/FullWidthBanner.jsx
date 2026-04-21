import { useState } from "react";
import Link from "next/link";
import { FiX, FiArrowRight } from "react-icons/fi";

const FullWidthBanner = ({
  isDarkMode = true,
  title = "Token Presale is Live",
  description = "Join early and explore ecosystem benefits while supply lasts.",
  primaryLabel = "Go to Presale",
  primaryHref = "/presale",
  secondaryLabel = "View Dashboard",
  secondaryHref = "/dashboard",
  dismissible = false,
  initialVisible = true,
  className = "",
}) => {
  const [visible, setVisible] = useState(initialVisible);

  if (!visible) return null;

  return (
    <section className={`w-full ${className}`}>
      <div
        className={`w-full border-y px-4 sm:px-6 lg:px-8 py-4 sm:py-5 ${
          isDarkMode
            ? "bg-gradient-to-r from-green-950/60 via-gray-950 to-green-950/60 border-green-900/40"
            : "bg-gradient-to-r from-green-50 via-white to-green-50 border-green-200/70"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={`text-base sm:text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <p
              className={`mt-1 text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {primaryLabel && primaryHref && (
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:from-green-500 hover:to-emerald-400"
              >
                {primaryLabel}
                <FiArrowRight />
              </Link>
            )}

            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isDarkMode
                    ? "text-green-300 hover:text-green-200"
                    : "text-green-700 hover:text-green-800"
                }`}
              >
                {secondaryLabel}
              </Link>
            )}

            {dismissible && (
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Dismiss banner"
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-green-900/30"
                    : "text-gray-600 hover:bg-green-100"
                }`}
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullWidthBanner;
