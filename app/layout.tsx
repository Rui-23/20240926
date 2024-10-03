import type { Metadata } from "next";
import localFont from "next/font/local";
import { inter } from "@/app/ui/fonts";
import "@/app/ui/globals.css";



export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages",
  description: "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
  metadataBase: new URL('https://pdf.ai'),
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PDFdotai',
  },
  openGraph: {
    title: 'Free PDF Page Rotator - Rotate Individual or All Pages',
    description: 'Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!',
    url: 'https://pdf.ai',
    images: [
      {
        url: 'https://imagedelivery.net/pcavElAZUUevXK53Dl4vWA/4738d269-b536-45f2-57e1-fe07fef90d00/public',
        type: 'image/jpeg',
      },
    ], 
    type: 'website',
  },
};

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
