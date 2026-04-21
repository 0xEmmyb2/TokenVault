import { useMemo, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

const envFaq = process.env.NEXT_PUBLIC_FAQ_ITEMS;

const fallbackFaq = [
  {
    question: "What is AgriToken?",
    answer:
      "AgriToken is a blockchain-based ecosystem focused on transparent and accessible participation in agriculture-related Web3 products.",
  },
  {
    question: "How do I buy tokens in the presale?",
    answer:
      "Connect a compatible wallet, open the presale page, choose your amount, and confirm the transaction on-chain.",
  },
  {
    question: "Where can I track token activity?",
    answer:
      "You can monitor token transactions and wallet activity through the integrated dashboard and blockchain explorer links.",
  },
  {
    question: "Is a wallet required to use the platform?",
    answer:
      "Yes. A wallet is required for on-chain actions such as buying tokens, holding assets, and interacting with platform features.",
  },
  {
    question: "How can I stay updated?",
    answer:
      "Follow official community channels and check the dashboard/resources sections for announcements and ecosystem updates.",
  },
];

const parseFaqItems = (value) => {
  if (!value || typeof value !== "string") return fallbackFaq;

  try {
    const parsed = JSON.parse(value);
    const cleaned = Array.isArray(parsed)
      ? parsed.filter(
          (item) =>
            item &&
            typeof item.question === "string" &&
            typeof item.answer === "string",
        )
      : [];

    return cleaned.length > 0 ? cleaned : fallbackFaq;
  } catch (error) {
    return fallbackFaq;
  }
};

const FAQComponent = ({ isDarkMode = true }) => {
  const faqItems = useMemo(() => parseFaqItems(envFaq), []);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <p
            className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Frequently Asked Questions
          </p>
          <h2
            className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Clear answers before you get started.
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Find quick guidance on tokens, wallets, tracking, and ecosystem access.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className={`rounded-xl border overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-900/60 border-green-900/50"
                    : "bg-white border-green-200/70 shadow-[0_8px_24px_rgba(0,100,0,0.05)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`w-full px-5 py-4 flex items-center justify-between gap-3 text-left ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold">
                    {item.question}
                  </span>
                  <FiChevronDown
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-green-500" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 pb-5 text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className={isDarkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
            Still have questions?{" "}
            <Link
              href="/dashboard"
              className={
                isDarkMode
                  ? "text-green-300 hover:text-green-200 font-semibold"
                  : "text-green-700 hover:text-green-800 font-semibold"
              }
            >
              Visit dashboard resources
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
