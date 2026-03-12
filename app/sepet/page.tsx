"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  TrashIcon, 
  MinusIcon, 
  PlusIcon, 
  ArrowLeftIcon,
  ShieldCheckIcon,
  TruckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  BookOpenIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/20/solid';

// API ve Veri Tipleri
import { getMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

// Sepet elemanı için Manga tipini genişletiyoruz (quantity zorunlu hale geliyor)
interface CartItem extends Manga {
  quantity: number;
}

export default function CartPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);
    
    const loadMockCart = async () => {
      try {
        // YENİ MİMARİ: getMangas artık { mangas, totalCount } döndürüyor
        const response = await getMangas(undefined, undefined, 1, 10);
        const { mangas } = response;
        
        if (mangas.length >= 2) {
          // Örnek olarak ilk iki seriyi sepete ekliyoruz (Mock Veri)
          setCartItems([
            { ...mangas[0], quantity: 1 },
            { ...mangas[1], quantity: 2 },
          ]);
        }
      } catch (error) {
        console.error("Sepet verileri senkronize edilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockCart();
  }, []);

  // Hydration hatasını önlemek için montaj kontrolü
  if (!isMounted) return null;

  // --- HESAPLAMA MANTIĞI ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingThreshold = 500;
  const shippingCost = 29.90;
  const isFreeShipping = subtotal >= shippingThreshold;
  const total = subtotal + (isFreeShipping ? 0 : shippingCost);
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        // Stok sınırını ve minimum 1 adedi kontrol ediyoruz
        const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // ============================================================================
  // ⏳ YÜKLENİYOR (LOADING) EKRANI
  // ============================================================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <ShoppingBagIcon className="h-8 w-8 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-primary font-black tracking-[0.3em] uppercase text-xs">Sepetiniz Hazırlanıyor</p>
          <p className="text-foreground/30 text-[10px] mt-2 italic tracking-widest">Toz cinleri rafları kontrol ediyor...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 🛒 BOŞ SEPET EKRANI
  // ============================================================================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
          <div className="h-32 w-32 bg-foreground/[0.03] rounded-[3rem] flex items-center justify-center border border-foreground/5 relative z-10">
            <ShoppingBagIcon className="h-16 w-16 text-primary/20" />
          </div>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tighter text-center leading-none">
          Sepetin Sessizliğe <br /> Bürünmüş
        </h2>
        <p className="mt-8 text-foreground/40 text-center max-w-md text-lg font-medium italic leading-relaxed px-6">
          &quot;Ruhun için yeni bir hikaye seçmenin tam zamanı olabilir. Sokağın taze sayfaları seni bekliyor.&quot;
        </p>
        <Link 
          href="/koleksiyon" 
          className="mt-12 bg-primary text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4"
        >
          SOKAĞI KEŞFE ÇIK <ArrowLeftIcon className="h-4 w-4 rotate-180" />
        </Link>
      </div>
    );
  }

  // ============================================================================
  // 🛍️ DOLU SEPET EKRANI
  // ============================================================================
  return (
    <div className="bg-background min-h-screen pb-32 pt-10 sm:pt-24 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ÜST BAŞLIK ALANI */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-foreground/5 pb-12">
          <div className="relative">
            <h1 className="text-6xl sm:text-7xl font-black text-foreground uppercase tracking-tighter leading-none">
              Sepetim
            </h1>
            <div className="flex items-center gap-4 mt-6">
              <span className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 tracking-widest">
                {cartItems.length} SERİ
              </span>
              <p className="text-foreground/30 font-bold uppercase tracking-[0.2em] text-[10px]">Yolculuğa Hazır Bekliyor</p>
            </div>
          </div>
          <Link href="/koleksiyon" className="group bg-foreground/[0.03] border border-foreground/5 px-8 py-5 rounded-2xl text-[10px] font-black text-foreground/60 uppercase tracking-widest flex items-center gap-3 hover:bg-primary hover:text-white transition-all">
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
            Alışverişe Devam Et
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-20">
          
          {/* --- ÜRÜN LİSTESİ (SOL) --- */}
          <section className="lg:col-span-8">
            <div className="space-y-12">
              {cartItems.map((item) => (
                <div key={item.id} className="relative flex flex-col sm:flex-row gap-8 sm:gap-12 pb-12 border-b border-foreground/5 group last:border-0">
                  
                  {/* Ürün Görseli (Ghibli Çerçevesiyle) - Link Artık Slug Kullanıyor */}
                  <div className="relative h-64 w-full sm:w-44 flex-shrink-0 overflow-hidden rounded-[3rem] bg-foreground/5 shadow-2xl ring-1 ring-foreground/10 group-hover:ring-primary/40 transition-all duration-500">
                    <Link href={`/manga/${item.slug}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 176px"
                        className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                      />
                    </Link>
                    {item.isOneShot && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-accent/90 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter shadow-xl">ONE-SHOT</span>
                      </div>
                    )}
                  </div>

                  {/* Ürün Bilgileri */}
                  <div className="flex flex-1 flex-col justify-between py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{item.category}</span>
                          <span className="w-1 h-1 rounded-full bg-foreground/10"></span>
                          <div className="flex items-center gap-1">
                            <StarSolid className="h-3 w-3 text-accent" />
                            <span className="text-[10px] font-bold text-foreground/30">{item.rating}.0</span>
                          </div>
                        </div>
                        <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter group-hover:text-primary transition-colors leading-none pt-2">
                          <Link href={`/manga/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <div className="flex items-center gap-2 text-foreground/40 mt-4">
                          <BookOpenIcon className="h-4 w-4" />
                          <p className="text-sm font-bold italic tracking-tight">{item.author}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-3 text-foreground/10 hover:text-accent transition-all hover:bg-accent/5 rounded-full group/trash"
                        >
                          <TrashIcon className="h-6 w-6 group-hover/trash:animate-bounce" />
                        </button>
                        <button className="p-3 text-foreground/10 hover:text-primary transition-all hover:bg-primary/5 rounded-full">
                          <HeartIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    {/* Fiyat ve Miktar Kontrolü */}
                    <div className="flex flex-wrap items-end justify-between gap-8 mt-10">
                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest ml-1">MİKTAR</p>
                        <div className="flex items-center bg-foreground/[0.03] rounded-2xl p-1.5 border border-foreground/5 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="h-11 w-11 flex items-center justify-center text-foreground/30 hover:text-primary hover:bg-white rounded-xl transition-all disabled:opacity-0"
                          >
                            <MinusIcon className="h-4 w-4 stroke-[3px]" />
                          </button>
                          <span className="w-12 text-center font-black text-foreground text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.stock}
                            className="h-11 w-11 flex items-center justify-center text-foreground/30 hover:text-primary hover:bg-white rounded-xl transition-all disabled:opacity-0"
                          >
                            <PlusIcon className="h-4 w-4 stroke-[3px]" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-1">TOPLAM TUTAR</p>
                        <div className="flex items-baseline gap-2 justify-end">
                           {item.originalPrice && (
                             <span className="text-sm text-foreground/20 line-through font-bold">₺{(item.originalPrice * item.quantity).toFixed(2)}</span>
                           )}
                           <p className="text-4xl font-black text-accent tracking-tighter italic">₺{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-[10px] text-foreground/30 font-medium italic">₺{item.price.toFixed(2)} / birim</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- SİPARİŞ ÖZETİ (SAĞ SIDEBAR) --- */}
          <aside className="mt-20 lg:mt-0 lg:col-span-4 sticky top-28">
            <div className="rounded-[4rem] bg-foreground/[0.02] p-10 sm:p-14 border border-foreground/5 shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-2xl font-black text-foreground uppercase tracking-widest mb-12 pb-6 border-b border-foreground/5 flex items-center gap-3 italic leading-none">
                Sipariş Özeti
              </h2>

              {/* Kargo İlerleme Çubuğu */}
              <div className="mb-12 bg-white/40 p-7 rounded-[3rem] border border-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-foreground/40 uppercase flex items-center gap-2 tracking-widest">
                    <TruckIcon className="h-5 w-5 text-secondary" />
                    LOJİSTİK DURUM
                  </span>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${isFreeShipping ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                    {isFreeShipping ? 'BEDAVA!' : `₺${(shippingThreshold - subtotal).toFixed(2)} KALDI`}
                  </span>
                </div>
                <div className="h-3 w-full bg-foreground/5 rounded-full overflow-hidden p-[2px] shadow-inner">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(var(--secondary),0.4)]"
                    style={{ width: `${shippingProgress}%` }}
                  ></div>
                </div>
                {!isFreeShipping && (
                  <p className="text-[10px] text-foreground/30 font-bold italic mt-5 text-center leading-relaxed">
                    Sokağımızda 500 ₺ üzeri <br /> tüm hikayelerin kargosu bizden!
                  </p>
                )}
              </div>

              {/* Fiyat Listesi */}
              <div className="space-y-7">
                <div className="flex justify-between text-sm items-end px-2">
                  <span className="text-foreground/40 font-bold uppercase tracking-widest text-[10px]">Ara Toplam</span>
                  <span className="text-foreground font-black tracking-tighter text-2xl leading-none">₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm items-center px-2">
                  <span className="text-foreground/40 font-bold uppercase tracking-widest text-[10px]">Tahmini Kargo</span>
                  {isFreeShipping ? (
                    <span className="text-secondary font-black uppercase text-[10px] tracking-widest bg-secondary/10 px-4 py-2 rounded-xl border border-secondary/10">Ücretsiz</span>
                  ) : (
                    <span className="text-foreground font-black tracking-tighter text-2xl leading-none">₺{shippingCost.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="pt-10 mt-10 border-t-2 border-dashed border-foreground/10 px-2">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-1">GENEL TOPLAM</span>
                      <span className="text-foreground/20 text-[9px] font-medium italic">Vergiler Dahil</span>
                    </div>
                    <span className="text-5xl font-black text-accent tracking-tighter leading-none italic">₺{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Ödeme Butonu (Shimmer Efekti Dahil) */}
              <button className="w-full bg-primary text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-primary/30 mt-14 hover:-translate-y-1 transition-all active:scale-95 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-btn"></div>
                <span className="relative z-10 flex items-center justify-center gap-4">
                  GÜVENLE ÖDEMEYE GEÇ <ArrowLeftIcon className="h-5 w-5 rotate-180" />
                </span>
              </button>

              <div className="mt-12 flex items-center justify-center gap-3 text-foreground/20 text-[10px] font-black uppercase tracking-[0.25em]">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>SSL SECURE CHECKOUT</span>
              </div>
            </div>

            {/* Alt Bilgi Rozeti */}
            <div className="mt-10 p-10 rounded-[3.5rem] bg-secondary/5 border border-secondary/10 flex items-center gap-6">
              <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm ring-1 ring-secondary/10 flex-shrink-0">
                <SparklesIcon className="h-7 w-7" />
              </div>
              <p className="text-[11px] text-secondary/70 font-black uppercase tracking-widest leading-relaxed">
                Her bir seri Ghibli özeniyle <br /> paketlenip kapına ulaşır.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Global CSS Animasyonları */}
      <style>{`
        @keyframes shimmer-btn {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-btn {
          animation: shimmer-btn 2.5s infinite;
        }
      `}</style>
    </div>
  );
}