"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  EyeIcon,
  SparklesIcon,
  BookOpenIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'; // Outline ikonlar Ghibli tarzına daha çok yakışıyor
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

// API ve Veri Tipleri
import { getMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

export default function CollectionPage() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // --- VERİ ÇEKME İŞLEMİ ---
  useEffect(() => {
    const fetchAllMangas = async () => {
      setIsLoading(true);
      try {
        // Yeni mimari: getMangas artık { mangas, totalCount } döndürüyor
        const { mangas: allSeries, totalCount: count } = await getMangas(undefined, undefined, 1, 50);
        setMangas(allSeries);
        setTotalCount(count);
      } catch (error) {
        console.error("Koleksiyon senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMangas();
  }, []);

  // --- LOADING EKRANI (Ghibli Ruhu) ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <BookOpenIcon className="h-8 w-8 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">Koleksiyon Hazırlanıyor</p>
          <p className="text-foreground/30 text-[10px] mt-2 italic tracking-widest">Toz cinleri rafları kontrol ediyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32 transition-colors duration-500">
      
      {/* --- KOLEKSİYON HEADER --- */}
      <div className="bg-primary/5 py-24 mb-16 border-b border-foreground/5 relative overflow-hidden">
        {/* Dekoratif Ghibli Işıltıları */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-2xl mb-8 ring-1 ring-primary/20">
                <SparklesIcon className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Sokağın Arşivleri</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-8">
                Tüm <br /> <span className="text-primary italic underline decoration-primary/10 underline-offset-[16px]">Koleksiyon</span>
              </h1>
              <p className="text-xl text-foreground/50 font-medium leading-relaxed italic">
                MangaSokağı kütüphanesindeki her bir sayfa, seni farklı bir dünyaya davet ediyor. {totalCount} farklı hikaye senin keşfini bekliyor.
              </p>
            </div>
            
            {/* İstatistik Rozeti (Glassmorphism) */}
            <div className="bg-background/40 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] shadow-2xl inline-flex flex-col items-center lg:items-end group hover:-translate-y-2 transition-transform duration-500">
               <span className="text-5xl font-black text-primary tracking-tighter leading-none">{totalCount}</span>
               <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mt-3">Eser Mevcut</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- ÜRÜN IZGARASI --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {mangas.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-24 sm:grid-cols-2 gap-x-12 lg:grid-cols-3 xl:grid-cols-4">
            {mangas.map((manga) => (
              <div key={manga.id} className="group relative flex flex-col">
                
                {/* Görsel Kutusu */}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3.5rem] bg-foreground/5 ring-1 ring-foreground/10 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(var(--primary),0.15)] group-hover:-translate-y-4 group-hover:ring-primary/40 shadow-xl">
                  {/* Rota Slug Üzerinden */}
                  <Link href={`/manga/${manga.slug}`} className="block w-full h-full">
                    <Image 
                      src={manga.image} 
                      alt={manga.title} 
                      fill
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                    />
                  </Link>
                  
                  {/* Rozetler */}
                  <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                    {manga.badge && (
                      <span className="bg-secondary text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl ring-2 ring-white/10">
                        {manga.badge}
                      </span>
                    )}
                    {manga.isOneShot && (
                      <span className="bg-accent/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5 border border-white/20">
                        <SparklesIcon className="h-3 w-3" /> ONE-SHOT
                      </span>
                    )}
                  </div>

                  {/* Social Proof Cam Panel */}
                  <div className="absolute bottom-8 right-8 z-10 bg-background/60 backdrop-blur-2xl px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <EyeIcon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-black text-foreground tracking-widest">{manga.views.toLocaleString('tr-TR')}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* İçerik Bilgileri */}
                <div className="mt-10 flex flex-col px-4 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{manga.category}</span>
                    <div className="flex items-center gap-1">
                      <StarSolid className="h-3.5 w-3.5 text-accent" />
                      <span className="text-xs font-bold text-foreground/40">{manga.rating}.0</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-foreground tracking-tighter leading-[0.85] group-hover:text-primary transition-colors uppercase mb-3">
                    <Link href={`/manga/${manga.slug}`}>
                      {manga.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-foreground/40 font-bold italic mb-8 flex items-center gap-2">
                    <BookOpenIcon className="h-4 w-4 text-primary/30" />
                    {manga.author}
                  </p>
                  
                  {/* Fiyat Alanı */}
                  <div className="mt-auto pt-8 flex items-center justify-between border-t border-foreground/5 relative z-20">
                    <div className="flex flex-col">
                      <p className="text-[9px] font-black text-foreground/20 uppercase tracking-widest mb-1">
                         {manga.isOneShot ? 'NET SATIŞ FİYATI' : 'BAŞLAYAN FİYATLAR'}
                      </p>
                      <p className="text-3xl font-black text-accent tracking-tighter italic leading-none">₺{manga.price.toFixed(2)}</p>
                    </div>
                    
                    {/* Seri Sayfasına Yönlendiren Sepet İkonu */}
                    <Link 
                      href={`/manga/${manga.slug}`}
                      className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95 group/btn"
                    >
                      <ShoppingCartIcon className="h-5 w-5 group-hover:rotate-12 transition-transform" /> 
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-40 text-center bg-foreground/[0.02] rounded-[5rem] border-2 border-dashed border-foreground/5">
             <div className="h-24 w-24 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <BookOpenIcon className="h-12 w-12 text-foreground/10" />
             </div>
             <p className="text-foreground/30 text-2xl font-bold italic tracking-tight uppercase">Kütüphanenin bu rafı şu an boş görünüyor...</p>
             <Link href="/" className="mt-10 inline-flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-widest hover:underline">
               ANA SAYFAYA DÖN <ChevronRightIcon className="h-4 w-4" />
             </Link>
          </div>
        )}
      </div>

      {/* --- ALT BİLGİ: GHIBLI RUHU --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-48">
         <div className="p-16 sm:p-24 rounded-[5rem] bg-secondary/5 border border-secondary/10 relative overflow-hidden text-center shadow-2xl shadow-secondary/5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <SparklesIcon className="h-12 w-12 text-secondary/40 mx-auto mb-8 animate-pulse" />
            <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter mb-8 italic leading-none">
               Aradığın Hikayeyi <br className="sm:hidden" /> <span className="text-secondary">Bulamadın mı?</span>
            </h2>
            <p className="text-xl text-foreground/40 font-medium italic max-w-xl mx-auto mb-14">
               Koleksiyonumuz her geçen gün büyüyor. Eğer özel bir seri veya nadir bir baskı arıyorsan bize fısıldayabilirsin.
            </p>
            <Link href="/iletisim" className="bg-secondary text-white px-12 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:-translate-y-1 transition-all shadow-xl shadow-secondary/20">
               BİZE MESAJ GÖNDER &rarr;
            </Link>
         </div>
      </div>
    </div>
  );
}