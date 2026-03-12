"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

// Gerçek API fonksiyonları
import { getMangas, getFeaturedMangas } from '@/lib/api';
import type { Manga } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SearchModal({ isOpen, closeModal }: SearchModalProps) {
  const [query, setQuery] = useState('');
  
  // API'den gelecek veriler için state'ler
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const [featured, setFeatured] = useState<Manga[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- KLAVYE KISAYOLU (⌘K / Ctrl+K) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K veya Ctrl+K basıldığında
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // ESLint Hatası Çözüldü: Ternary yerine standart if bloğu
        if (isOpen) {
          closeModal();
        }
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // --- ÖNERİLENLERİ (Çok Arananları) YÜKLE ---
  useEffect(() => {
    if (isOpen && featured.length === 0) {
      const fetchFeatured = async () => {
        try {
          const { bestSellers } = await getFeaturedMangas();
          setFeatured(bestSellers.slice(0, 4));
        } catch (error) {
          console.error("Önerilenler yüklenemedi", error);
        }
      };
      fetchFeatured();
    }
  }, [isOpen, featured.length]);

  // --- DİNAMİK ARAMA (Debounced API Call) ---
  useEffect(() => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        // Arama terimini backend'e gönderiyoruz
        const { mangas } = await getMangas(undefined, query, 1, 5);
        setSearchResults(mangas);
      } catch (error) {
        console.error("Arama hatası:", error);
      } finally {
        setIsSearching(false);
      }
    }, 400); // 400ms bekle (kullanıcı yazmayı bitirince istek at)

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Modal kapandığında inputu temizle
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setQuery(''), 300);
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md" />
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
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-[2.5rem] bg-background/90 backdrop-blur-3xl p-6 text-left align-middle shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-primary/10 transition-all">
                
                {/* Arama Çubuğu */}
                <div className="relative flex items-center border-b border-foreground/10 pb-4">
                  <MagnifyingGlassIcon className={`h-6 w-6 absolute left-2 pointer-events-none transition-colors ${isSearching ? 'text-accent animate-pulse' : 'text-primary'}`} />
                  <input
                    type="text"
                    className="w-full bg-transparent pl-12 pr-10 py-3 text-xl sm:text-2xl font-black text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-0"
                    placeholder="Eser, yazar veya kategori ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                  {/* UX: Kısayol İpucu veya Kapatma Butonu */}
                  {!query ? (
                    <kbd className="absolute right-2 hidden sm:inline-flex h-6 items-center gap-1 rounded-lg border border-foreground/10 bg-foreground/5 px-2 font-mono text-[10px] font-black text-foreground/40">
                      <span className="text-xs">ESC</span>
                    </kbd>
                  ) : (
                    <button 
                      onClick={() => setQuery('')}
                      className="absolute right-2 p-2 bg-foreground/5 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Sonuçlar Alanı */}
                <div className="mt-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                  
                  {/* Durum 1: Henüz arama yapılmadıysa Önerilenleri Göster */}
                  {query.length < 2 && (
                    <div className="animate-in fade-in duration-500">
                      <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <FireIcon className="h-4 w-4 text-accent" /> Sokağın Gündemi
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {featured.length > 0 ? featured.map((manga) => (
                          <Link 
                            key={manga.id} 
                            href={`/manga/${manga.slug}`}
                            onClick={closeModal}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10"
                          >
                            <div className="relative h-16 w-12 rounded-xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                              <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{manga.title}</h4>
                              <p className="text-[9px] font-black text-foreground/40 uppercase tracking-widest mt-1">{manga.category}</p>
                            </div>
                          </Link>
                        )) : (
                          <div className="col-span-full py-4 text-center text-[10px] font-black text-foreground/30 uppercase animate-pulse">Raflar Yükleniyor...</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Durum 2: Arama Yapılıyor (Yükleniyor) */}
                  {query.length >= 2 && isSearching && (
                    <div className="py-12 text-center animate-pulse">
                       <SparklesIcon className="h-10 w-10 text-primary/40 mx-auto mb-3" />
                       <p className="text-xs font-black text-foreground/50 uppercase tracking-widest">Kütüphane Taranıyor...</p>
                    </div>
                  )}

                  {/* Durum 3: Sonuç Bulundu */}
                  {query.length >= 2 && !isSearching && searchResults.length > 0 && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                        {searchResults.length} Sonuç Bulundu
                      </p>
                      {searchResults.map((manga) => (
                        <Link 
                          key={manga.id} 
                          href={`/manga/${manga.slug}`}
                          onClick={closeModal}
                          className="flex items-center gap-5 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all group"
                        >
                          <div className="relative h-24 w-16 rounded-[1rem] overflow-hidden shrink-0 shadow-md group-hover:shadow-xl transition-all">
                            <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] bg-secondary/10 px-2 py-0.5 rounded-lg">{manga.category}</span>
                                {manga.isOneShot && <span className="text-[8px] font-black text-white bg-accent px-1.5 py-0.5 rounded-md">ONE-SHOT</span>}
                              </div>
                              <span className="text-sm font-black text-accent italic">₺{manga.price.toFixed(2)}</span>
                            </div>
                            <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors leading-none mb-1.5">
                              {manga.title}
                            </h4>
                            <p className="text-xs text-foreground/50 font-bold italic line-clamp-1">{manga.author}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Durum 4: Sonuç Bulunamadı */}
                  {query.length >= 2 && !isSearching && searchResults.length === 0 && (
                    <div className="py-16 text-center animate-in fade-in zoom-in-95 duration-300">
                      <div className="h-16 w-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-5">
                        <MagnifyingGlassIcon className="h-8 w-8 text-foreground/30" />
                      </div>
                      <p className="text-2xl font-black text-foreground uppercase tracking-tight italic">Eser Bulunamadı</p>
                      <p className="text-sm text-foreground/50 mt-2 font-medium italic max-w-sm mx-auto">
                        &quot;<span className="text-foreground font-bold">{query}</span>&quot; ile eşleşen bir hikaye şu an raflarımızda yok.
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