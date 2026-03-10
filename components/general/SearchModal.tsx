"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon, FireIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { allMangas, featuredMangas } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SearchModal({ isOpen, closeModal }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Arama mantığı: Başlık, yazar veya kategoriye göre filtrele
  const filteredMangas = query === '' 
    ? [] 
    : allMangas.filter((manga) => {
        const searchLower = query.toLowerCase();
        return (
          manga.title.toLowerCase().includes(searchLower) ||
          manga.author.toLowerCase().includes(searchLower) ||
          manga.category.toLowerCase().includes(searchLower)
        );
      }).slice(0, 5); // En fazla 5 sonuç göster

  // Modal kapandığında inputu temizle
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setQuery(''), 300); // Kapanma animasyonu bitince temizle
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        
        {/* Arka Plan Karartması (Blur) */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal İçeriği */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-20 sm:p-6 sm:pt-32 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 -translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 -translate-y-4"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-[2rem] bg-background/90 backdrop-blur-2xl p-6 text-left align-middle shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-foreground/10 transition-all">
                
                {/* Arama Çubuğu */}
                <div className="relative flex items-center border-b border-foreground/10 pb-4">
                  <MagnifyingGlassIcon className="h-6 w-6 text-primary absolute left-2 pointer-events-none" />
                  <input
                    type="text"
                    className="w-full bg-transparent pl-12 pr-10 py-3 text-xl sm:text-2xl font-black text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-0"
                    placeholder="Eser, yazar veya kategori ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                  {query && (
                    <button 
                      onClick={() => setQuery('')}
                      className="absolute right-2 p-2 bg-foreground/5 rounded-full hover:bg-foreground/10 transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4 text-foreground/50" />
                    </button>
                  )}
                </div>

                {/* Sonuçlar Alanı */}
                <div className="mt-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                  
                  {/* Durum 1: Henüz arama yapılmadıysa Önerilenleri Göster */}
                  {query === '' && (
                    <div>
                      <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FireIcon className="h-4 w-4 text-accent" /> Çok Arananlar
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {featuredMangas.slice(0, 4).map((manga) => (
                          <Link 
                            key={manga.id} 
                            href={`/manga/${manga.id}`}
                            onClick={closeModal}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-foreground/5 transition-colors group"
                          >
                            <div className="relative h-16 w-12 rounded-xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                              <Image src={manga.image} alt={manga.title} fill className="object-cover" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{manga.title}</h4>
                              <p className="text-[10px] text-foreground/50 uppercase tracking-widest">{manga.category}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Durum 2: Sonuç Bulundu */}
                  {query !== '' && filteredMangas.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                        {filteredMangas.length} Sonuç Bulundu
                      </p>
                      {filteredMangas.map((manga) => (
                        <Link 
                          key={manga.id} 
                          href={`/manga/${manga.id}`}
                          onClick={closeModal}
                          className="flex items-center gap-5 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all group"
                        >
                          <div className="relative h-20 w-14 rounded-xl overflow-hidden shrink-0 shadow-md">
                            <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em]">{manga.category}</span>
                              <span className="text-sm font-black text-accent">₺{manga.price.toFixed(2)}</span>
                            </div>
                            <h4 className="text-lg font-black text-foreground group-hover:text-primary transition-colors leading-none mb-1">
                              {manga.title}
                            </h4>
                            <p className="text-xs text-foreground/50 font-bold italic">{manga.author}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Durum 3: Sonuç Bulunamadı */}
                  {query !== '' && filteredMangas.length === 0 && (
                    <div className="py-12 text-center">
                      <MagnifyingGlassIcon className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
                      <p className="text-lg font-black text-foreground uppercase tracking-tight">Kütüphanede Bulunamadı</p>
                      <p className="text-sm text-foreground/50 mt-2 font-medium italic">
                        &quot;{query}&quot; ile eşleşen bir eser şu an raflarımızda yok. Başka bir kelime deneyebilirsin.
                      </p>
                    </div>
                  )}

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}