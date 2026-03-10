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
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { allMangas } from '@/lib/data';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Zustand entegrasyonu öncesi son kez mock veri
  const [cartItems, setCartItems] = useState([
    { ...allMangas[0], quantity: 1 },
    { ...allMangas[3], quantity: 1 },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  // Hesaplama Mantığı
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingThreshold = 500;
  const shippingCost = 29.90;
  const isFreeShipping = subtotal >= shippingThreshold;
  const total = subtotal + (isFreeShipping ? 0 : shippingCost);
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // --- BOŞ SEPET EKRANI ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 transition-all animate-fade-in">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150"></div>
          <ShoppingBagIcon className="h-24 w-24 text-primary relative z-10 opacity-40" />
        </div>
        <h2 className="text-4xl font-black text-foreground uppercase tracking-tighter text-center">Sepetin Sessizliğe Bürünmüş</h2>
        <p className="mt-4 text-foreground/50 text-center max-w-md text-lg font-medium italic">
          &quot;Ruhun için yeni bir hikaye seçmenin tam zamanı olabilir.&quot;
        </p>
        <Link 
          href="/koleksiyon" 
          className="mt-10 bg-primary text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95"
        >
          Koleksiyonu Keşfet
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24 pt-10 sm:pt-20 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Sayfa Başlığı */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
              Sepetim
            </h1>
            <p className="text-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px] mt-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-foreground/20"></span>
              Şu an {cartItems.length} eser yolculuğa hazır
            </p>
          </div>
          <Link href="/koleksiyon" className="group text-xs font-black text-primary uppercase tracking-widest flex items-center gap-3 hover:underline">
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
            Alışverişe Devam Et
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
          
          {/* --- ÜRÜN LİSTESİ --- */}
          <section className="lg:col-span-8">
            <div className="space-y-10">
              {cartItems.map((item) => (
                <div key={item.id} className="relative flex flex-col sm:flex-row gap-6 sm:gap-10 pb-10 border-b border-foreground/5 group">
                  {/* Ürün Görseli */}
                  <div className="relative h-56 w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-[2.5rem] bg-foreground/5 shadow-xl ring-1 ring-foreground/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Ürün Bilgileri */}
                  <div className="flex flex-1 flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{item.category}</span>
                        <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter mt-1 hover:text-primary transition-colors leading-none">
                          <Link href={`/manga/${item.id}`}>{item.title}</Link>
                        </h3>
                        <p className="text-sm text-foreground/40 font-bold italic mt-2">{item.author}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-foreground/20 hover:text-accent transition-all hover:bg-accent/5 rounded-full"
                        title="Ürünü Kaldır"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 mt-8 sm:mt-0">
                      {/* Miktar Seçici */}
                      <div className="flex items-center bg-foreground/5 rounded-2xl p-1 border border-foreground/5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="h-10 w-10 flex items-center justify-center text-foreground/40 hover:text-primary transition-colors disabled:opacity-10"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-black text-foreground">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="h-10 w-10 flex items-center justify-center text-foreground/40 hover:text-primary transition-colors disabled:opacity-10"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Fiyat Bilgisi */}
                      <div className="text-right">
                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1 text-right">Ara Toplam</p>
                        <p className="text-2xl font-black text-foreground tracking-tighter">₺{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- SİPARİŞ ÖZETİ (SIDEBAR) --- */}
          <aside className="mt-16 lg:mt-0 lg:col-span-4 sticky top-24">
            <div className="rounded-[3rem] bg-foreground/[0.02] p-8 sm:p-10 border border-foreground/5 shadow-2xl shadow-foreground/5 relative overflow-hidden">
              {/* Arka plan süsü */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-xl font-black text-foreground uppercase tracking-widest mb-10 pb-4 border-b border-foreground/5 italic">
                Sipariş Özeti
              </h2>

              {/* Kargo İlerleme Çubuğu (UX Dokunuşu) */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-foreground/40 uppercase flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-primary" />
                    Kargo Durumu
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase">
                    {isFreeShipping ? 'Bedava!' : `₺${(shippingThreshold - subtotal).toFixed(2)} kaldı`}
                  </span>
                </div>
                <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden p-[1px]">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                    style={{ width: `${shippingProgress}%` }}
                  ></div>
                </div>
                {!isFreeShipping && (
                  <p className="text-[10px] text-foreground/30 font-bold italic mt-3 text-center">
                    500 ₺ ve üzeri alışverişlerde kargo bizden!
                  </p>
                )}
              </div>

              {/* Fiyat Listesi */}
              <div className="space-y-5">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50 font-bold uppercase tracking-widest text-[10px]">Ürün Toplamı</span>
                  <span className="text-foreground font-black tracking-tighter text-lg">₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-foreground/50 font-bold uppercase tracking-widest text-[10px]">Kargo Ücreti</span>
                  {isFreeShipping ? (
                    <span className="text-primary font-black uppercase text-[10px] tracking-widest bg-primary/10 px-2 py-1 rounded-lg">Ücretsiz</span>
                  ) : (
                    <span className="text-foreground font-black tracking-tighter text-lg">₺{shippingCost.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="pt-8 mt-8 border-t-2 border-dashed border-foreground/10">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-foreground uppercase tracking-[0.2em]">Genel Toplam</span>
                    <span className="text-4xl font-black text-accent tracking-tighter leading-none">₺{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Ödeme Butonu */}
              <button className="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/30 mt-12 hover:-translate-y-1 transition-all active:scale-95 group overflow-hidden relative">
                <span className="relative z-10">Ödemeye Geç</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              {/* Güven Rozeti */}
              <div className="mt-8 flex items-center justify-center gap-2 text-foreground/20 text-[9px] font-black uppercase tracking-widest">
                <ShieldCheckIcon className="h-4 w-4" />
                <span>256-bit Güvenli Ödeme Altyapısı</span>
              </div>
            </div>

            {/* Alternatif Bilgi Kutusu */}
            <div className="mt-6 p-6 rounded-[2rem] bg-secondary/5 border border-secondary/10">
              <p className="text-[10px] text-secondary font-black uppercase tracking-widest leading-relaxed">
                Tüm siparişlerin Ghibli özeniyle paketlenip <br /> raflardan sana ulaştırılır.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}