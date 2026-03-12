"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FireIcon, 
  EyeIcon,
  ShoppingCartIcon,
  SparklesIcon,
  BookOpenIcon,
  TrophyIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

// API ve Veri Tipleri
import { getMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

export default function PopularPage() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- VERİ ÇEKME İŞLEMİ ---
  useEffect(() => {
    const fetchPopularMangas = async () => {
      setIsLoading(true);
      try {
        // YENİ API: getMangas artık { mangas, totalCount } döndürüyor
        const response = await getMangas(undefined, undefined, 1, 40);
        const { mangas: allData } = response;
        
        // Backend'den gelen popularityRank değerine göre (1 en popüler) sıralıyoruz
        const sortedData = [...allData].sort((a, b) => a.popularityRank - b.popularityRank);
        setMangas(sortedData);
      } catch (error) {
        console.error("Popüler mangalar senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMangas();
  }, []);

  // ============================================================================
  // ⏳ YÜKLENİYOR (LOADING) EKRANI (Calcifer Temalı)
  // ============================================================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
          <FireIcon className="h-6 w-6 text-accent absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-accent font-black tracking-[0.2em] uppercase animate-pulse text-[10px]">
          Sokağın Favorileri Aranıyor...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- POPÜLER HEADER: ATEŞ RUHU TEMASI --- */}
      <div className="bg-accent/5 py-24 border-b border-accent/10 relative overflow-hidden">
        {/* Dekoratif Calcifer Parıltıları */}
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] opacity-40"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-5 py-2.5 rounded-2xl mb-8 ring-1 ring-accent/20 backdrop-blur-sm">
            <FireIcon className="h-5 w-5 text-accent animate-bounce" />
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Topluluğun Favorileri</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] italic">
            Zirvedeki <br /> <span className="text-accent not-italic">Efsaneler</span>
          </h1>
          <p className="mt-10 text-xl text-foreground/40 max-w-2xl leading-relaxed font-medium italic">
            MangaSokağı sakinlerinin en çok tıkladığı, kütüphanelerin baş köşesine koyduğu ve hikayesiyle herkesi büyüleyen popüler seriler.
          </p>
        </div>
      </div>

      {/* --- POPÜLER LİSTE: SIRALAMALI GÖRÜNÜM --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        {mangas.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-24 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mangas.map((manga, index) => (
              <div key={manga.id} className="relative group flex flex-col">
                
                {/* Devasa Sıra Numarası (Arka Plan - Slug Destekli Tasarım) */}
                <div className="absolute -top-16 -left-10 z-0 pointer-events-none select-none overflow-hidden">
                  <span className="text-[14rem] font-black text-foreground/[0.03] group-hover:text-accent/[0.08] leading-none transition-all duration-700 italic">
                    {index + 1}
                  </span>
                </div>

                {/* Ürün Kartı */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Görsel Alanı (Slug'a Yönlendirme) */}
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3.5rem] bg-foreground/5 shadow-2xl transition-all duration-700 ring-1 ring-foreground/10 group-hover:ring-accent/40 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(var(--accent),0.2)]">
                    {/* DÜZELTME: Rota slug üzerinden */}
                    <Link href={`/manga/${manga.slug}`} className="block w-full h-full">
                      <Image 
                        src={manga.image} 
                        alt={manga.title} 
                        fill
                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                        priority={index < 4}
                      />
                    </Link>
                    
                    {/* TOP Rozetleri */}
                    <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
                      {index < 3 && (
                        <div className="bg-accent text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-2xl uppercase tracking-widest flex items-center gap-2 ring-2 ring-white/20">
                          <TrophyIcon className="h-3.5 w-3.5" />
                          TOP {index + 1}
                        </div>
                      )}
                      {manga.isOneShot && (
                        <div className="bg-secondary/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter flex items-center gap-1.5">
                          <SparklesIcon className="h-3 w-3" /> One-shot
                        </div>
                      )}
                    </div>

                    {/* İstatistik Çubuğu (Görüntülenme) */}
                    <div className="absolute bottom-8 left-8 right-8 bg-background/40 backdrop-blur-2xl px-5 py-3 rounded-[2rem] flex items-center justify-between shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <EyeIcon className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black text-foreground tracking-widest">
                          {manga.views.toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarSolid className="h-3.5 w-3.5 text-accent" />
                        <span className="text-[10px] font-black text-foreground">{manga.rating}.0</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Bilgi Alanı */}
                  <div className="mt-10 flex flex-col px-4 flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{manga.category}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarSolid
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(manga.rating) ? 'text-accent' : 'text-foreground/10'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-3xl font-black text-foreground leading-[0.9] tracking-tighter uppercase group-hover:text-primary transition-colors">
                      {/* DÜZELTME: Rota slug üzerinden */}
                      <Link href={`/manga/${manga.slug}`}>
                        {manga.title}
                      </Link>
                    </h3>
                    
                    <p className="mt-3 text-sm text-foreground/40 font-bold italic flex items-center gap-2">
                      <BookOpenIcon className="h-4 w-4 text-primary/40" />
                      {manga.author}
                    </p>
                    
                    {/* Fiyat ve Aksiyon */}
                    <div className="mt-8 pt-8 border-t border-foreground/5 flex items-center justify-between relative z-20">
                      <div className="flex flex-col">
                        <p className="text-[9px] font-black text-foreground/20 uppercase tracking-widest mb-1">
                          {manga.isOneShot ? 'NET FİYAT' : 'BAŞLAYAN'}
                        </p>
                        <p className="text-3xl font-black text-accent tracking-tighter italic leading-none">
                          ₺{manga.price.toFixed(2)}
                        </p>
                      </div>
                      <Link 
                        href={`/manga/${manga.slug}`}
                        className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95 group/btn"
                      >
                        <ShoppingCartIcon className="h-5 w-5 group-hover:btn:rotate-12 transition-transform" /> 
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-40 text-center bg-foreground/[0.02] rounded-[4rem] border border-dashed border-foreground/10">
            <FireIcon className="h-16 w-16 text-foreground/10 mx-auto mb-6" />
            <p className="text-foreground/40 text-xl font-bold italic tracking-tight uppercase">Favori listesi şu an güncelleniyor...</p>
          </div>
        )}
      </div>

      {/* --- ALT CTA --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-48">
        <div className="bg-foreground/[0.02] rounded-[5rem] p-16 sm:p-32 text-center border border-foreground/5 relative overflow-hidden group shadow-2xl shadow-foreground/5">
          <div className="absolute top-0 left-0 w-full h-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <h2 className="text-5xl sm:text-7xl font-black text-foreground uppercase tracking-tighter mb-10 relative z-10 leading-[0.85]">
            Hala <span className="text-primary italic">Kendi</span> <br className="hidden sm:block" /> Yolunu Seçmedin mi?
          </h2>
          <p className="text-xl text-foreground/40 max-w-2xl mx-auto font-medium leading-relaxed italic mb-14 relative z-10 leading-relaxed">
            Zirvedeki seriler harika, ama her ruhun aradığı hikaye farklıdır. Kütüphanemizin derinliklerinde saklı hazineleri keşfetmeye ne dersin?
          </p>
          <Link 
            href="/koleksiyon" 
            className="relative z-10 inline-flex items-center gap-4 bg-primary text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-primary/30 hover:scale-105 transition-all group/cta"
          >
            TÜM KATALOĞA GÖZ AT 
            <ChevronRightIcon className="h-4 w-4 group-hover/cta:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
      
    </div>
  );
}