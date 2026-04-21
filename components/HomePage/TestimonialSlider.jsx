import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const envTestimonials = process.env.NEXT_PUBLIC_TESTIMONIALS;

const fallbackTestimonials = [
  {
    quote:
      "AgriToken made it simple for me to explore blockchain-backed agriculture in a way that finally feels transparent.",
    name: "Daniel Okoro",
    role: "Early Investor",
  },
  {
    quote:
      "The dashboard and wallet flow are clear and fast. I can track activity and stay confident in every step.",
    name: "Priya Sharma",
    role: "Community Member",
  },
  {
    quote:
      "This is one of the few platforms balancing strong design with real utility for long-term ecosystem growth.",
    name: "Marcus Lee",
    role: "Web3 Analyst",
  },
];

const parseTestimonials = (value) => {
  if (!value || typeof value !== "string") return fallbackTestimonials;

  try {
    const parsed = JSON.parse(value);
    const cleaned = Array.isArray(parsed)
      ? parsed.filter(
          (item) =>
            item &&
            typeof item.quote === "string" &&
            typeof item.name === "string" &&
            typeof item.role === "string",
        )
      : [];

    return cleaned.length > 0 ? cleaned : fallbackTestimonials;
  } catch (error) {
    return fallbackTestimonials;
  }
};

const TestimonialCard = ({ testimonial, isDarkMode }) => (
  <article
    className={`rounded-2xl border p-6 sm:p-7 transition-colors duration-200 ${
      isDarkMode
        ? "bg-gray-900/60 border-green-900/50"
        : "bg-white border-green-200/70 shadow-[0_12px_32px_rgba(0,100,0,0.06)]"
    }`}
  >
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FiStar key={i} className="text-amber-400 fill-amber-400/20" />
      ))}
    </div>

    <p
      className={`mt-4 text-sm sm:text-base leading-relaxed ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      "{testimonial.quote}"
    </p>

    <div className="mt-5">
      <p
        className={`text-sm font-semibold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {testimonial.name}
      </p>
      <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {testimonial.role}
      </p>
    </div>
  </article>
);

const TestimonialSlider = ({ isDarkMode = true, intervalMs = 4500 }) => {
  const testimonials = useMemo(
    () => parseTestimonials(envTestimonials),
    [],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const total = testimonials.length;

  useEffect(() => {
    if (total <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, total]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p
              className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
                isDarkMode ? "text-green-400" : "text-green-700"
              }`}
            >
              Community Feedback
            </p>
            <h2
              className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What users say about the AgriToken experience.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
                isDarkMode
                  ? "border-green-900/60 text-gray-300 hover:bg-green-900/30"
                  : "border-green-200 text-gray-700 hover:bg-green-50"
              }`}
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
                isDarkMode
                  ? "border-green-900/60 text-gray-300 hover:bg-green-900/30"
                  : "border-green-200 text-gray-700 hover:bg-green-50"
              }`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <TestimonialCard
          testimonial={testimonials[activeIndex]}
          isDarkMode={isDarkMode}
        />

        {total > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === activeIndex
                    ? "w-6 bg-green-500"
                    : isDarkMode
                      ? "w-2 bg-gray-700 hover:bg-gray-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSlider;
