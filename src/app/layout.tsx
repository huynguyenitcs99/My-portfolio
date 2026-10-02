import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/InterLatin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://huynguyenitcs99.vercel.app"),
  title: {
    default: "Huy Nguyen — AI engineer × creative builder",
    template: "%s · Huy Nguyen",
  },
  description:
    "AI agents, generative design and real engineering. Huy Nguyen, AI Engineer at Vulcan Labs, builds the intelligence behind useful creative tools.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Huy Nguyen",
    title: "Huy Nguyen — AI engineer × creative builder",
    description:
      "Ideas into things. Agents, generative design and the engineering behind them.",
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#F2EEE7" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
