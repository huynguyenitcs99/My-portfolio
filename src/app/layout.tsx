import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const display = localFont({
  src: "../../public/fonts/Sora.ttf",
  weight: "100 800",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "../../public/fonts/Manrope.ttf",
  weight: "200 800",
  variable: "--font-body",
  display: "swap",
});
const signature = localFont({
  src: "../../public/fonts/Barlow-Black.ttf",
  weight: "900",
  variable: "--font-signature",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://huynguyenitcs99.vercel.app"),
  title: {
    default: "Huy Nguyen — AI engineer × creative builder",
    template: "%s · Huy Nguyen",
  },
  description:
    "AI agents, generative design and real engineering. Explore the work and creative world of Huy Nguyen.",
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
export const viewport: Viewport = { themeColor: "#091019" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${signature.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
      </body>
    </html>
  );
}
