const blurStrengthMap = {
  none: "backdrop-blur-0",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
};

const opacityMap = {
  light: "bg-black/20",
  medium: "bg-black/35",
  strong: "bg-black/55",
};

const BlurOverlay = ({
  isVisible = true,
  isDarkMode = true,
  blur = "md",
  opacity = "medium",
  gradient = false,
  fixed = true,
  className = "",
  onClick,
  zIndexClass = "z-40",
  children,
}) => {
  if (!isVisible) return null;

  const blurClass = blurStrengthMap[blur] || blurStrengthMap.md;
  const bgClass = opacityMap[opacity] || opacityMap.medium;

  const gradientClass = gradient
    ? isDarkMode
      ? "bg-gradient-to-br from-green-900/20 via-black/30 to-gray-950/60"
      : "bg-gradient-to-br from-green-100/40 via-white/40 to-gray-100/60"
    : bgClass;

  return (
    <div
      role={onClick ? "button" : "presentation"}
      aria-label={onClick ? "blur overlay" : undefined}
      onClick={onClick}
      className={`${fixed ? "fixed" : "absolute"} inset-0 ${zIndexClass} ${blurClass} ${gradientClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default BlurOverlay;
