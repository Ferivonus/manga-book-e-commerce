import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes"; // YENİ
import "./globals.css";

import Navbar from "@/components/general/Navbar"; 
import Footer from "@/components/general/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MangaSokağı | Huzurlu Manga Serüveni",
  description: "En sevdiğin mangalar, özel koleksiyonlar ve yeni çıkanlar Ghibli sıcaklığında tek bir adreste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning Next-themes için çok önemlidir, hydration hatalarını önler
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col transition-colors duration-500`}>
        {/* YENİ: ThemeProvider sarmalayıcısı */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          
          <main className="flex-1 w-full relative">
            {children}
          </main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}