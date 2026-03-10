"use client";

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon,
  BookOpenIcon,
  InformationCircleIcon,
  EyeIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';
import { allMangas, featuredMangas } from '@/lib/data';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MangaDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ozet');

  // URL'deki ID ile tüm mangalar arasından doğru eseri buluyoruz
  const manga = allMangas.find((m) => m.id === resolvedParams.id);

  if (!manga) {
    notFound();
  }

  // Önerilenler kısmında senin istediğin gibi "featuredMangas" listesini kullanıyoruz
  // Mevcut ürünü listeden çıkartıyoruz ki kullanıcı aynı ürünü öneride görmesin
  const suggestions = featuredMangas.filter((m) => m.id !== manga.id).slice(0, 4);

  const discountPercentage = manga.originalPrice 
    ? Math.round(((manga.originalPrice - manga.price) / manga.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-background transition-colors duration-500 min-h-screen pb-20">
      
      {/* --- BREADCRUMB --- */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <ol className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
          <li><Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link></li>
          <li><span>/</span></li>
          <li><Link href="/koleksiyon" className="hover:text-primary transition-colors">Koleksiyon</Link></li>
          <li><span>/</span></li>
          <li className="text-primary truncate">{manga.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
          
          {/* --- SOL: GÖRSEL VE ETİKETLER --- */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3rem] bg-foreground/5 shadow-2xl ring-1 ring-foreground/10">
              <Image
                src={manga.image}
                alt={manga.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              
              {/* Dinamik Badge'ler */}
              <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
                {manga.badge && (
                  <span className="bg-secondary text-white px-4 py-2 rounded-2xl text-[10px] font-black shadow-xl uppercase tracking-widest">
                    {manga.badge}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-accent text-white px-4 py-2 rounded-2xl text-[10px] font-black shadow-xl uppercase tracking-widest animate-pulse">
                    %{discountPercentage} İndirim
                  </span>
                )}
              </div>

              {/* Popülerlik Bilgisi */}
              <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-xl px-5 py-3 rounded-[2rem] border border-foreground/5 flex items-center gap-3 shadow-2xl">
                <FireIcon className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-[9px] font-black text-foreground/40 uppercase leading-none">Sıralama</p>
                  <p className="text-sm font-black text-foreground">#{manga.popularityRank} Popüler</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- SAĞ: DETAYLAR --- */}
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            
            <div className="border-b border-foreground/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                  <EyeIcon className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black text-primary">{manga.views.toLocaleString()} Görüntülenme</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarSolid className="h-4 w-4 text-accent" />
                  <span className="text-sm font-black text-foreground">{manga.rating}.0</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black text-foreground tracking-tighter uppercase leading-[0.9] mb-4">
                {manga.title}
              </h1>
              
              <p className="text-xl text-foreground/40 font-bold italic">
                Yazar: <span className="text-primary">{manga.author}</span>
              </p>
            </div>

            <div className="py-10">
              <div className="flex items-end gap-6 mb-10">
                <div className="flex flex-col">
                  {manga.originalPrice && (
                    <span className="text-xl text-foreground/20 line-through font-bold mb-[-5px]">₺{manga.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-6xl font-black text-accent tracking-tighter">₺{manga.price.toFixed(2)}</span>
                </div>
                {manga.stock < 15 && (
                  <div className="mb-2 px-4 py-1.5 bg-accent/5 border border-accent/10 rounded-full">
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">Sınırlı Stok: {manga.stock} Adet</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between bg-foreground/5 rounded-[1.5rem] p-1.5 sm:w-44 border border-foreground/5">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-12 w-12 flex items-center justify-center rounded-xl hover:bg-background transition-all text-2xl font-black text-foreground/20 hover:text-primary">-</button>
                  <span className="text-xl font-black text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(manga.stock, q + 1))} className="h-12 w-12 flex items-center justify-center rounded-xl hover:bg-background transition-all text-2xl font-black text-foreground/20 hover:text-primary">+</button>
                </div>

                <button className="flex-1 bg-primary text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4">
                  <ShoppingCartIcon className="h-6 w-6" />
                  Sepete Ekle
                </button>

                <button className="h-16 w-16 flex items-center justify-center rounded-[1.5rem] border-2 border-foreground/5 text-foreground/20 hover:text-accent hover:border-accent/20 transition-all">
                  <HeartIcon className="h-7 w-7" />
                </button>
              </div>
            </div>

            {/* TAB SİSTEMİ */}
            <div className="bg-foreground/[0.02] rounded-[2.5rem] p-8 border border-foreground/5">
              <div className="flex gap-8 border-b border-foreground/5 mb-8">
                {[
                  { id: 'ozet', label: 'Hikaye', icon: BookOpenIcon },
                  { id: 'detay', label: 'Künye', icon: InformationCircleIcon },
                  { id: 'kargo', label: 'Kargo', icon: TruckIcon },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={classNames(
                      "pb-6 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all relative",
                      activeTab === tab.id ? "text-primary" : "text-foreground/20 hover:text-foreground/50"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>

              <div className="text-base leading-relaxed text-foreground/70 font-medium italic">
                {activeTab === 'ozet' && <p>{manga.description}</p>}
                {activeTab === 'detay' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div><p className="text-[10px] text-foreground/30 font-black uppercase">Yayınevi</p><p className="font-bold text-foreground">{manga.publisher}</p></div>
                    <div><p className="text-[10px] text-foreground/30 font-black uppercase">Sayfa</p><p className="font-bold text-foreground">{manga.pages}</p></div>
                    <div><p className="text-[10px] text-foreground/30 font-black uppercase">Kategori</p><p className="font-bold text-foreground">{manga.category}</p></div>
                    <div><p className="text-[10px] text-foreground/30 font-black uppercase">Dil</p><p className="font-bold text-foreground">Türkçe</p></div>
                  </div>
                )}
                {activeTab === 'kargo' && (
                  <div className="space-y-3">
                    <p className="flex items-center gap-2"><ShieldCheckIcon className="h-5 w-5 text-secondary" /> Özel korumalı kutu ile hasarsız teslimat.</p>
                    <p className="flex items-center gap-2"><ArrowPathIcon className="h-5 w-5 text-secondary" /> 14 gün içinde ücretsiz iade garantisi.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* --- HAFTANIN FAVORİLERİ (FEATURED MANGAS KULLANIMI) --- */}
        <div className="mt-32">
          <div className="flex items-end justify-between mb-12 border-b border-foreground/5 pb-6">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter italic">
              Haftanın <span className="text-primary">Favorileri</span>
            </h2>
            <Link href="/koleksiyon" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Tümünü Gör &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {suggestions.map((item) => (
              <Link key={item.id} href={`/manga/${item.id}`} className="group">
                <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden bg-foreground/5 shadow-lg group-hover:shadow-2xl transition-all mb-6">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-black text-foreground text-lg group-hover:text-primary transition-colors leading-tight uppercase">{item.title}</h3>
                <p className="text-accent font-black mt-2">₺{item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}