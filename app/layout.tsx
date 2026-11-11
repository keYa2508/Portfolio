import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Karthikeyan Manikandan | Full Stack & Mobile Developer | Real-Time & AI Systems",
  description:
    "Portfolio of Karthikeyan Manikandan — Full Stack Developer with 3+ years experience building React Native mobile apps, real-time trading engines, enterprise ERPs, and AI RAG chatbots.",
  keywords: [
    "Karthikeyan Manikandan",
    "Full Stack Developer",
    "React Native Developer",
    "Next.js",
    "TypeScript",
    "Socket.IO",
    "Real-Time Trading",
    "ERP Automation",
    "AI RAG Chatbot",
    "Chennai Developer",
  ],
  authors: [{ name: "Karthikeyan Manikandan" }],
  openGraph: {
    title: "Karthikeyan Manikandan | Full Stack & Mobile Engineer",
    description:
      "Full Stack Developer with 3+ years experience in React.js, React Native, Next.js, Socket.IO, and AI RAG systems.",
    type: "website",
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070a12] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
