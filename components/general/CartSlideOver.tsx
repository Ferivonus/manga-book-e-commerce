"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Şimdilik görselleştirmek için örnek sepet verisi koyuyoruz.
// İleride bunu bir Context API, Redux veya Zustand ile dinamik hale getireceğiz.
const mockCartItems = [
  {
    id: 1,
    name: 'Vagabond Cilt 1',
    href: '/manga/1',
    category: 'Seinen',
    price: '₺149.90',
    quantity: 1,
    imageSrc: 'https://images.unsplash.com/photo-1601850494422-3fb19e13f045?q=80&w=300&auto=format&fit=crop',
    imageAlt: 'Vagabond Cilt 1 Kapak',
  },
  {
    id: 2,
    name: 'Yürüyen Şato (Roman)',
    href: '/manga/2',
    category: 'Fantezi',
    price: '₺125.00',
    quantity: 2,
    imageSrc: 'https://images.unsplash.com/photo-1544640808-32cb4f6864c7?q=80&w=300&auto=format&fit=crop',
    imageAlt: 'Yürüyen Şato Kapak',
  },
];

interface CartSlideOverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartSlideOver({ open, setOpen }: CartSlideOverProps) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      {/* Arka plan bulanıklığı ve kararması */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            
            {/* Sağdan kayarak gelen ana panel */}
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-background shadow-2xl border-l border-foreground/5">
                
                {/* Sepet Başlığı ve Kapatma Butonu */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-bold text-foreground uppercase tracking-wider">
                      Sepetin <span className="text-primary text-sm normal-case font-medium ml-2">(3 Ürün)</span>
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-foreground/50 hover:text-accent transition-colors focus:outline-none"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Sepeti Kapat</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Sepet Ürün Listesi */}
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-foreground/10">
                        {mockCartItems.map((product) => (
                          <li key={product.id} className="flex py-6 group">
                            <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border border-foreground/10 ring-1 ring-transparent group-hover:ring-primary/30 transition-all">
                              <img
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between">
                              <div>
                                <div className="flex justify-between text-base font-bold text-foreground">
                                  <h3>
                                    <Link href={product.href} onClick={() => setOpen(false)} className="hover:text-primary transition-colors">
                                      {product.name}
                                    </Link>
                                  </h3>
                                  <p className="ml-4 text-accent">{product.price}</p>
                                </div>
                                <p className="mt-1 text-xs text-secondary uppercase tracking-wider">{product.category}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-foreground/60 bg-foreground/5 px-2 py-0.5 rounded-md">Adet: {product.quantity}</p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-foreground/40 hover:text-accent transition-colors flex items-center gap-1"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                    <span>Kaldır</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Alt Kısım: Toplam Tutar ve Butonlar */}
                <div className="border-t border-foreground/10 px-4 py-6 sm:px-6 bg-foreground/5">
                  <div className="flex justify-between text-lg font-black text-foreground">
                    <p>Ara Toplam</p>
                    <p>₺399.90</p>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    Kargo ve vergiler ödeme adımında hesaplanacaktır.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/odeme"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
                    >
                      Ödemeye Geç
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-foreground/60">
                    <p>
                      veya{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        Alışverişe Devam Et
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
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