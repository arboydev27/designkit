import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import "@/components/detail.css";

export const metadata: Metadata = {
  title: "DesignKit — Find your visual language",
  description:
    "A considered library of 22 design languages. Explore responsive specimens, font pairings, color palettes, and practical guidance for your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
