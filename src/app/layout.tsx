import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import "./legacy-styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});


export const metadata: Metadata = {
  title: "Nathan's Portfolio",
  description: "Automate & Code with Nathan Alvares - RPA & AI Practitioner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_USE_LEGACY_THREE === '1' && (
          <>
            {/* Import map to load Three.js ESM from CDN for legacy ironman.js */}
            <script
              type="importmap"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  imports: {
                    three: "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",
                    "three/examples/jsm/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",
                  },
                }),
              }}
            />
            <script type="module" src="/scripts/ironman.js" />
          </>
        )}
        {/* Load legacy UI enhancements after hydration */}
        <script src="/scripts/script.js" defer />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
