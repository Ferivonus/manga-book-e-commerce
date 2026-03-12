"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRightIcon, 
  ShoppingCartIcon,
  FireIcon,
  BookOpenIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

// API ve Veri Yapıları
import { getMangas, getFeaturedMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

const quickCategories = [
  { name: 'Shounen', slug: 'shounen', color: 'bg-primary/5 text-primary hover:bg-primary hover:text-white border-primary/20' },
  { name: 'Seinen', slug: 'seinen', color: 'bg-accent/5 text-accent hover:bg-accent hover:text-white border-accent/20' },
  { name: 'Shoujo', slug: 'shoujo', color: 'bg-secondary/5 text-secondary hover:bg-secondary hover:text-white border-secondary/20' },
  { name: 'Isekai', slug: 'isekai', color: 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground border-foreground/10' },
  { name: 'Hayattan Kesitler', slug: 'hayattan-kesitler', color: 'bg-primary/5 text-primary hover:bg-primary/20 border-primary/10' },
  { name: 'Karanlık Fantezi', slug: 'karanlik-fantezi', color: 'bg-accent/5 text-accent hover:bg-accent/20 border-accent/10' },
];

export default function Home() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [bestSellers, setBestSellers] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- VERİ ÇEKME ---
  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        // Yeni API yapısına uygun destructuring
        const { mangas: allSeries } = await getMangas(undefined, undefined, 1, 20);
        setMangas(allSeries);

        const { bestSellers: featuredData } = await getFeaturedMangas();
        setBestSellers(featuredData);
      } catch (error) {
        console.error("Ana sayfa verileri yüklenemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // Slider için popülerlik sıralaması
  const heroMangas = [...mangas].sort((a, b) => a.popularityRank - b.popularityRank).slice(0, 5);
  
  // Akan yazı metni
  const marqueeText = mangas.length > 0 ? mangas.map(m => m.title).join(' ✦ ') + ' ✦ ' : 'HİKAYEYE BAŞLA... ✦ ';

  // --- SLIDER OTOMASYONU ---
  useEffect(() => {
    if (heroMangas.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroMangas.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [heroMangas.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary font-black tracking-widest uppercase text-xs animate-pulse">Sokak Hazırlanıyor...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-background transition-colors duration-500 overflow-hidden">
      
      {/* CSS Animasyonlarını Tailwind Config yerine burada standart style tagı ile tanımlıyoruz */}
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 80s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[90vh] min-h-[750px] overflow-hidden bg-foreground/5 -mt-24 group/slider">
        {heroMangas.map((manga, idx) => (
          <div 
            key={manga.id} 
            className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) ${
              currentSlide === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            {/* Arka Plan Görseli */}
            <div className="absolute inset-0 z-0">
              <Image
                src={manga.image}
                alt={manga.title}
                fill
                className="object-cover object-[center_30%] transition-transform duration-[20s] scale-110 group-hover/slider:scale-100"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              
              {/* Sinematik Marquee Background */}
              <div className="absolute inset-0 z-0 flex items-center opacity-[0.03] pointer-events-none select-none mix-blend-overlay">
                <div className="animate-marquee">
                  <span className="text-[18rem] font-black uppercase whitespace-nowrap">{marqueeText}{marqueeText}</span>
                </div>
              </div>
            </div>

            {/* İçerik Kartı */}
            <div className="absolute inset-0 flex items-center z-10 pt-20">
              <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20 ${
                      manga.isOneShot ? 'bg-secondary text-white' : 'bg-accent text-white'
                    }`}>
                      {manga.isOneShot ? <SparklesIcon className="h-4 w-4" /> : <BookOpenIcon className="h-4 w-4" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {manga.isOneShot ? 'TAM MACERA' : 'MANGA SERİSİ'}
                      </span>
                    </div>
                    <span className="bg-background/40 backdrop-blur-md text-foreground px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-lg">
                      {manga.category}
                    </span>
                  </div>

                  <h2 className="text-7xl sm:text-8xl lg:text-[8rem] font-black text-foreground uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl">
                    {manga.title}
                  </h2>
                  
                  <p className="text-2xl text-primary font-bold italic mb-10 opacity-90 tracking-tight">
                    {manga.author}
                  </p>
                  
                  <p className="text-xl text-foreground/50 font-medium leading-relaxed mb-12 line-clamp-3 max-w-xl italic">
                    &quot;{manga.description}&quot;
                  </p>

                  <div className="flex flex-wrap items-center gap-10">
                    <div className="flex flex-col">
                      <span className="text-6xl font-black text-accent tracking-tighter italic">₺{manga.price.toFixed(2)}</span>
                      <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mt-2 ml-1">Koleksiyona Başla</span>
                    </div>
                    {/* Link Güncellendi: Artık Slug kullanıyor */}
                    <Link 
                      href={`/manga/${manga.slug}`}
                      className="bg-primary text-white px-12 py-6 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:-translate-y-2 active:scale-95 transition-all flex items-center gap-4 group/btn"
                    >
                      İNCELEMEYE BAŞLA
                      <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Manuel Slider Kontrolleri */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroMangas.length - 1 : prev - 1)} className="p-3 rounded-full bg-foreground/5 backdrop-blur-md border border-white/10 text-foreground/40 hover:text-primary transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex gap-3">
            {heroMangas.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  currentSlide === idx ? 'bg-primary w-12 shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'bg-foreground/20 w-1.5'
                }`}
              />
            ))}
          </div>
          <button onClick={() => setCurrentSlide(prev => prev === heroMangas.length - 1 ? 0 : prev + 1)} className="p-3 rounded-full bg-foreground/5 backdrop-blur-md border border-white/10 text-foreground/40 hover:text-primary transition-all">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* --- HIZLI KATEGORİLER --- */}
      <section className="py-12 bg-foreground/[0.02] border-b border-foreground/5 relative z-20">
        <div className="container mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-5 min-w-max justify-start lg:justify-center">
            <div className="flex items-center gap-2 mr-6 opacity-30">
              <FireIcon className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest">Hızlı Keşif</span>
            </div>
            {quickCategories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/kategori/${cat.slug}`}
                className={`px-8 py-4 rounded-full border text-[11px] font-black transition-all uppercase tracking-widest shadow-sm hover:shadow-xl hover:-translate-y-1 ${cat.color}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- HAFTANIN FAVORİLERİ --- */}
      <section className="container mx-auto px-6 sm:px-12 lg:px-20 py-32 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-foreground/5 pb-12 mb-20">
          <div>
            <h2 className="text-5xl sm:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
              Haftanın <span className="text-primary italic font-serif lowercase tracking-normal">Favorileri</span>
            </h2>
            <p className="mt-4 text-lg text-foreground/40 font-medium italic">Sokağın en çok konuşulan, kütüphanelerde baş köşeye geçen serileri.</p>
          </div>
          <Link href="/populer" className="group text-[11px] font-black text-primary uppercase tracking-[0.25em] flex items-center gap-3 hover:underline underline-offset-8 decoration-2">
            TÜMÜNÜ KEŞFET <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {bestSellers.map((manga) => (
            <div key={manga.id} className="group relative flex flex-col">
              {/* Kart Görseli */}
              <div className="relative aspect-[2/3] rounded-[3.5rem] overflow-hidden bg-foreground/5 shadow-xl transition-all duration-700 ring-1 ring-foreground/5 group-hover:ring-primary/40 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(var(--primary),0.2)]">
                <Link href={`/manga/${manga.slug}`} className="block w-full h-full">
                  <Image 
                    src={manga.image} 
                    alt={manga.title} 
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  />
                </Link>

                {/* Dinamik One-shot Rozeti */}
                {manga.isOneShot && (
                  <div className="absolute top-8 left-8 z-10">
                    <span className="bg-secondary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 border border-white/20">
                      <SparklesIcon className="h-3.5 w-3.5" /> ONE-SHOT
                    </span>
                  </div>
                )}

                {/* Hover Aksiyonu */}
                <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                  <button className="w-full bg-white/95 backdrop-blur-md text-primary py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95">
                    <ShoppingCartIcon className="h-5 w-5" /> SERİYİ İNCELE
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </div>

              {/* Bilgi Alanı */}
              <div className="mt-10 px-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{manga.category}</span>
                  <div className="flex items-center gap-1.5">
                    <StarSolid className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold text-foreground/40">{manga.rating}.0</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight leading-[0.9] group-hover:text-primary transition-colors">
                  <Link href={`/manga/${manga.slug}`}>{manga.title}</Link>
                </h3>
                <p className="text-sm text-foreground/40 font-bold italic mt-3 mb-8">{manga.author}</p>
                
                <div className="pt-8 border-t border-foreground/5 flex items-center justify-between">
                  <p className="text-3xl font-black text-accent tracking-tighter italic leading-none">₺{manga.price.toFixed(2)}</p>
                  <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em]">{manga.isOneShot ? 'NET FİYAT' : 'BAŞLAYAN'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dekoratif Ghibli Işıltıları */}
      <div className="absolute top-1/2 -right-96 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 -left-96 w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-[200px] pointer-events-none"></div>
    </div>
  );
}