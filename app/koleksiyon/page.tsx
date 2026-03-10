"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  EyeIcon, 
  StarIcon 
} from '@heroicons/react/24/solid';
import { allMangas } from '@/lib/data';

export default function CollectionPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Hydration ve ESLint hatasını önlemek için güvenli yükleme
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- KOLEKSİYON HEADER --- */}
      <div className="bg-secondary/5 py-16 mb-12 border-b border-foreground/5 relative overflow-hidden">
        {/* Dekoratif Arka Plan (Ghibli Esintisi) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tighter">
            Tüm <span className="text-secondary underline decoration-secondary/20 underline-offset-8">Koleksiyon</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/60 font-medium max-w-2xl leading-relaxed italic">
            MangaSokağı kütüphanesindeki her bir sayfa, seni farklı bir dünyaya davet ediyor. Seçkin eserlerimizin tamamını burada keşfedebilirsin.
          </p>
        </div>
      </div>

      {/* --- ÜRÜN GRID --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
          {allMangas.map((manga) => (
            <div key={manga.id} className="group relative flex flex-col bg-transparent">
              
              {/* Görsel Kutusu */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2.5rem] bg-foreground/5 ring-1 ring-inset ring-foreground/10 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:ring-secondary/30">
                <Image 
                  src={manga.image} 
                  alt={manga.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Sol Üst: Badge (Varsa) */}
                {manga.badge && (
                  <div className="absolute top-5 left-5 z-10">
                    <span className="bg-secondary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {manga.badge}
                    </span>
                  </div>
                )}

                {/* Sağ Alt: Görüntülenme Sayısı (Social Proof) */}
                <div className="absolute bottom-5 right-5 z-10 bg-background/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <EyeIcon className="h-3.5 w-3.5 text-foreground/40" />
                  <span className="text-[10px] font-bold text-foreground/60">{manga.views.toLocaleString('tr-TR')}</span>
                </div>

                {/* Hover Sepete Ekle Butonu */}
                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transform translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-secondary py-3.5 rounded-2xl text-xs font-black shadow-2xl flex items-center justify-center gap-2 hover:bg-secondary hover:text-white transition-all active:scale-95 uppercase tracking-widest">
                    <ShoppingCartIcon className="h-4 w-4" />
                    Sepete Ekle
                  </button>
                </div>

                {/* Karartma Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* İçerik Bilgileri */}
              <div className="mt-6 flex flex-col px-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{manga.category}</p>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-3.5 w-3.5 text-accent" />
                    <span className="text-[11px] font-bold text-foreground/40">{manga.rating}.0</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-foreground tracking-tight leading-tight group-hover:text-secondary transition-colors">
                  <Link href={`/manga/${manga.id}`}>
                    <span className="absolute inset-0 z-0" />
                    {manga.title}
                  </Link>
                </h3>
                
                <p className="mt-1 text-sm text-foreground/50 font-medium italic">{manga.author}</p>
                
                <div className="mt-4 flex items-center justify-between border-t border-foreground/5 pt-4">
                  <p className="text-2xl font-black text-accent tracking-tighter">₺{manga.price.toFixed(2)}</p>
                  <p className="text-[10px] font-bold text-foreground/30 uppercase italic">{manga.publisher}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}