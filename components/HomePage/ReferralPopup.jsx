import { useEffect, useMemo, useState } from "react";
import { FiX, FiCopy, FiCheck, FiGift } from "react-icons/fi";

const defaultCode = process.env.NEXT_PUBLIC_DEFAULT_REFERRAL_CODE || "AGRI2026";
const referralReward = process.env.NEXT_PUBLIC_REFERRAL_REWARD || "5%";

const ReferralPopup = ({
  isOpen = false,
  onClose,
  isDarkMode = true,
  referralCode = defaultCode,
}) => {
  const [copied, setCopied] = useState(false);
  const safeCode = useMemo(() => referralCode || defaultCode, [referralCode]);

  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEsc = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(safeCode);
      } else {
        const temp = document.createElement("textarea");
        temp.value = safeCode;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close referral popup backdrop"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Referral reward popup"
        className={`relative w-full max-w-md rounded-2xl border p-6 sm:p-7 ${
          isDarkMode
            ? "bg-gray-950 border-green-900/50 text-white"
            : "bg-white border-green-200/70 text-gray-900 shadow-[0_16px_40px_rgba(0,100,0,0.12)]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close referral popup"
          className={`absolute right-3 top-3 w-8 h-8 rounded-lg flex items-center justify-center ${
            isDarkMode
              ? "text-gray-300 hover:bg-green-900/30"
              : "text-gray-600 hover:bg-green-50"
          }`}
        >
          <FiX />
        </button>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            isDarkMode ? "bg-green-900/40 text-green-300" : "bg-green-100 text-green-700"
          }`}
        >
          <FiGift className="text-xl" />
        </div>

        <p
          className={`mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
            isDarkMode ? "text-green-400" : "text-green-700"
          }`}
        >
          Referral Reward
        </p>
        <h3 className="mt-2 text-xl sm:text-2xl font-bold leading-tight">
          Invite friends and earn up to {referralReward}.
        </h3>
        <p className={isDarkMode ? "mt-3 text-sm text-gray-300" : "mt-3 text-sm text-gray-600"}>
          Share your referral code below. When your invite joins and participates,
          your reward is automatically tracked.
        </p>

        <div
          className={`mt-5 rounded-xl border p-3 flex items-center gap-3 ${
            isDarkMode
              ? "bg-gray-900/60 border-green-900/50"
              : "bg-green-50/60 border-green-200/70"
          }`}
        >
          <code
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold tracking-wide ${
              isDarkMode ? "bg-gray-900 text-green-300" : "bg-white text-green-700"
            }`}
          >
            {safeCode}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
              isDarkMode
                ? "bg-green-900/50 text-green-300 hover:bg-green-900/70"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPopup;
