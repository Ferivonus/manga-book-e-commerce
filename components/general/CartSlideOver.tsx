"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

// YENİ: Cilt (Volume) bazlı sepet yapısı
interface CartItem {
  id: string;        // MangaVolume ID
  title: string;     // Örn: "Berserk Cilt 1"
  mangaTitle: string;// Örn: "Berserk" (Ana seri adı)
  price: number;
  quantity: number;
  image: string;
  slug: string;      // Cilt slug'ı
}

// Şimdilik test için yeni mimariye uygun veri
const mockCartItems: CartItem[] = [
  {
    id: "1",
    title: 'Vagabond Cilt 1',
    mangaTitle: 'Vagabond',
    price: 149.90,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1601850494422-3fb19e13f045',
    slug: 'vagabond-1',
  },
  {
    id: "2",
    title: 'Slime: Reincarnated (Full)',
    mangaTitle: 'Slime',
    price: 130.00,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1618519764620-7403abdb09c1',
    slug: 'slime-reincarnated',
  },
];

interface CartSlideOverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartSlideOver({ open, setOpen }: CartSlideOverProps) {
  // --- ARA TOPLAM HESAPLAMA ---
  const subtotal = mockCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = mockCartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[100]">
      {/* Overlay - Ghibli Puslu Arka Plan */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-background/40 backdrop-blur-md transition-opacity duration-500 data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-background shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-foreground/5">
                
                {/* --- HEADER --- */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <div className="flex items-start justify-between border-b border-foreground/5 pb-6">
                    <DialogTitle className="text-2xl font-black text-foreground uppercase tracking-tighter flex items-center gap-3">
                      <ShoppingBagIcon className="h-6 w-6 text-primary" />
                      SEPETİM <span className="text-primary/40 text-sm font-bold tracking-normal">({totalItems} Ürün)</span>
                    </DialogTitle>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 text-foreground/20 hover:text-accent hover:rotate-90 transition-all duration-300"
                    >
                      <XMarkIcon className="h-7 w-7" />
                    </button>
                  </div>

                  {/* --- ÜRÜN LİSTESİ --- */}
                  <div className="mt-8">
                    {mockCartItems.length > 0 ? (
                      <ul role="list" className="divide-y divide-foreground/5">
                        {mockCartItems.map((item) => (
                          <li key={item.id} className="flex py-6 group">
                            {/* Kitap Görseli */}
                            <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/10 group-hover:scale-105 transition-transform duration-500">
                              <Image
                                alt={item.title}
                                src={item.image}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="text-sm font-black text-foreground uppercase leading-tight max-w-[180px]">
                                    <Link href={`/manga/${item.slug}`} onClick={() => setOpen(false)} className="hover:text-primary transition-colors">
                                      {item.title}
                                    </Link>
                                  </h3>
                                  <p className="text-base font-black text-accent italic">₺{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-[10px] font-bold text-primary uppercase tracking-widest opacity-40">{item.mangaTitle}</p>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center bg-foreground/5 rounded-full px-3 py-1 border border-foreground/5">
                                  <span className="text-foreground/40 font-bold mr-2">ADET:</span>
                                  <span className="text-foreground font-black">{item.quantity}</span>
                                </div>

                                <button
                                  type="button"
                                  className="text-foreground/20 hover:text-accent transition-colors flex items-center gap-1 group/trash"
                                >
                                  <TrashIcon className="h-4 w-4 group-hover:animate-bounce" />
                                  <span className="font-black uppercase tracking-tighter text-[10px]">Kaldır</span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="py-20 text-center">
                        <ShoppingBagIcon className="h-12 w-12 text-foreground/10 mx-auto mb-4" />
                        <p className="text-foreground/40 font-bold italic">Sepetin şu an boş...</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- FOOTER: TOPLAM VE ÖDEME --- */}
                <div className="border-t border-foreground/5 px-6 py-8 bg-foreground/[0.02]">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-bold text-foreground/40 uppercase tracking-[0.2em]">Ara Toplam</p>
                    <p className="text-3xl font-black text-foreground tracking-tighter">₺{subtotal.toFixed(2)}</p>
                  </div>
                  <p className="text-[10px] text-foreground/30 font-medium italic mb-8">
                    * Kargo ve vergiler bir sonraki adımda hesaplanır.
                  </p>
                  
                  <div className="space-y-4">
                    <Link
                      href="/odeme"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center w-full bg-primary text-white py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all"
                    >
                      ÖDEME ADIMINA GEÇ
                    </Link>
                    
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full text-center text-[11px] font-black text-foreground/30 uppercase tracking-widest hover:text-primary transition-colors"
                    >
                      ALIŞVERİŞE DEVAM ET &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}