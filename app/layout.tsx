import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";

// Oluşturduğumuz bileşenleri dahil ediyoruz (Yolları kendi klasör yapına göre güncelleyebilirsin)

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
    <html lang="tr"> {/* Dil etiketini Türkçe yaptık */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col transition-colors duration-500`}
      >
        <Navbar />
        
        {/* main etiketine flex-1 vererek içeriğin ekranı doldurmasını ve Footer'ın hep en altta kalmasını sağlıyoruz */}
        <main className="flex-1 w-full relative">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}