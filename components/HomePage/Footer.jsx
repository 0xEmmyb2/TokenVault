import Link from "next/link";
import { FiTwitter, FiSend, FiMessageCircle, FiMail } from "react-icons/fi";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "AGRI";
const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@agritoken.io";

const footerLinks = {
  platform: [
    { label: "Presale", href: "/presale" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Explorer", href: "/dashboard" },
  ],
  resources: [
    { label: "Whitepaper", href: "/dashboard" },
    { label: "Tokenomics", href: "/dashboard" },
    { label: "FAQ", href: "/dashboard" },
  ],
  community: [
    { label: "Referral Program", href: "/dashboard" },
    { label: "Ambassador Program", href: "/dashboard" },
    { label: "Announcements", href: "/dashboard" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: FiTwitter },
  { label: "Telegram", href: "https://t.me", icon: FiSend },
  { label: "Discord", href: "https://discord.gg/Dr454dPp", icon: FiMessageCircle },
];

const Footer = ({ isDarkMode = true }) => {
  return (
    <footer
      className={`px-4 sm:px-6 lg:px-8 pt-14 pb-8 border-t ${
        isDarkMode
          ? "bg-gray-950 text-white border-green-900/40"
          : "bg-white text-gray-800 border-green-200/70"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p
              className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
                isDarkMode ? "text-green-400" : "text-green-700"
              }`}
            >
              {TOKEN_NAME}
            </p>
            <h3
              className={`mt-3 text-xl sm:text-2xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Building transparent finance for modern agriculture.
            </h3>
            <p
              className={`mt-4 text-sm leading-relaxed max-w-md ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Join the {TOKEN_SYMBOL} ecosystem to explore secure, accessible,
              and community-driven blockchain participation.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${
                isDarkMode
                  ? "text-green-300 hover:text-green-200"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              <FiMail />
              {SUPPORT_EMAIL}
            </a>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
            <FooterColumn
              title="Platform"
              links={footerLinks.platform}
              isDarkMode={isDarkMode}
            />
            <FooterColumn
              title="Resources"
              links={footerLinks.resources}
              isDarkMode={isDarkMode}
            />
            <FooterColumn
              title="Community"
              links={footerLinks.community}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        <div
          className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDarkMode ? "border-green-900/40" : "border-green-200/70"
          }`}
        >
          <p className={isDarkMode ? "text-sm text-gray-400" : "text-sm text-gray-600"}>
            © {new Date().getFullYear()} {TOKEN_NAME}. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
                    isDarkMode
                      ? "border-green-900/60 text-gray-300 hover:bg-green-900/30 hover:text-green-300"
                      : "border-green-200 text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links, isDarkMode }) => (
  <div>
    <p
      className={`text-xs font-semibold uppercase tracking-[0.14em] ${
        isDarkMode ? "text-green-400" : "text-green-700"
      }`}
    >
      {title}
    </p>
    <ul className="mt-3 space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className={`text-sm transition-colors duration-150 ${
              isDarkMode
                ? "text-gray-400 hover:text-green-300"
                : "text-gray-600 hover:text-green-700"
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
