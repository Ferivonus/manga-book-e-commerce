"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  TruckIcon, 
  InformationCircleIcon,
  ChevronRightIcon,
  BookOpenIcon,
  SparklesIcon} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

import { getMangaBySlug } from '@/lib/api';

// --- KESİN TİP TANIMLAMALARI ---
interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
}

interface VolumeDetail {
  id: number;
  volumeNumber: number | null;
  title: string;
  slug: string;
  price: number | string; // Prisma Decimal güvenliği
  originalPrice: number | string | null;
  imageUrl: string;
  stock: number;
  pages: number;
  publisher: string | null;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

interface MangaSeriesWithVolumes {
  id: number;
  title: string;
  slug: string;
  author: string;
  rating: number | string | null;
  category: CategoryInfo;
  volumes: VolumeDetail[];
}

export default function VolumeDetailPage({ 
  params 
}: { 
  params: Promise<{ seriesSlug: string; volumeSlug: string }> 
}) {
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState<number>(1);
  const [manga, setManga] = useState<MangaSeriesWithVolumes | null>(null);
  const [currentVolume, setCurrentVolume] = useState<VolumeDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getMangaBySlug(resolvedParams.seriesSlug);
        
        if (!data) {
          notFound();
          return;
        }

        // Tip güvenliği sağlandı
        const mangaData = data as unknown as MangaSeriesWithVolumes;
        setManga(mangaData);

        const volume = mangaData.volumes?.find(v => v.slug === resolvedParams.volumeSlug);
        
        if (!volume) {
          notFound();
          return;
        }
        
        setCurrentVolume(volume);
      } catch (error) {
        console.error("Cilt detayları senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [resolvedParams.seriesSlug, resolvedParams.volumeSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <SparklesIcon className="h-6 w-6 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">Sayfalar Diziliyor...</p>
      </div>
    );
  }

  if (!manga || !currentVolume) return null;

  // Hesaplamalar (Decimal Güvenliği)
  const priceNum = Number(currentVolume.price);
  const originalPriceNum = currentVolume.originalPrice ? Number(currentVolume.originalPrice) : null;
  
  const discountPercentage = originalPriceNum 
    ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100) 
    : 0;

  const displayRating = Number(manga.rating || 0).toFixed(1);

  return (
    <div className="bg-background min-h-screen pb-32 transition-colors duration-500">
      
      {/* SİNEMATİK BREADCRUMB */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ol className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
          <li><Link href="/" className="hover:text-primary transition-colors">Sokak</Link></li>
          <li className="opacity-40"><ChevronRightIcon className="h-3 w-3" /></li>
          <li><Link href={`/manga/${manga.slug}`} className="hover:text-primary transition-colors italic">{manga.title}</Link></li>
          <li className="opacity-40"><ChevronRightIcon className="h-3 w-3" /></li>
          <li className="text-primary truncate">
             {currentVolume.volumeNumber ? `Cilt ${currentVolume.volumeNumber}` : 'Tek Cilt'}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-20">
          
          {/* SOL: CİLT GÖRSELİ */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[4rem] bg-foreground/5 shadow-[0_50px_100px_rgba(0,0,0,0.12)] ring-1 ring-foreground/10 group-hover:ring-primary/40 transition-all duration-700">
              <Image
                src={currentVolume.imageUrl || '/placeholder.png'}
                alt={currentVolume.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                priority
              />
              
              <div className="absolute top-10 left-10 flex flex-col gap-4 z-10">
                <span className="bg-background/90 backdrop-blur-xl text-foreground px-5 py-2 rounded-2xl text-[10px] font-black shadow-2xl uppercase tracking-widest border border-white/20">
                   {currentVolume.volumeNumber ? `CİLT ${currentVolume.volumeNumber}` : 'TEK CİLT'}
                </span>
                {discountPercentage > 0 && (
                  <span className="bg-accent text-white px-5 py-2 rounded-2xl text-[10px] font-black shadow-2xl uppercase tracking-widest animate-pulse border border-white/10">
                    %{discountPercentage} FIRSAT
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SAĞ: ÜRÜN BİLGİSİ */}
          <div className="mt-16 lg:mt-0 lg:col-span-7">
            <div className="border-b border-foreground/5 pb-12">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary/20">
                  {manga.category?.name || 'Manga'}
                </span>
                <div className="flex items-center gap-1.5 text-accent">
                  <StarSolid className="h-4 w-4" />
                  <span className="text-sm font-black italic">{displayRating}</span>
                </div>
              </div>

              <h1 className="text-6xl sm:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-8">
                {currentVolume.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-2xl text-foreground/30 font-bold italic tracking-tight flex items-center gap-2">
                  Seri: <Link href={`/manga/${manga.slug}`} className="text-primary hover:underline decoration-2 underline-offset-8">{manga.title}</Link>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/10 hidden sm:block"></span>
                <div className="flex items-center gap-2">
                   <BookOpenIcon className="h-5 w-5 text-foreground/20" />
                   <p className="text-sm text-foreground/40 font-bold italic">{manga.author}</p>
                </div>
              </div>
            </div>

            {/* Fiyat ve Aksiyon */}
            <div className="py-12">
              <div className="flex items-end gap-8 mb-12">
                <div className="flex flex-col">
                  {originalPriceNum && (
                    <span className="text-2xl text-foreground/20 line-through font-bold mb-[-5px] italic">₺{originalPriceNum.toFixed(2)}</span>
                  )}
                  <span className="text-7xl font-black text-accent tracking-tighter italic leading-none">₺{priceNum.toFixed(2)}</span>
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-2 bg-secondary/5 px-4 py-2 rounded-2xl border border-secondary/10 text-secondary">
                    <TruckIcon className="h-5 w-5" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                       {currentVolume.stock > 0 ? 'Stokta Mevcut' : 'Tükendi'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Miktar Seçici */}
                <div className="flex items-center justify-between bg-foreground/[0.03] rounded-[2rem] p-2 sm:w-48 border border-foreground/5 shadow-inner">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-14 w-14 flex items-center justify-center text-foreground/20 hover:text-primary transition-all text-2xl font-black">-</button>
                  <span className="text-2xl font-black text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(currentVolume.stock || 1, q + 1))} className="h-14 w-14 flex items-center justify-center text-foreground/20 hover:text-primary transition-all text-2xl font-black">+</button>
                </div>

                {/* Sepet Butonu */}
                <button className="flex-1 bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <ShoppingCartIcon className="h-6 w-6 relative z-10" />
                  <span className="relative z-10">BU CİLDİ SEPETE EKLE</span>
                </button>
              </div>
            </div>

            {/* Künye Kartı */}
            <div className="bg-foreground/[0.02] rounded-[3.5rem] p-10 sm:p-12 border border-foreground/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <h3 className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <InformationCircleIcon className="h-5 w-5" /> Teknik Künye
              </h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                <InfoItem label="YAYINEVİ" value={currentVolume.publisher || 'Bilinmiyor'} />
                <InfoItem label="SAYFA SAYISI" value={currentVolume.pages} />
                <InfoItem label="DİL" value="Türkçe" />
                <InfoItem label="LOJİSTİK" value="Hızlı Teslimat" />
              </div>
            </div>

            {/* Seri Navigasyonu */}
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between px-6 gap-4">
               <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">Hikayenin Diğer Parçaları</p>
               <Link href={`/manga/${manga.slug}`} className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:underline italic flex items-center gap-2">
                 TÜM SERİYİ GÖR <ChevronRightIcon className="h-3 w-3" />
               </Link>
            </div>
            
            <div className="mt-8 flex gap-5 overflow-x-auto pb-6 scrollbar-hide px-2">
              {manga.volumes?.filter(v => v.slug !== currentVolume.slug).map(vol => (
                <Link key={vol.id} href={`/manga/${manga.slug}/${vol.slug}`} className="flex-shrink-0 group flex flex-col items-center">
                  <div className="relative h-44 w-32 rounded-3xl overflow-hidden ring-1 ring-foreground/10 group-hover:ring-primary/50 group-hover:-translate-y-2 transition-all duration-500 shadow-lg">
                    <Image src={vol.imageUrl || '/placeholder.png'} alt={vol.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-[9px] font-black tracking-widest uppercase">Göz At</span>
                    </div>
                  </div>
                  <p className="text-center text-[9px] font-black mt-4 text-foreground/30 uppercase tracking-tighter">
                     {vol.volumeNumber ? `CİLT ${vol.volumeNumber}` : 'TEK CİLT'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="space-y-2">
      <p className="text-[9px] text-foreground/20 font-black uppercase tracking-widest">{label}</p>
      <p className="text-base font-bold text-foreground italic leading-none">{value}</p>
    </div>
  );
}