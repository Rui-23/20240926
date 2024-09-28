import type { Metadata } from "next";
import localFont from "next/font/local";
import { inter } from "@/app/ui/fonts";
import "@/app/ui/globals.css";

const tiemposLightSerif =  localFont({
  src: "./fonts/TiemposLight.woff",
  variable: "--font-tiemposLight-serif",
  weight: "500",
});

const tiemposHeadlineSerif =  localFont({
  src: "./fonts/TiemposHeadline.woff",
  variable: "--font-tiemposHeadline-serif",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Free PDF Page Rotator = Rotate Individual or All Pages",
  description: "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${tiemposHeadlineSerif.variable}
          ${tiemposLightSerif.variable}
          ${inter.className} antialiased`} >
        {children}
      </body>
    </html>
  );
}
