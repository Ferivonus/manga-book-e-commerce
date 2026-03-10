"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FireIcon, EyeIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';
import { allMangas } from '@/lib/data';

export default function PopularPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  // Tüm mangaları popülerlik sıralamasına (1'den başlayarak) göre diziyoruz
  const popularMangas = [...allMangas].sort((a, b) => a.popularityRank - b.popularityRank);

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- POPÜLER HEADER --- */}
      <div className="bg-accent/5 py-20 border-b border-accent/10 relative overflow-hidden">
        {/* Arka Plan Dekorasyonu */}
        <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none rotate-12">
          <FireIcon className="h-96 w-96 text-accent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-2xl mb-8 ring-1 ring-accent/20">
            <FireIcon className="h-5 w-5 text-accent animate-bounce" />
            <span className="text-xs font-black text-accent uppercase tracking-[0.2em]">Gündemdeki Eserler</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-foreground uppercase tracking-tighter leading-none">
            En Çok <br className="sm:hidden" />
            <span className="text-accent underline decoration-accent/10 underline-offset-[12px]">Sevilenler</span>
          </h1>
          <p className="mt-8 text-xl text-foreground/50 max-w-2xl leading-relaxed font-medium italic">
            MangaSokağı topluluğunun kalbini kazanan, kütüphanelerin vazgeçilmezi olan ve popülerlik listelerini altüst eden en iyi seriler.
          </p>
        </div>
      </div>

      {/* --- POPÜLER LİSTE --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 gap-y-24 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularMangas.map((manga, index) => (
            <div key={manga.id} className="relative group flex flex-col">
              
              {/* Devasa Sıra Numarası (Arka Plan) */}
              <div className="absolute -top-12 -left-8 z-0 pointer-events-none select-none">
                <span className="text-[10rem] font-black text-foreground/[0.03] group-hover:text-accent/[0.07] leading-none transition-colors duration-700 italic">
                  {index + 1}
                </span>
              </div>

              {/* Ürün Kartı */}
              <div className="relative z-10">
                {/* Görsel Alanı */}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3rem] bg-foreground/5 shadow-xl group-hover:shadow-[0_20px_50px_rgba(217,124,100,0.2)] transition-all duration-700 ring-1 ring-foreground/10 group-hover:ring-accent/30 group-hover:-translate-y-3">
                  <Image 
                    src={manga.image} 
                    alt={manga.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    priority={index < 4}
                  />
                  
                  {/* Top 3 Rozeti */}
                  {index < 3 && (
                    <div className="absolute top-6 left-6 bg-accent text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-2xl uppercase tracking-widest z-20 flex items-center gap-1.5 ring-2 ring-white/20">
                      <StarSolid className="h-3 w-3" />
                      TOP {index + 1}
                    </div>
                  )}

                  {/* Görüntülenme Sayısı */}
                  <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-xl px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg border border-foreground/5 z-20">
                    <EyeIcon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-black text-foreground/70 uppercase">
                      {manga.views.toLocaleString('tr-TR')}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* İçerik */}
                <div className="mt-8 flex flex-col px-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className={`h-4 w-4 ${i < manga.rating ? 'text-accent' : 'text-foreground/10'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{manga.category}</span>
                  </div>

                  <h3 className="text-2xl font-black text-foreground leading-none tracking-tighter uppercase group-hover:text-accent transition-colors">
                    <Link href={`/manga/${manga.id}`}>
                      <span className="absolute inset-0 z-0" />
                      {manga.title}
                    </Link>
                  </h3>
                  
                  <p className="mt-2 text-sm text-foreground/40 font-bold italic">{manga.author}</p>
                  
                  <div className="mt-6 pt-6 border-t border-foreground/5 flex items-center justify-between">
                    <div className="flex flex-col">
                       <p className="text-[10px] font-black text-foreground/20 uppercase leading-none mb-1">Fiyat</p>
                       <p className="text-2xl font-black text-foreground tracking-tighter italic">
                        ₺{manga.price.toFixed(2)}
                      </p>
                    </div>
                    <button className="relative z-10 bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-90">
                      <Image src="/cart-icon.svg" alt="Add" width={20} height={20} className="hidden" /> {/* Placeholder for custom svg */}
                      <FireIcon className="h-6 w-6" /> {/* Icon change for unique feel */}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- ALT CTA --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-40">
        <div className="bg-foreground/[0.02] rounded-[4rem] p-12 sm:p-24 text-center border border-foreground/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h2 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-8 relative z-10">
            Kendi <span className="text-primary italic">Yolculuğunu</span> Seç
          </h2>
          <p className="text-xl text-foreground/50 max-w-2xl mx-auto font-medium leading-relaxed italic mb-12 relative z-10">
            Popüler listeler sadece bir başlangıç. Kütüphanemizin derinliklerinde seni bekleyen binlerce farklı dünya var.
          </p>
          <Link 
            href="/koleksiyon" 
            className="relative z-10 inline-block bg-primary text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
          >
            Tüm Kataloğu Keşfet
          </Link>
        </div>
      </div>
      
    </div>
  );
}