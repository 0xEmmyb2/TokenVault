import Link from "next/link";

const ImageBanner = ({
  isDarkMode = true,
  title = "Build the future of decentralized agriculture",
  description = "Secure, transparent, and community-driven blockchain participation.",
  imageUrl = "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1600&q=80",
  heightClass = "h-[320px] sm:h-[380px] lg:h-[420px]",
  align = "left",
  overlayStrength = "medium",
  primaryLabel = "Get Started",
  primaryHref = "/dashboard",
  secondaryLabel = "Learn More",
  secondaryHref = "/presale",
  className = "",
}) => {
  const alignmentClass = align === "center" ? "items-center text-center" : "items-start text-left";

  const overlayClass =
    overlayStrength === "strong"
      ? "bg-black/60"
      : overlayStrength === "light"
        ? "bg-black/30"
        : "bg-black/45";

  return (
    <section className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative overflow-hidden rounded-2xl border ${heightClass} ${
            isDarkMode ? "border-green-900/50" : "border-green-200/70"
          }`}
        >
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className={`absolute inset-0 ${overlayClass}`} />

          <div
            className={`relative z-10 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-end ${alignmentClass}`}
          >
            <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
                {description}
              </p>

              <div
                className={`mt-6 flex flex-wrap gap-3 ${
                  align === "center" ? "justify-center" : "justify-start"
                }`}
              >
                {primaryLabel && primaryHref && (
                  <Link
                    href={primaryHref}
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-green-500 hover:to-emerald-400"
                  >
                    {primaryLabel}
                  </Link>
                )}

                {secondaryLabel && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className="inline-flex items-center rounded-lg bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/25 transition-colors duration-200"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageBanner;
