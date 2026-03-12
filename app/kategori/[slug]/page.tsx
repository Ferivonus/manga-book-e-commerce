"use client";

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  BookOpenIcon,
  ChevronRightIcon,
  TagIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid, EyeIcon } from '@heroicons/react/20/solid';

// API Bağlantısı ve Tipler
import { getMangas, getCategories } from '@/lib/api';
import type { Manga } from '@/lib/data';

// --- Tip Tanımlaması (Sidebar için) ---
interface CategoryNav {
  name: string;
  href: string;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  // --- STATE YÖNETİMİ ---
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [navCategories, setNavCategories] = useState<CategoryNav[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSort, setActiveSort] = useState('En Yeniler');
  const [inStockOnly, setInStockOnly] = useState(false);

  // --- VERİ ÇEKME İŞLEMİ ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoryParam = slug === 'tumu' ? undefined : slug;
        
        // Kategori ürünlerini ve Yan Menü kategorilerini paralel çekiyoruz
        const [mangaResponse, categoriesResponse] = await Promise.all([
          getMangas(categoryParam, undefined, 1, 100),
          getCategories()
        ]);

        setMangas(mangaResponse.mangas);
        setNavCategories(categoriesResponse);
      } catch (error) {
        console.error("Kategori verileri senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // --- GELİŞMİŞ FİLTRELEME VE SIRALAMA ---
  const getProcessedMangas = () => {
    let processed = [...mangas];

    // 1. Stok Filtresi
    if (inStockOnly) {
      processed = processed.filter(m => m.stock > 0);
    }

    // 2. Sıralama Logic
    switch (activeSort) {
      case 'Fiyat: Artan':
        processed.sort((a, b) => a.price - b.price);
        break;
      case 'Fiyat: Azalan':
        processed.sort((a, b) => b.price - a.price);
        break;
      case 'Popülerlik':
        processed.sort((a, b) => a.popularityRank - b.popularityRank);
        break;
      default: // En Yeniler
        processed.sort((a, b) => (a.isNewArrival === b.isNewArrival ? 0 : a.isNewArrival ? -1 : 1));
        break;
    }

    return processed;
  };

  const displayedMangas = getProcessedMangas();

  // Kategori Adını Dinamik Belirle
  const currentCategoryName = slug === 'tumu' 
    ? 'Tüm Koleksiyon' 
    : (mangas.length > 0 ? mangas[0].category : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '));

  // --- LOADING EKRANI ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <SparklesIcon className="h-8 w-8 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">
          Kütüphane Rafları Diziliyor...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32 transition-colors duration-500">
      
      {/* --- KATEGORİ HERO BÖLÜMÜ --- */}
      <div className="relative bg-primary/[0.03] py-20 border-b border-foreground/5 overflow-hidden">
        {/* Dekoratif Ghibli Işıltıları */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] opacity-30"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
            <Link href="/" className="hover:text-primary transition-colors">Sokak</Link>
            <ChevronRightIcon className="h-3 w-3" />
            <Link href="/koleksiyon" className="hover:text-primary transition-colors">Kütüphane</Link>
            <ChevronRightIcon className="h-3 w-3" />
            <span className="text-primary italic">{currentCategoryName}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-3xl">
              <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.8] mb-8">
                {currentCategoryName}
              </h1>
              <p className="text-xl text-foreground/50 font-medium leading-relaxed italic max-w-2xl">
                {currentCategoryName} dünyasının en dokunaklı ve heyecan verici hikayelerini sokağımızın bu rafında keşfetmeye başla.
              </p>
            </div>
            {/* Profesyonel İstatistik Kartı */}
            <div className="bg-background/60 backdrop-blur-xl px-8 py-6 rounded-[3rem] border border-white/20 shadow-2xl flex items-center gap-6 group hover:-translate-y-2 transition-all duration-500">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpenIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-4xl font-black text-foreground leading-none">{displayedMangas.length}</p>
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mt-2">Eser Listeleniyor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* --- PROFESYONEL SIDEBAR (Gelişmiş Navigasyon & Filtre) --- */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-12">
              
              {/* Bölüm 1: Kategoriler (Kullanıcı Deneyimi için Şart) */}
              <div>
                <h3 className="flex items-center gap-2 font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8 opacity-30">
                  <TagIcon className="h-4 w-4" /> REYONLAR
                </h3>
                <div className="flex flex-col gap-2">
                  {navCategories.map((cat) => (
                    <Link 
                      key={cat.href} 
                      href={cat.href}
                      className={`px-6 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group ${
                        slug === cat.href.split('/').pop() 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 -translate-y-0.5' 
                        : 'hover:bg-foreground/[0.03] text-foreground/40 hover:text-primary'
                      }`}
                    >
                      {cat.name}
                      <ChevronRightIcon className={`h-4 w-4 transition-transform ${slug === cat.href.split('/').pop() ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bölüm 2: Sıralama */}
              <div className="pt-10 border-t border-foreground/5">
                <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] mb-8">SIRALAMA</h3>
                <div className="space-y-4">
                  {['En Yeniler', 'Fiyat: Artan', 'Fiyat: Azalan', 'Popülerlik'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setActiveSort(sort)}
                      className="group flex items-center gap-4 w-full transition-all"
                    >
                      <div className={`h-3 w-3 rounded-full border-2 transition-all ${activeSort === sort ? 'bg-primary border-primary scale-125 shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'border-foreground/10 group-hover:border-primary/50'}`} />
                      <span className={`text-sm font-black tracking-tight transition-colors ${activeSort === sort ? 'text-primary' : 'text-foreground/30 group-hover:text-primary'}`}>
                        {sort}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bölüm 3: Stok Filtresi */}
              <div className="pt-10 border-t border-foreground/5">
                <label className="flex items-center gap-4 cursor-pointer group p-5 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 hover:border-primary/20 transition-all shadow-inner">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="peer h-6 w-6 opacity-0 absolute cursor-pointer" 
                    />
                    <div className="h-6 w-6 border-2 border-foreground/10 rounded-xl peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                      <div className="h-2 w-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                    </div>
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${inStockOnly ? 'text-primary' : 'text-foreground/40'}`}>
                    SADECE STOKTA
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* --- ÜRÜN GRID --- */}
          <main className="flex-1">
            {displayedMangas.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-24 sm:grid-cols-2 gap-x-12 xl:grid-cols-3">
                {displayedMangas.map((manga) => {
                  // İndirim Oranı Hesabı
                  const discount = manga.originalPrice 
                    ? Math.round(((manga.originalPrice - manga.price) / manga.originalPrice) * 100) 
                    : 0;

                  return (
                    <div key={manga.id} className="group relative flex flex-col h-full">
                      
                      {/* Görsel Kutusu */}
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3.5rem] bg-foreground/5 ring-1 ring-inset ring-foreground/10 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(var(--primary),0.15)] group-hover:-translate-y-4 group-hover:ring-primary/40 shadow-xl">
                        <Link href={`/manga/${manga.slug}`} className="block w-full h-full">
                          <Image 
                            src={manga.image} 
                            alt={manga.title} 
                            fill
                            className="object-cover transition-transform duration-[2500ms] group-hover:scale-110" 
                          />
                        </Link>
                        
                        {/* Dinamik Rozetler */}
                        <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                          {discount > 0 && (
                            <span className="bg-accent text-white px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/20 animate-pulse">
                              %{discount} FIRSAT
                            </span>
                          )}
                          {manga.isOneShot && (
                            <span className="bg-secondary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/10 flex items-center gap-2">
                              <SparklesIcon className="h-3 w-3" /> ONE-SHOT
                            </span>
                          )}
                        </div>

                        {/* Social Proof Cam Panel */}
                        <div className="absolute bottom-8 left-8 right-8 z-10 bg-background/60 backdrop-blur-2xl px-5 py-3 rounded-[2rem] flex items-center justify-between shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <div className="flex items-center gap-2">
                            <EyeIcon className="h-4 w-4 text-primary" />
                            <span className="text-[10px] font-black text-foreground tracking-widest">{manga.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <StarSolid className="h-3.5 w-3.5 text-accent" />
                            <span className="text-[10px] font-black text-foreground">{manga.rating}.0</span>
                          </div>
                        </div>

                        {/* Hover Overlay Aksiyonu */}
                        <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                          <Link 
                            href={`/manga/${manga.slug}`}
                            className="w-full bg-white/95 backdrop-blur-md text-primary py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95"
                          >
                            <ShoppingCartIcon className="h-5 w-5" />
                            HEMEN İNCELE
                          </Link>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      </div>

                      {/* Bilgi Alanı */}
                      <div className="mt-10 flex flex-col gap-2 px-4 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{manga.category}</span>
                          {manga.isBestSeller && <CheckBadgeIcon className="h-5 w-5 text-accent" />}
                        </div>
                        
                        <h3 className="text-3xl font-black text-foreground tracking-tighter leading-[0.85] group-hover:text-primary transition-colors uppercase mb-2">
                          <Link href={`/manga/${manga.slug}`}>
                            {manga.title}
                          </Link>
                        </h3>
                        
                        <p className="text-sm text-foreground/40 font-bold italic mb-6">{manga.author}</p>
                        
                        <div className="mt-auto pt-8 border-t border-foreground/5 flex items-center justify-between relative z-20">
                          <div className="flex flex-col">
                            <p className="text-[9px] font-black text-foreground/20 uppercase tracking-widest mb-1">
                               {manga.isOneShot ? 'NET SATIŞ FİYATI' : 'BAŞLAYAN FİYATLAR'}
                            </p>
                            <div className="flex items-baseline gap-3">
                               <p className="text-3xl font-black text-accent tracking-tighter italic leading-none">₺{manga.price.toFixed(2)}</p>
                               {manga.originalPrice && (
                                 <span className="text-sm text-foreground/20 line-through font-bold">₺{manga.originalPrice.toFixed(2)}</span>
                               )}
                            </div>
                          </div>
                          <p className="text-[9px] font-black text-foreground/20 uppercase italic opacity-40">{manga.publisher}</p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* Boş Durum Sanatı */
              <div className="text-center py-40 bg-foreground/[0.02] rounded-[5rem] border-2 border-dashed border-foreground/10 px-10">
                <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-10">
                  <AdjustmentsHorizontalIcon className="h-10 w-10 text-foreground/20" />
                </div>
                <h3 className="text-4xl font-black text-foreground uppercase tracking-tight italic mb-6">Arayış Sonuçsuz Kaldı</h3>
                <p className="mt-4 text-foreground/40 max-w-sm mx-auto font-medium italic mb-12">
                  Seçtiğin kriterlere uygun bir hikaye şu an raflarda yok. Toz cinleri bu reyonda temizlik yapıyor olabilir.
                </p>
                <Link href="/kategori/tumu" className="inline-flex items-center gap-4 bg-primary text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                  TÜM KOLEKSİYONU GÖR <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}