import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "@/provider/Provider";

export const metadata: Metadata = {
  title: "TokenVault ICO",
  description: "Secure Token Handler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}