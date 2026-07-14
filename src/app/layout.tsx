import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Hauslab — Plan. Palette. Place.",
    template: "%s · Hauslab",
  },
  description:
    "Interactive home design tools: floor plans, furniture layouts, color palettes, mood boards, and a style quiz — free in your browser.",
  keywords: [
    "interior design",
    "room planner",
    "furniture layout",
    "color palette",
    "mood board",
    "home design",
  ],
  openGraph: {
    title: "Hauslab — Plan. Palette. Place.",
    description:
      "Interactive home design tools for floor plans, palettes, and style discovery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
