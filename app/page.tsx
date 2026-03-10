"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRightIcon, 
  ShoppingCartIcon,
  FireIcon // EKSİK İKON EKLENDİ
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';
import { featuredMangas, allMangas } from '@/lib/data';

const quickCategories = [
  { name: 'Shounen', color: 'bg-primary/5 text-primary hover:bg-primary hover:text-white border-primary/20' },
  { name: 'Seinen', color: 'bg-accent/5 text-accent hover:bg-accent hover:text-white border-accent/20' },
  { name: 'Shoujo', color: 'bg-secondary/5 text-secondary hover:bg-secondary hover:text-white border-secondary/20' },
  { name: 'Isekai', color: 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground border-foreground/10' },
  { name: 'Hayattan Kesitler', color: 'bg-primary/5 text-primary hover:bg-primary/20 border-primary/10' },
  { name: 'Karanlık Fantezi', color: 'bg-accent/5 text-accent hover:bg-accent/20 border-accent/10' },
];

export default function Home() {
  const heroMangas = [...allMangas].sort((a, b) => a.popularityRank - b.popularityRank).slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  const marqueeText1 = allMangas.map(m => m.title).join(' ✦ ') + ' ✦ ';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroMangas.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [heroMangas.length]);

  return (
    <div className="relative bg-background transition-colors duration-500 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
      `}} />

      {/* --- TAM SAYFA SİNEMATİK HERO BANNER --- */}
      <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden bg-foreground/5 -mt-20 group/slider">
        
        {heroMangas.map((manga, idx) => (
          <div 
            key={manga.id} 
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* UX: GÖRSEL VE ARKA PLAN KOMPLE TIKLANABİLİR */}
            <Link href={`/manga/${manga.id}`} className="absolute inset-0 z-0 block cursor-pointer group/bg">
              
              <Image
                src={manga.image}
                alt={manga.title}
                fill
                sizes="100vw"
                className={`object-cover object-[center_20%] transition-transform duration-[8000ms] ease-linear ${
                  currentSlide === idx ? 'scale-105 group-hover/bg:scale-110' : 'scale-100'
                }`}
                priority={idx === 0}
              />
              
              {/* SİNEMATİK GRADYANLAR */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent sm:via-background/80 sm:to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent h-32"></div>

              {/* AKAN YAZI */}
              <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none mix-blend-overlay">
                <div className="w-[200%] flex animate-scroll-left">
                  <span className="text-[10rem] sm:text-[16rem] font-black uppercase whitespace-nowrap text-foreground leading-none">
                    {marqueeText1}{marqueeText1}
                  </span>
                </div>
              </div>
            </Link>

            {/* İÇERİK ALANI - DİKEYDE TAM MERKEZLENMİŞ EKSİKSİZ YAPI */}
            <div className="absolute inset-0 flex items-center z-10 pt-20 pointer-events-none">
              {/* NAVBAR İLE AYNI HİZALAMA: px-4 sm:px-8 lg:px-12 xl:px-16 */}
              <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto">
                
                {/* H-FULL VE JUSTIFY-CENTER İLE YAZILAR EKRANIN ORTASINA OTURUR */}
                <div className="w-full sm:w-2/3 lg:w-1/2 flex flex-col justify-center text-left pointer-events-auto pb-10">
                  
                  {/* Günün Eseri Rozeti (Geri Geldi!) */}
                  <div className="inline-flex items-center gap-2 bg-accent text-white px-3 py-1.5 rounded-xl mb-6 w-fit shadow-lg">
                    <FireIcon className="h-4 w-4 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Günün Eseri</span>
                  </div>

                  {/* Kategori ve Puan */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ring-1 ring-primary/20">
                      {manga.category}
                    </span>
                    <span className="bg-background/40 backdrop-blur-md text-foreground px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-foreground/10">
                      <StarSolid className="h-3 w-3 text-accent" /> {manga.rating}.0
                    </span>
                  </div>
                  
                  {/* Başlık */}
                  <Link href={`/manga/${manga.id}`}>
                    <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-4 hover:text-primary transition-colors drop-shadow-lg">
                      {manga.title}
                    </h2>
                  </Link>
                  
                  {/* Yazar */}
                  <p className="text-xl sm:text-2xl text-primary font-bold italic mb-6 drop-shadow-md">
                    {manga.author}
                  </p>
                  
                  {/* Açıklama */}
                  <p className="text-base sm:text-lg text-foreground/80 font-medium leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-4 mb-10 drop-shadow-sm">
                    {manga.description}
                  </p>
                  
                  {/* Fiyat ve Buton */}
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex flex-col">
                      <p className="text-5xl sm:text-6xl font-black text-accent tracking-tighter drop-shadow-md">₺{manga.price.toFixed(2)}</p>
                      {manga.originalPrice && (
                        <p className="text-sm text-foreground/50 line-through font-bold mt-1">₺{manga.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => { e.preventDefault(); console.log('Sepete eklendi'); }}
                      className="bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[2rem] text-xs sm:text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 group/btn"
                    >
                      <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6 group-hover/btn:rotate-12 transition-transform" />
                      Sepete Ekle
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Kontrol Noktaları */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20 pointer-events-auto">
          {heroMangas.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === idx 
                  ? 'bg-primary w-10 h-2.5 shadow-[0_0_15px_rgba(var(--primary),0.6)]' 
                  : 'bg-foreground/20 backdrop-blur-md w-2.5 h-2.5 hover:bg-foreground/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* --- HIZLI KATEGORİLER --- */}
      <section className="border-b border-foreground/5 bg-foreground/[0.01] py-8 overflow-x-auto scrollbar-hide relative z-20">
        {/* NAVBAR İLE AYNI HİZALAMA */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto">
          <div className="flex items-center gap-4 sm:justify-center min-w-max">
            <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] mr-2">Hızlı Keşfet</span>
            {quickCategories.map((cat) => (
              <Link 
                key={cat.name} 
                href={`/kategori/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                className={`px-6 py-3 rounded-full border text-xs font-bold transition-all uppercase tracking-widest ${cat.color}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- HAFTANIN FAVORİLERİ --- */}
      <section id="haftanin-favorileri" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto py-20 sm:py-32 relative z-20 bg-background">
        <div className="flex items-end justify-between border-b border-foreground/5 pb-8 mb-16">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tighter">
              Haftanın <span className="text-primary italic font-serif lowercase tracking-normal">Favorileri</span>
            </h2>
            <p className="mt-2 text-base text-foreground/50 font-medium">Topluluğun en çok okuduğu seriler</p>
          </div>
          <Link href="/populer" className="group text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
            Hepsini Gör 
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featuredMangas.map((manga) => (
            <div key={manga.id} className="group relative flex flex-col">
              
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2.5rem] bg-foreground/5 shadow-xl group-hover:shadow-[0_20px_50px_rgba(var(--primary),0.15)] transition-all duration-500 ring-1 ring-foreground/5 group-hover:ring-primary/30 group-hover:-translate-y-2">
                <Link href={`/manga/${manga.id}`} className="block w-full h-full">
                  <Image 
                    src={manga.image} 
                    alt={manga.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                </Link>
                
                {manga.badge && (
                  <div className="absolute top-5 left-5 z-10 pointer-events-none">
                    <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {manga.badge}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transform translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`${manga.title} sepete eklendi!`);
                    }}
                    className="w-full bg-white/95 backdrop-blur-md text-primary py-4 rounded-2xl text-xs font-black shadow-2xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors uppercase tracking-widest active:scale-95"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Sepete Ekle
                  </button>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              <div className="mt-6 flex flex-col px-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{manga.category}</p>
                  <div className="flex items-center gap-1">
                    <StarSolid className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold text-foreground/40">{manga.rating}.0</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-foreground tracking-tight leading-none group-hover:text-primary transition-colors truncate">
                  <Link href={`/manga/${manga.id}`}>
                    {manga.title}
                  </Link>
                </h3>
                
                <p className="mt-1 text-xs text-foreground/40 font-bold italic">{manga.author}</p>
                
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-black text-accent tracking-tighter">₺{manga.price.toFixed(2)}</span>
                  {manga.originalPrice && (
                    <span className="text-xs text-foreground/30 line-through font-bold">₺{manga.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}