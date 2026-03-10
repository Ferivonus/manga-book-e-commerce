"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  AdjustmentsHorizontalIcon, 
  ChevronDownIcon,
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';
import { allMangas } from '@/lib/data';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [activeSort, setActiveSort] = useState('En Yeniler');

  // Filtreleme mantığı
  const filteredMangas = allMangas.filter(
    (manga) => manga.category.toLowerCase().replace(/ /g, '-') === slug
  );

  const categoryName = filteredMangas.length > 0 
    ? filteredMangas[0].category 
    : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return (
    <div className="bg-background min-h-screen pb-24 transition-colors duration-500">
      
      {/* --- KATEGORİ HEADER (HERO) --- */}
      <div className="relative bg-primary/5 py-16 border-b border-foreground/5 overflow-hidden">
        {/* Dekoratif Arka Plan Elemanları */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex mb-6 text-sm font-medium">
            <Link href="/" className="text-foreground/40 hover:text-primary transition-colors">Ana Sayfa</Link>
            <span className="mx-3 text-foreground/20">/</span>
            <span className="text-foreground/80">Koleksiyon</span>
            <span className="mx-3 text-foreground/20">/</span>
            <span className="text-primary font-bold uppercase tracking-widest text-[11px] mt-0.5">{categoryName}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tighter">
                {categoryName}
              </h1>
              <p className="mt-4 text-foreground/60 max-w-xl font-medium leading-relaxed italic">
                {categoryName} dünyasının en seçkin ve ruhu olan eserlerini senin için bir araya getirdik.
              </p>
            </div>
            <div className="bg-background px-4 py-2 rounded-2xl border border-foreground/10 shadow-sm flex items-center gap-3">
              <span className="text-sm font-bold text-primary italic">{filteredMangas.length}</span>
              <span className="text-sm font-medium text-foreground/60 uppercase tracking-widest text-[10px]">Eser Listeleniyor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- SIDEBAR (FİLTRELER) --- */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              
              {/* Sıralama */}
              <div>
                <h3 className="flex items-center gap-2 font-black text-foreground uppercase tracking-widest text-xs mb-6">
                  <AdjustmentsHorizontalIcon className="h-4 w-4 text-primary" />
                  Sıralama
                </h3>
                <div className="space-y-3">
                  {['En Yeniler', 'Fiyat: Artan', 'Fiyat: Azalan', 'Popülerlik'].map((sort) => (
                    <label key={sort} className="group flex items-center gap-3 text-sm text-foreground/60 cursor-pointer transition-all hover:translate-x-1">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={activeSort === sort}
                        onChange={() => setActiveSort(sort)}
                        className="w-4 h-4 accent-primary border-foreground/20 focus:ring-primary" 
                      />
                      <span className={`transition-colors ${activeSort === sort ? 'text-foreground font-bold' : 'group-hover:text-primary'}`}>
                        {sort}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fiyat Aralığı (Mock) */}
              <div className="pt-8 border-t border-foreground/5">
                <h3 className="font-black text-foreground uppercase tracking-widest text-xs mb-6 italic">Fiyat Aralığı</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Min" className="w-full bg-foreground/5 border-none rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary" />
                    <span className="text-foreground/20">-</span>
                    <input type="text" placeholder="Max" className="w-full bg-foreground/5 border-none rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary" />
                  </div>
                  <button className="w-full bg-foreground/10 hover:bg-primary hover:text-white py-2 rounded-lg text-[11px] font-black uppercase transition-all">Uygula</button>
                </div>
              </div>

              {/* Stok Durumu */}
              <div className="pt-8 border-t border-foreground/5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-primary border-foreground/20" />
                  <span className="text-xs font-bold text-foreground/60 group-hover:text-primary transition-colors uppercase tracking-widest">Sadece Stokta Olanlar</span>
                </label>
              </div>

            </div>
          </aside>

          {/* --- ÜRÜN GRID --- */}
          <main className="flex-1">
            {filteredMangas.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 gap-x-8 xl:grid-cols-3">
                {filteredMangas.map((manga) => (
                  <div key={manga.id} className="group relative flex flex-col">
                    
                    {/* Görsel Kutusu */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2rem] bg-foreground/5 ring-1 ring-inset ring-foreground/10 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:ring-primary/20">
                      <Image 
                        src={manga.image} 
                        alt={manga.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      
                      {/* Favorilere Ekle Butonu */}
                      <button className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 backdrop-blur-md text-foreground/40 hover:text-accent transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                        <HeartIcon className="h-5 w-5" />
                      </button>

                      {/* Badge */}
                      {manga.badge && (
                        <span className="absolute top-4 left-4 bg-accent/90 backdrop-blur-md text-white px-3 py-1 text-[10px] font-black rounded-lg shadow-sm z-10 uppercase tracking-widest">
                          {manga.badge}
                        </span>
                      )}

                      {/* Hover Sepete Ekle */}
                      <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transform translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                        <button className="w-full bg-primary/95 backdrop-blur-md text-white py-3.5 rounded-2xl text-xs font-black shadow-2xl flex items-center justify-center gap-2 hover:bg-primary transition-colors uppercase tracking-widest">
                          <ShoppingCartIcon className="h-4 w-4" />
                          Sepete Ekle
                        </button>
                      </div>

                      {/* Karartma Gradiyenti */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Bilgi Alanı */}
                    <div className="mt-6 flex flex-col gap-1 px-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{manga.category}</p>
                        <div className="flex items-center gap-1">
                          <StarSolid className="h-3 w-3 text-accent" />
                          <span className="text-[10px] font-bold text-foreground/40">{manga.rating}.0</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-black text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                        <Link href={`/manga/${manga.id}`}>
                          <span aria-hidden="true" className="absolute inset-0 z-0" />
                          {manga.title}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-foreground/50 font-medium italic">{manga.author}</p>
                      
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-2xl font-black text-accent tracking-tighter">₺{manga.price.toFixed(2)}</span>
                        {manga.originalPrice && (
                          <span className="text-sm text-foreground/30 line-through">₺{manga.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-32 bg-foreground/[0.02] rounded-[3rem] border-2 border-dashed border-foreground/10 px-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AdjustmentsHorizontalIcon className="h-10 w-10 text-primary opacity-50" />
                </div>
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Eser Bulunamadı</h3>
                <p className="mt-2 text-foreground/60 max-w-sm mx-auto">
                  Seçtiğin kategoride şu an için sergilenecek bir hikaye bulamadık ama diğer kategorilerimize göz atabilirsin.
                </p>
                <Link href="/koleksiyon" className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                  Kataloğu Keşfet
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}