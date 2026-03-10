"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  SparklesIcon, 
  RocketLaunchIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';
import { allMangas } from '@/lib/data';

export default function NewArrivalsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Hydration ve ESLint "set-state-in-effect" hatasını önlemek için güvenli yükleme
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  // Filtreleme: isNewArrival veya "Yeni" rozeti olanlar
  const newMangas = allMangas.filter(m => m.isNewArrival || m.badge === "Yeni");

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- HERO: YENİ GELENLER --- */}
      <div className="relative bg-primary/5 py-20 sm:py-32 border-b border-primary/10 overflow-hidden">
        {/* Dekoratif Arka Plan (Ghibli Parıltıları) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-40"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-2xl mb-8 ring-1 ring-primary/20 backdrop-blur-sm">
              <SparklesIcon className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Taze Hikayeler Sokağımızda</span>
            </div>
            <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-8 italic">
              Yeni <br /> <span className="text-primary not-italic">Maceralar</span>
            </h1>
            <p className="text-xl text-foreground/60 font-medium leading-relaxed italic max-w-xl">
              Mürekkebe henüz kurumamış, raflarımıza taze dizilmiş en yeni serüvenler. Sayfaları ilk sen çevir, bu büyülü dünyaları ilk sen keşfet.
            </p>
          </div>
        </div>
      </div>

      {/* --- ÜRÜN IZGARASI --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 gap-y-20 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newMangas.map((manga) => (
            <div key={manga.id} className="group relative flex flex-col bg-transparent">
              
              {/* Görsel Kutusu */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3rem] bg-foreground/5 shadow-xl group-hover:shadow-[0_20px_50px_rgba(var(--primary),0.15)] transition-all duration-700 ring-1 ring-foreground/10 group-hover:ring-primary/30 group-hover:-translate-y-4">
                <Image 
                  src={manga.image} 
                  alt={manga.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-110" 
                  priority={manga.id === "5" || manga.id === "6"}
                />
                
                {/* Rozetler */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  <span className="bg-primary text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl ring-2 ring-white/20">
                    YENİ
                  </span>
                  {manga.isBestSeller && (
                    <span className="bg-accent text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                      POPÜLER
                    </span>
                  )}
                </div>

                {/* Hover Aksiyonu */}
                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                  <button className="w-full bg-white/95 backdrop-blur-md text-primary py-4 rounded-[1.5rem] text-xs font-black shadow-2xl flex items-center justify-center gap-3 hover:bg-white active:scale-95 transition-all uppercase tracking-widest">
                    <ShoppingCartIcon className="h-5 w-5" />
                    Sepete Ekle
                  </button>
                </div>
                
                {/* Karartma Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* İçerik Bilgileri */}
              <div className="mt-8 flex flex-col px-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Bugün Eklendi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarSolid className="h-3.5 w-3.5 text-accent" />
                    <span className="text-[11px] font-bold text-foreground/40">{manga.rating}.0</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-foreground leading-none tracking-tighter uppercase group-hover:text-primary transition-colors mb-2">
                  <Link href={`/manga/${manga.id}`}>
                    <span className="absolute inset-0 z-0" />
                    {manga.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-foreground/50 font-bold italic mb-4">{manga.author}</p>
                
                <div className="mt-auto pt-6 border-t border-foreground/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black text-foreground/20 uppercase leading-none mb-1 tracking-widest">Lansman Fiyatı</p>
                    <p className="text-2xl font-black text-accent tracking-tighter italic">₺{manga.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-foreground/30 uppercase italic">{manga.publisher}</p>
                    <p className="text-[9px] font-bold text-foreground/30 uppercase italic">{manga.pages} Sayfa</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- ALT BÖLÜM: MAĞAZA ÖZELLİKLERİ --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-foreground/[0.02] rounded-[4rem] p-12 sm:p-20 border border-foreground/5">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <RocketLaunchIcon className="h-10 w-10" />
            </div>
            <div>
              <h4 className="text-xl font-black text-foreground uppercase tracking-tighter mb-2">Hızlı Teslimat</h4>
              <p className="text-sm text-foreground/50 font-medium italic">En yeni seriler bekletmeden, aynı gün kargoda.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-6 border-y md:border-y-0 md:border-x border-foreground/5 py-12 md:py-0">
            <div className="h-20 w-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
              <SparklesIcon className="h-10 w-10" />
            </div>
            <div>
              <h4 className="text-xl font-black text-foreground uppercase tracking-tighter mb-2">Özel Paketleme</h4>
              <p className="text-sm text-foreground/50 font-medium italic">Koleksiyonluk eserlerin için hasarsız gönderim garantisi.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="h-20 w-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shadow-inner">
              <StarIcon className="h-10 w-10" />
            </div>
            <div>
              <h4 className="text-xl font-black text-foreground uppercase tracking-tighter mb-2">Sınırlı Stok</h4>
              <p className="text-sm text-foreground/50 font-medium italic">Lansman baskılarını kaçırmamak için acele et.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}