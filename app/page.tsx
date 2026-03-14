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
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

// API ve Veri Yapıları
import { getMangas, getFeaturedMangas } from '@/lib/api';
import type { Manga } from '@/lib/data'; // Orijinal tipimizi kullanıyoruz

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

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        // API artık tam Manga tipinde dizi döndürüyor
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

  const heroMangas = [...mangas].sort((a, b) => a.popularityRank - b.popularityRank).slice(0, 5);
  const marqueeText = mangas.length > 0 ? mangas.map(m => m.title).join(' ✦ ') + ' ✦ ' : 'HİKAYEYE BAŞLA... ✦ ';

  useEffect(() => {
    if (heroMangas.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroMangas.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [heroMangas.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary font-black tracking-widest uppercase text-[10px] animate-pulse font-mono">Sokak Hazırlanıyor...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-background transition-colors duration-500 overflow-hidden">
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 120s linear infinite;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[95vh] min-h-[800px] overflow-hidden bg-foreground/5 -mt-24">
        {heroMangas.map((manga, idx) => (
          <div 
            key={manga.id} 
            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out ${
              currentSlide === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={manga.image || '/placeholder.png'}
                alt={manga.title}
                fill
                className="object-cover object-[center_20%] transition-transform duration-[20s] scale-110"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              
              <div className="absolute inset-0 z-0 flex items-center opacity-[0.02] pointer-events-none select-none mix-blend-overlay">
                <div className="animate-marquee">
                  <span className="text-[20rem] font-black uppercase whitespace-nowrap">{marqueeText}{marqueeText}</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center z-10 pt-20">
              <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl ${
                      manga.isOneShot ? 'bg-secondary text-white' : 'bg-accent text-white'
                    }`}>
                      {manga.isOneShot ? <SparklesIcon className="h-4 w-4" /> : <BookOpenIcon className="h-4 w-4" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {manga.isOneShot ? 'TAM MACERA' : 'MANGA SERİSİ'}
                      </span>
                    </div>
                    <span className="bg-background/40 backdrop-blur-md text-foreground px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-lg">
                      {manga.category} {/* Düzeltildi: Direkt string kullanımı */}
                    </span>
                  </div>

                  <h2 className="text-7xl sm:text-9xl font-black text-foreground uppercase tracking-tighter leading-[0.8] mb-10 drop-shadow-2xl">
                    {manga.title}
                  </h2>
                  
                  <p className="text-2xl text-primary font-bold italic mb-10 tracking-tight flex items-center gap-3">
                    <span className="w-12 h-px bg-primary/30"></span> {manga.author}
                  </p>
                  
                  <p className="text-xl text-foreground/50 font-medium leading-relaxed mb-14 line-clamp-3 max-w-2xl italic">
                    &quot;{manga.description || 'Bu serinin gizemli dünyası seni bekliyor...'}&quot;
                  </p>

                  <div className="flex flex-wrap items-center gap-12">
                    <div className="flex flex-col">
                      <span className="text-6xl font-black text-accent tracking-tighter italic">₺{Number(manga.price).toFixed(2)}</span>
                      <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mt-2">BAŞLAYAN FİYATLARLA</span>
                    </div>
                    <Link 
                      href={`/manga/${manga.slug}`}
                      className="bg-primary text-white px-14 py-7 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.25em] shadow-2xl shadow-primary/30 hover:-translate-y-2 active:scale-95 transition-all flex items-center gap-4 group"
                    >
                      HİKAYEYİ KEŞFET
                      <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Kontroller */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
          <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroMangas.length - 1 : prev - 1)} className="p-4 rounded-full bg-foreground/5 backdrop-blur-md border border-white/10 text-foreground/40 hover:text-primary transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex gap-4">
            {heroMangas.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-700 rounded-full h-1.5 ${
                  currentSlide === idx ? 'bg-primary w-16 shadow-[0_0_20px_rgba(var(--primary),0.6)]' : 'bg-foreground/10 w-2'
                }`}
              />
            ))}
          </div>
          <button onClick={() => setCurrentSlide(prev => prev === heroMangas.length - 1 ? 0 : prev + 1)} className="p-4 rounded-full bg-foreground/5 backdrop-blur-md border border-white/10 text-foreground/40 hover:text-primary transition-all">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* --- HIZLI KATEGORİLER --- */}
      <section className="py-14 bg-foreground/[0.02] border-b border-foreground/5 relative z-20">
        <div className="container mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-6 min-w-max justify-start lg:justify-center">
            <div className="flex items-center gap-3 mr-8 opacity-30">
              <MagnifyingGlassIcon className="h-5 w-5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">HIZLI REYON</span>
            </div>
            {quickCategories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/kategori/${cat.slug}`}
                className={`px-10 py-5 rounded-full border text-[11px] font-black transition-all uppercase tracking-widest shadow-sm hover:shadow-2xl hover:-translate-y-2 active:scale-95 ${cat.color}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- HAFTANIN FAVORİLERİ --- */}
      <section className="container mx-auto px-6 sm:px-12 lg:px-20 py-40 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-foreground/5 pb-14 mb-24">
          <div>
            <h2 className="text-6xl sm:text-7xl font-black text-foreground uppercase tracking-tighter leading-none">
              Sokağın <span className="text-primary italic font-serif lowercase tracking-normal">Gözdeleri</span>
            </h2>
            <p className="mt-6 text-xl text-foreground/40 font-medium italic">Kütüphanenizin baş köşesini hak eden başyapıtlar.</p>
          </div>
          <Link href="/populer" className="group text-[12px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4 hover:underline transition-all">
            TÜMÜNÜ GÖR <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-28">
          {bestSellers.map((manga) => (
            <div key={manga.id} className="group flex flex-col">
              <div className="relative aspect-[2/3] rounded-[4rem] overflow-hidden bg-foreground/5 shadow-2xl transition-all duration-700 ring-1 ring-foreground/5 group-hover:ring-primary/40 group-hover:-translate-y-6 group-hover:shadow-[0_60px_100px_rgba(var(--primary),0.15)]">
                <Link href={`/manga/${manga.slug}`} className="block w-full h-full cursor-pointer">
                  <Image 
                    src={manga.image || '/placeholder.png'} 
                    alt={manga.title} 
                    fill
                    className="object-cover transition-transform duration-[2500ms] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-10">
                    <div className="w-full bg-white text-primary py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                      <ShoppingCartIcon className="h-5 w-5" /> SERİYİ İNCELE
                    </div>
                  </div>
                </Link>

                <div className="absolute top-10 left-10 z-10 flex flex-col gap-3">
                  {manga.isOneShot && (
                    <span className="bg-secondary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase border border-white/20">ONE-SHOT</span>
                  )}
                  <span className="bg-background/80 backdrop-blur-md text-foreground px-4 py-2 rounded-2xl text-[9px] font-black shadow-lg border border-white/10">#{manga.popularityRank}</span>
                </div>
              </div>

              <div className="mt-12 px-6 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-between mb-4">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{manga.category}</span>
                  <div className="hidden lg:flex items-center gap-1.5">
                    <StarSolid className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold text-foreground/40">{Number(manga.rating || 0).toFixed(1)}</span>
                  </div>
                </div>
                
                <h3 className="text-4xl font-black text-foreground uppercase tracking-tight leading-[0.85] group-hover:text-primary transition-colors mb-4">
                  <Link href={`/manga/${manga.slug}`}>{manga.title}</Link>
                </h3>
                
                <p className="text-sm text-foreground/40 font-bold italic mb-8">{manga.author}</p>
                
                <div className="pt-8 border-t border-foreground/5 flex items-center justify-between">
                  <p className="text-3xl font-black text-accent tracking-tighter italic leading-none">₺{Number(manga.price).toFixed(2)}</p>
                  <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em]">{manga.isOneShot ? 'NET' : 'BAŞLAYAN'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dekoratif Işıltılar */}
      <div className="absolute top-1/2 -right-96 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[180px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 -left-96 w-[1100px] h-[1100px] bg-secondary/5 rounded-full blur-[220px] pointer-events-none"></div>
    </div>
  );
}