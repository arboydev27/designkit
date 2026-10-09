import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import "@/components/detail.css";

export const metadata: Metadata = {
  title: "DesignKit | Find your visual language",
  description:
    "A considered library of 22 design languages. Explore responsive specimens, font pairings, color palettes, and practical guidance for your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Karrik-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/font-14.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem('designkit:theme')}catch(e){}var r=document.documentElement;if(t==='light'||t==='dark')r.setAttribute('data-theme',t);else r.removeAttribute('data-theme')})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
