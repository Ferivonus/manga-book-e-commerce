"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  HeartIcon as HeartOutline, 
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';

// API Bağlantısı ve Tipler
import { getMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- VERİ ÇEKME VE MOCK FAVORİ OLUŞTURMA ---
  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        // DÜZELTME: getMangas artık { mangas, totalCount } döndürüyor
        const { mangas: allData } = await getMangas(undefined, undefined, 1, 20);
        
        // Geçici olarak: Veritabanındaki ilk birkaç seriyi favori olarak gösteriyoruz
        // (Zustand bağlandığında burası gerçek favori listesiyle değişecek)
        if (allData.length > 2) {
          setFavorites([allData[0], allData[1], allData[2]].filter(Boolean));
        } else {
          setFavorites(allData);
        }
      } catch (error) {
        console.error("Favoriler senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // --- FAVORİLERDEN ÇIKARMA FONKSİYONU ---
  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(manga => manga.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
          <HeartSolid className="h-6 w-6 text-accent absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-accent font-black tracking-[0.3em] uppercase animate-pulse text-[10px]">
          Kalbinin Sesi Dinleniyor...
        </p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
          <div className="h-32 w-32 bg-foreground/[0.03] rounded-[3rem] flex items-center justify-center border border-foreground/5 relative z-10">
            <HeartOutline className="h-16 w-16 text-accent/20" />
          </div>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tighter text-center">
          Kalbin Şu An Bomboş
        </h2>
        <p className="mt-6 text-foreground/40 text-center max-w-md text-lg font-medium italic leading-relaxed">
          &quot;Bazen en güzel hikayeler, henüz kapağını açmadıklarımızdır. Kütüphanede ruhunu bekleyen bir serüven olmalı.&quot;
        </p>
        <Link 
          href="/koleksiyon" 
          className="mt-12 bg-accent text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-accent/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4"
        >
          YENİ HİKAYELERE YELKEN AÇ
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- HEADER --- */}
      <div className="bg-accent/5 py-20 mb-16 border-b border-accent/10 relative overflow-hidden">
        {/* Dekoratif Calcifer Kırmızısı Işıltılar */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <h1 className="text-5xl sm:text-7xl font-black text-foreground uppercase tracking-tighter leading-[0.85]">
              Kalbinde <br /> <span className="text-accent italic underline decoration-accent/10 underline-offset-[16px]">Yer Edenler</span>
            </h1>
            <p className="mt-8 text-xl text-foreground/50 max-w-xl font-medium leading-relaxed italic">
              Okumaya doyamadığın, ruhuna dokunan ve sokağımızın raflarından kendi kütüphanene eklediğin o özel eserler.
            </p>
          </div>
          <div className="bg-background/60 backdrop-blur-xl px-6 py-4 rounded-[2rem] border border-foreground/5 shadow-2xl flex items-center gap-4 self-start md:self-auto">
            <HeartSolid className="h-6 w-6 text-accent animate-pulse" />
            <div>
              <p className="text-2xl font-black text-foreground leading-none">{favorites.length}</p>
              <p className="text-[9px] font-black text-foreground/30 uppercase tracking-widest">Favori Eser</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAVORİLER GRID --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-24 sm:grid-cols-2 gap-x-12 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((manga) => (
            <div key={manga.id} className="group relative flex flex-col bg-transparent">
              
              {/* Görsel Kutusu */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3.5rem] bg-foreground/5 ring-1 ring-inset ring-foreground/10 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(var(--accent),0.15)] group-hover:-translate-y-4 group-hover:ring-accent/40 shadow-xl">
                {/* Rota artık slug üzerinden */}
                <Link href={`/manga/${manga.slug}`} className="block w-full h-full">
                  <Image 
                    src={manga.image} 
                    alt={manga.title} 
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  />
                </Link>

                {/* Favoriden Çıkar Butonu (Sabit Kırmızı Kalp) */}
                <button 
                  onClick={() => removeFavorite(manga.id)}
                  className="absolute top-6 right-6 z-20 p-3 rounded-2xl bg-background/80 backdrop-blur-xl text-accent hover:bg-accent hover:text-white transition-all shadow-xl hover:scale-110 border border-white/20"
                  title="Favorilerden Çıkar"
                >
                  <HeartSolid className="h-5 w-5" />
                </button>
                
                {/* Badge'ler */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  {manga.badge && (
                    <span className="bg-secondary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                      {manga.badge}
                    </span>
                  )}
                  {manga.isOneShot && (
                    <span className="bg-accent/90 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5 border border-white/10">
                      <SparklesIcon className="h-3 w-3" /> ONE-SHOT
                    </span>
                  )}
                </div>

                {/* Hover Sepete Ekle Aksiyonu */}
                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                  <Link 
                    href={`/manga/${manga.slug}`}
                    className="w-full bg-white/95 backdrop-blur-md text-accent py-4 rounded-[1.5rem] text-xs font-black shadow-2xl flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all active:scale-95 uppercase tracking-widest"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Hemen İncele
                  </Link>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* İçerik Bilgileri */}
              <div className="mt-10 flex flex-col px-4 flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{manga.category}</span>
                  <div className="flex items-center gap-1">
                    <StarSolid className="h-3.5 w-3.5 text-accent" />
                    <span className="text-[11px] font-bold text-foreground/40">{manga.rating}.0</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-foreground tracking-tight leading-[0.9] group-hover:text-accent transition-colors uppercase mb-2">
                  <Link href={`/manga/${manga.slug}`}>
                    {manga.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-foreground/40 font-bold italic mb-6 flex items-center gap-2">
                   <BookOpenIcon className="h-4 w-4" />
                   {manga.author}
                </p>
                
                <div className="mt-auto pt-8 border-t border-foreground/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[9px] font-black text-foreground/20 uppercase tracking-widest mb-1">
                       {manga.isOneShot ? 'NET FİYAT' : 'BAŞLAYAN'}
                    </p>
                    <p className="text-3xl font-black text-accent tracking-tighter italic leading-none">₺{manga.price.toFixed(2)}</p>
                  </div>
                  {manga.stock < 10 && manga.stock > 0 && (
                    <div className="px-3 py-1 bg-accent/5 rounded-lg border border-accent/10">
                       <p className="text-[9px] font-black text-accent uppercase animate-pulse">Son {manga.stock}!</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- ALT CTA --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-48">
         <div className="p-16 sm:p-24 rounded-[5rem] bg-foreground/[0.02] border border-foreground/5 text-center relative overflow-hidden group shadow-2xl shadow-foreground/5">
            <div className="absolute top-0 left-0 w-full h-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <h2 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-8 italic leading-[0.85]">
               Daha Fazla <span className="text-accent">Aşk Hikayesi</span> Keşfet
            </h2>
            <p className="text-lg text-foreground/40 font-medium italic max-w-xl mx-auto mb-12">
               Favori listen büyüdükçe, ruhuna dokunan o özel kütüphanen de şekillenecek. Sokağın yeni sakinlerine göz atmaya ne dersin?
            </p>
            <Link href="/koleksiyon" className="relative z-10 inline-flex items-center gap-4 bg-primary text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.25em] text-[10px] shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
               TÜM KOLEKSİYONU KEŞFET &rarr;
            </Link>
         </div>
      </div>
    </div>
  );
}