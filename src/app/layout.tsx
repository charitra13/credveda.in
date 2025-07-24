import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FloatingChat } from "@/components/floating-chat"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CredVeda - Smart Financial Decisions for Every Indian",
  description: "CredVeda is a financial awareness tool for the Indian loan payment ecosystem with smart EMI Reminders, loan comparison, and trusted financial advisors.",
  keywords: "loan comparison, EMI reminder, financial advisor, credit score, India",
  authors: [{ name: "CredVeda" }],
  openGraph: {
    title: "CredVeda - Smart Financial Decisions",
    description: "Compare loans, set EMI reminders, and connect with 500+ trusted financial advisors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
