import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";

// Bengali body font — excellent readability at small sizes
const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Bengali display/heading font
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "স্কিনম্যাপ এআই — আপনার যত্নও শিখুক",
    template: "%s | স্কিনম্যাপ এআই",
  },
  description:
    "বাংলাদেশের জন্য ব্যক্তিগতকৃত ত্বকের যত্নের সহকারী। আপনার ত্বক বদলায়, আপনার যত্নও শিখুক।",
  keywords: ["স্কিনকেয়ার", "ত্বকের যত্ন", "বাংলাদেশ", "এআই", "ডার্মাটোলজি"],
  authors: [{ name: "স্কিনম্যাপ এআই দল" }],
  robots: "noindex, nofollow", // Demo — not for public indexing
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#101828",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      dir="ltr"
      className={`${notoSansBengali.variable} ${hindSiliguri.variable} h-full`}
    >
      <body className="min-h-full bg-surface antialiased">{children}</body>
    </html>
  );
}
