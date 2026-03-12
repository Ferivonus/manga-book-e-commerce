"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpenIcon, 
  UserIcon, 
  FireIcon, 
  ChevronRightIcon,
  Square3Stack3DIcon,
  ChatBubbleBottomCenterTextIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

import { getMangaBySlug, getMangas } from '@/lib/api';

// --- KESİN TİP TANIMLAMALARI ---
interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
}

interface Volume {
  id: number;
  volumeNumber: number | null;
  title: string;
  slug: string;
  price: number | string; // Prisma Decimal bazen string dönebilir
  imageUrl: string;
  stock: number;
}

interface MangaSeriesDetail {
  id: number;
  title: string;
  slug: string;
  author: string;
  description: string | null;
  isOneShot: boolean;
  rating: number | string | null;
  reviewsCount: number;
  popularityRank: number;
  category: CategoryInfo; // İlişkili kategori objesi
  volumes: Volume[];     // İlişkili ciltler dizisi
}

// Önerilenler için basitleştirilmiş tip
interface SuggestionManga {
  id: number;
  title: string;
  slug: string;
  isOneShot: boolean;
  volumes: { price: number | string; imageUrl: string }[];
}

export default function SeriesDetailPage({ 
  params 
}: { 
  params: Promise<{ seriesSlug: string }> 
}) {
  const resolvedParams = use(params);
  const [manga, setManga] = useState<MangaSeriesDetail | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionManga[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeriesData = async () => {
      setIsLoading(true);
      try {
        const data = await getMangaBySlug(resolvedParams.seriesSlug);
        
        if (!data) {
          notFound();
          return;
        }

        setManga(data as unknown as MangaSeriesDetail);

        const { mangas: allData } = await getMangas();
        if (allData) {
          // Tip güvenliği için cast işlemi
          const filtered = (allData as unknown as SuggestionManga[])
            .filter(m => m.slug !== resolvedParams.seriesSlug)
            .slice(0, 4);
          setSuggestions(filtered);
        }

      } catch (error) {
        console.error("Seri bilgileri senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeriesData();
  }, [resolvedParams.seriesSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <BookOpenIcon className="h-6 w-6 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">Kütüphane Taranıyor...</p>
      </div>
    );
  }

  if (!manga) return null;

  // Hesaplamalar
  const coverImage = manga.volumes?.[0]?.imageUrl || '/placeholder.png';
  const displayRating = Number(manga.rating || 0).toFixed(1);

  return (
    <div className="bg-background min-h-screen pb-32 transition-colors duration-500">
      
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ol className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
          <li><Link href="/" className="hover:text-primary transition-colors">Sokak</Link></li>
          <li className="opacity-40"><ChevronRightIcon className="h-3 w-3" /></li>
          <li><Link href="/koleksiyon" className="hover:text-primary transition-colors italic">Kütüphane</Link></li>
          <li className="opacity-40"><ChevronRightIcon className="h-3 w-3" /></li>
          <li className="text-primary truncate">{manga.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* SERİ HERO */}
        <div className="relative mb-24 overflow-hidden rounded-[4rem] bg-foreground/[0.02] border border-foreground/5 p-8 sm:p-20 shadow-2xl shadow-foreground/[0.02]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="lg:flex lg:items-center lg:gap-24 relative z-10">
            <div className="w-full lg:w-[400px] flex-shrink-0 mb-12 lg:mb-0">
              <div className="relative aspect-[2/3] w-full rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] ring-1 ring-white/20 group">
                <Image 
                  src={coverImage} 
                  alt={manga.title} 
                  fill 
                  className="object-cover transition-transform duration-[3s] group-hover:scale-110" 
                  priority 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="bg-primary text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {manga.category?.name}
                </span>
                <div className="flex items-center gap-1.5 text-accent bg-accent/5 px-4 py-2 rounded-2xl border border-accent/10">
                  <StarSolid className="h-4 w-4" />
                  <span className="text-sm font-black italic">{displayRating}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/40 px-4 py-2">
                  <FireIcon className="h-5 w-5 text-accent/60" />
                  <span className="text-[10px] font-black uppercase tracking-widest">#{manga.popularityRank} Gündemde</span>
                </div>
              </div>

              <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-10">
                {manga.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 pb-12 border-b border-foreground/5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-background rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm border border-foreground/5">
                    <UserIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">Müellif</p>
                    <p className="text-lg font-bold text-foreground italic tracking-tight">{manga.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-background rounded-[1.5rem] flex items-center justify-center text-secondary shadow-sm border border-foreground/5">
                    <Square3Stack3DIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">Koleksiyon</p>
                    <p className="text-lg font-bold text-foreground italic tracking-tight">
                      {manga.isOneShot ? 'Tek Cilt (Tam)' : `${manga.volumes?.length || 0} Cilt Mevcut`}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xl text-foreground/50 leading-relaxed font-medium italic max-w-2xl">
                &quot;{manga.description || 'Bu eşsiz serinin hikayesi çok yakında burada olacak.'}&quot;
              </p>
            </div>
          </div>
        </div>

        {/* CİLTLER GRID */}
        <div className="mt-40">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 border-b border-foreground/5 pb-10 gap-6">
            <div>
              <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter italic">
                {manga.isOneShot ? 'Eser' : 'Mevcut'} <span className="text-primary">Ciltler</span>
              </h2>
              <p className="text-foreground/30 text-[11px] font-black uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-secondary" />
                Hikayenin parçalarını bir araya getir
              </p>
            </div>
            <div className="flex items-center gap-3 bg-foreground/[0.03] px-6 py-3 rounded-2xl border border-foreground/5">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-foreground/30" />
              <span className="text-xs font-bold text-foreground/60 italic">{manga.reviewsCount} Okuyucu Yorumu</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {manga.volumes && manga.volumes.length > 0 ? (
              manga.volumes.map((vol) => (
                <div key={vol.id} className="group flex flex-col">
                  <div className="relative aspect-[2/3] rounded-[3.5rem] overflow-hidden bg-foreground/5 shadow-xl transition-all duration-700 ring-1 ring-foreground/5 group-hover:ring-primary/40 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(var(--primary),0.15)]">
                    <Link href={`/manga/${manga.slug}/${vol.slug}`} className="block w-full h-full">
                      <Image 
                        src={vol.imageUrl || '/placeholder.png'} 
                        alt={vol.title} 
                        fill 
                        className="object-cover transition-transform duration-[2500ms] group-hover:scale-110" 
                      />
                    </Link>
                    
                    <div className="absolute top-8 left-8">
                      <span className="bg-background/90 backdrop-blur-xl text-foreground text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-white/20 shadow-lg">
                        {vol.volumeNumber ? `CİLT ${vol.volumeNumber}` : 'TEK CİLT'}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                      <Link 
                        href={`/manga/${manga.slug}/${vol.slug}`}
                        className="w-full bg-white/95 backdrop-blur-md text-primary py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95"
                      >
                        <ShoppingBagIcon className="h-5 w-5" /> İNCELE VE EKLE
                      </Link>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  <div className="mt-10 px-4 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors leading-tight mb-4">
                      <Link href={`/manga/${manga.slug}/${vol.slug}`}>{vol.title}</Link>
                    </h3>
                    <div className="flex items-center gap-5">
                      <span className="text-3xl font-black text-accent tracking-tighter italic leading-none">₺{Number(vol.price).toFixed(2)}</span>
                      {vol.stock < 10 && vol.stock > 0 && (
                         <div className="px-3 py-1 bg-accent/5 rounded-lg border border-accent/10">
                            <span className="text-[9px] font-black text-accent uppercase animate-pulse">Son {vol.stock}!</span>
                         </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-foreground/[0.02] rounded-[4rem] border-2 border-dashed border-foreground/5 px-10">
                <BookOpenIcon className="h-12 w-12 text-foreground/10 mx-auto mb-6" />
                <p className="text-foreground/30 text-xl font-bold italic tracking-tight uppercase">Bu serinin sayfaları henüz raflara dizilmedi.</p>
              </div>
            )}
          </div>
        </div>

        {/* ÖNERİLEN SERİLER */}
        {suggestions.length > 0 && (
          <div className="mt-56 pt-24 border-t border-foreground/5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 gap-6">
              <div>
                <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter italic leading-none">
                  Bunlar da <span className="text-primary">Ruhuna</span> Dokunabilir
                </h2>
                <p className="text-foreground/30 text-sm font-bold uppercase tracking-widest mt-6">Kütüphanenin diğer gizli hazineleri</p>
              </div>
              <Link href="/koleksiyon" className="group text-[11px] font-black text-primary uppercase tracking-[0.25em] flex items-center gap-4 hover:underline underline-offset-8 decoration-2 transition-all">
                TÜM KOLEKSİYON <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {suggestions.map((item) => (
                <Link key={item.id} href={`/manga/${item.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[2/3] rounded-[3.5rem] overflow-hidden bg-foreground/5 shadow-xl group-hover:shadow-[0_40px_80px_rgba(var(--primary),0.15)] ring-1 ring-foreground/5 group-hover:ring-primary/40 transition-all duration-700 mb-10 group-hover:-translate-y-3">
                    <Image 
                      src={item.volumes?.[0]?.imageUrl || '/placeholder.png'} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <h3 className="font-black text-foreground text-3xl group-hover:text-primary transition-colors leading-none uppercase tracking-tighter truncate px-2">{item.title}</h3>
                  <div className="flex items-center justify-between mt-5 px-2">
                    <p className="text-accent font-black text-2xl italic tracking-tighter">
                      ₺{Number(item.volumes?.[0]?.price || 0).toFixed(2)}
                    </p>
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-widest">{item.isOneShot ? 'ONE-SHOT' : 'SERİ'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Arka Plan Dekoratif Işıltı */}
      <div className="absolute bottom-0 -left-64 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none opacity-50"></div>
    </div>
  );
}