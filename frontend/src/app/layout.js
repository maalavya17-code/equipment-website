import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MAALAVYA ENTERPRISES | Premium Waste Management & Hospital Furniture",
  description: "ISO Certified Manufacturers & Exporters of Biomedical Waste Bins, Garbage Containers, Plastic Pallets, and high-quality Hospital Furniture. Shipping globally to over 50 countries.",
  openGraph: {
    title: "MAALAVYA ENTERPRISES | Manufacturers & Exporters",
    description: "Leading ISO Certified Manufacturers & Exporters of Biomedical Waste Bins and Hospital Furniture.",
    url: "https://maalavya.com",
    siteName: "MAALAVYA ENTERPRISES",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
