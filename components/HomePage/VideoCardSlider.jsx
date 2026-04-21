import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlayCircle } from "react-icons/fi";

const envVideos = process.env.NEXT_PUBLIC_VIDEO_SLIDER_ITEMS;

const fallbackVideos = [
  {
    title: "Platform Overview",
    description: "A quick walkthrough of AgriToken ecosystem features.",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "How Presale Works",
    description: "Step-by-step guide to joining the ongoing token presale.",
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Community & Referral",
    description: "Learn how to invite others and grow with the community.",
    thumbnail: "https://images.unsplash.com/photo-1472653525502-fc569e405a74?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

const parseVideos = (value) => {
  if (!value || typeof value !== "string") return fallbackVideos;

  try {
    const parsed = JSON.parse(value);
    const cleaned = Array.isArray(parsed)
      ? parsed.filter(
          (item) =>
            item &&
            typeof item.title === "string" &&
            typeof item.description === "string" &&
            typeof item.thumbnail === "string" &&
            typeof item.videoUrl === "string",
        )
      : [];

    return cleaned.length > 0 ? cleaned : fallbackVideos;
  } catch (error) {
    return fallbackVideos;
  }
};

const VideoCardSlider = ({ isDarkMode = true, intervalMs = 5000 }) => {
  const videos = useMemo(() => parseVideos(envVideos), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = videos.length;

  useEffect(() => {
    if (total <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, total]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const activeVideo = videos[activeIndex];

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
              Video Highlights
            </p>
            <h2
              className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Learn faster with quick visual walkthroughs.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous video"
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
              aria-label="Next video"
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

        <article
          className={`rounded-2xl border overflow-hidden ${
            isDarkMode
              ? "bg-gray-900/60 border-green-900/50"
              : "bg-white border-green-200/70 shadow-[0_12px_32px_rgba(0,100,0,0.06)]"
          }`}
        >
          <a
            href={activeVideo.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="relative block group"
          >
            <img
              src={activeVideo.thumbnail}
              alt={activeVideo.title}
              className="w-full h-56 sm:h-72 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-gray-900 px-4 py-2 text-sm font-semibold">
                <FiPlayCircle className="text-base" />
                Play Video
              </span>
            </div>
          </a>

          <div className="p-5 sm:p-6">
            <h3
              className={`text-lg sm:text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {activeVideo.title}
            </h3>
            <p className={isDarkMode ? "mt-2 text-sm text-gray-300" : "mt-2 text-sm text-gray-600"}>
              {activeVideo.description}
            </p>
          </div>
        </article>

        {total > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {videos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to video ${index + 1}`}
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

export default VideoCardSlider;
