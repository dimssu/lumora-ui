import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { SiteChrome } from "../components/site-chrome";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumora UI — Interfaces that glow",
    template: "%s · Lumora UI",
  },
  description:
    "A premium, motion-first React component library. Quiet surfaces, one glowing accent, and springs that settle exactly once.",
};

/* Applied before paint so a saved light theme never flashes dark. */
const themeScript = `try{if(localStorage.getItem("lumora-theme")==="light"){document.documentElement.setAttribute("data-theme","light")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grotesk.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen bg-[var(--lm-bg)] text-[var(--lm-fg)] antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
