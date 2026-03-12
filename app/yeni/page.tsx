"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  SparklesIcon, 
  RocketLaunchIcon,
  StarIcon,
  ClockIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

// API ve Tip Tanımları
import { getMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

export default function NewArrivalsPage() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- VERİ ÇEKME ---
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoading(true);
      try {
        // getMangas artık { mangas, totalCount } döndürüyor
        const { mangas: allData } = await getMangas(undefined, undefined, 1, 40);
        
        // Sadece yeni gelenleri filtrele
        const newReleases = allData.filter(m => m.isNewArrival);
        setMangas(newReleases);
      } catch (error) {
        console.error("Yeni mangalar yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
        <p className="text-secondary font-black tracking-[0.2em] uppercase animate-pulse text-sm">
          Taze Sayfalar Getiriliyor...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- HERO: YENİ GELENLER --- */}
      <div className="relative bg-secondary/5 py-20 sm:py-32 border-b border-secondary/10 overflow-hidden">
        {/* Ghibli Parıltıları */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-2xl mb-8 ring-1 ring-secondary/20 backdrop-blur-sm">
              <SparklesIcon className="h-5 w-5 text-secondary animate-pulse" />
              <span className="text-xs font-black text-secondary uppercase tracking-[0.2em]">Taze Hikayeler Sokağımızda</span>
            </div>
            <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-8 italic">
              Yeni <br /> <span className="text-secondary not-italic">Maceralar</span>
            </h1>
            <p className="text-xl text-foreground/60 font-medium leading-relaxed italic max-w-xl">
              Mürekkebi henüz kurumamış, raflarımıza taze dizilmiş en yeni serüvenler. Sayfaları ilk sen çevir, bu büyülü dünyaları ilk sen keşfet.
            </p>
          </div>
        </div>
      </div>

      {/* --- ÜRÜN IZGARASI --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        {mangas.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-20 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mangas.map((manga) => (
              <div key={manga.id} className="group relative flex flex-col">
                
                {/* Görsel Kutusu */}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3rem] bg-foreground/5 shadow-xl group-hover:shadow-[0_20px_50px_rgba(var(--secondary),0.15)] transition-all duration-700 ring-1 ring-foreground/10 group-hover:ring-secondary/30 group-hover:-translate-y-4">
                  {/* DÜZELTME: Rota artık slug kullanıyor */}
                  <Link href={`/manga/${manga.slug}`}>
                    <Image 
                      src={manga.image} 
                      alt={manga.title} 
                      fill
                      className="object-cover object-center transition-transform duration-1000 group-hover:scale-110" 
                    />
                  </Link>
                  
                  {/* Rozetler */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                    <span className="bg-secondary text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl ring-2 ring-white/20">
                      YENİ
                    </span>
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl ${
                      manga.isOneShot ? 'bg-accent text-white' : 'bg-primary text-white'
                    }`}>
                      {manga.isOneShot ? 'ONE-SHOT' : 'SERİ'}
                    </span>
                  </div>

                  {/* Hover Aksiyonu */}
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                    <Link 
                      href={`/manga/${manga.slug}`}
                      className="w-full bg-white/95 backdrop-blur-md text-secondary py-4 rounded-[1.5rem] text-xs font-black shadow-2xl flex items-center justify-center gap-3 hover:bg-secondary hover:text-white active:scale-95 transition-all uppercase tracking-widest"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      Hemen İncele
                    </Link>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* İçerik Bilgileri */}
                <div className="mt-8 flex flex-col px-2 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="h-4 w-4 text-secondary animate-pulse" />
                      <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Yeni Eklendi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarSolid className="h-3.5 w-3.5 text-accent" />
                      <span className="text-[11px] font-bold text-foreground/40">{manga.rating}.0</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-foreground leading-none tracking-tighter uppercase group-hover:text-secondary transition-colors mb-2">
                    {/* DÜZELTME: Rota artık slug kullanıyor */}
                    <Link href={`/manga/${manga.slug}`}>
                      {manga.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-foreground/50 font-bold italic mb-4">{manga.author}</p>
                  
                  <div className="mt-auto pt-6 border-t border-foreground/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-[10px] font-black text-foreground/30 uppercase leading-none mb-1 tracking-widest">
                        {manga.isOneShot ? 'Satış Fiyatı' : 'Başlayan Fiyat'}
                      </p>
                      <p className="text-2xl font-black text-accent tracking-tighter italic">₺{manga.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end text-foreground/30 mb-0.5">
                        <BookOpenIcon className="h-3 w-3" />
                        <span className="text-[9px] font-bold uppercase">{manga.publisher}</span>
                      </div>
                      <p className="text-[9px] font-bold text-foreground/20 uppercase italic">{manga.pages} Sayfa</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-32 text-center bg-foreground/[0.02] rounded-[3rem] border border-dashed border-foreground/10">
            <SparklesIcon className="h-12 w-12 text-foreground/10 mx-auto mb-4" />
            <p className="text-foreground/40 text-lg font-bold italic">Taze sayfalar yolda, takipte kal!</p>
          </div>
        )}
      </div>

      {/* --- MAĞAZA ÖZELLİKLERİ --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-foreground/[0.02] rounded-[4rem] p-12 sm:p-20 border border-foreground/5">
          <FeatureItem 
            icon={<RocketLaunchIcon className="h-10 w-10" />}
            color="bg-primary/10 text-primary"
            title="Işık Hızıyla"
            desc="En yeni seriler bekletmeden kargoda."
          />
          <FeatureItem 
            icon={<SparklesIcon className="h-10 w-10" />}
            color="bg-secondary/10 text-secondary"
            title="Kusursuz Paket"
            desc="Manganın köşesi bile bükülmeden sana ulaşır."
          />
          <FeatureItem 
            icon={<StarIcon className="h-10 w-10" />}
            color="bg-accent/10 text-accent"
            title="İlk Sen Oku"
            desc="Lansman baskılarını kaçırmamak için acele et."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div className={`h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-inner ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-black text-foreground uppercase tracking-tighter mb-2">{title}</h4>
        <p className="text-sm text-foreground/50 font-medium italic">{desc}</p>
      </div>
    </div>
  );
}