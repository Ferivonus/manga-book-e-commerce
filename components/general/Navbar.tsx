"use client";

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { 
  ShoppingBagIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  SunIcon, 
  MoonIcon 
} from '@heroicons/react/24/outline';
import { categories } from '@/lib/data';
import { useTheme } from 'next-themes'; 
import SearchModal from './SearchModal'; 

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme(); 
  const [isSearchOpen, setIsSearchOpen] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="bg-background/95 backdrop-blur-md border-b border-foreground/5 sticky top-0 z-50 transition-colors duration-500">
        <nav className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto" aria-label="Top">
          <div className="flex w-full items-center justify-between h-20">
            
            {/* Logo Alanı */}
            <div className="flex items-center min-w-max pr-8">
              <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground uppercase flex-shrink-0 group">
                Manga<span className="text-primary transition-colors duration-300 group-hover:text-accent">Sokagi</span>
              </Link>
            </div>

            {/* Masaüstü Navigasyon (KESİNLİKLE ALT SATIRA DÜŞMEYECEK) */}
            <div className="hidden lg:flex flex-1 justify-center overflow-hidden">
              <div className="flex items-center gap-6 xl:gap-8 flex-nowrap overflow-x-auto scrollbar-hide pb-2 -mb-2 w-full justify-center">
                {categories.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[11px] xl:text-xs font-black text-foreground/60 hover:text-primary transition-colors uppercase tracking-[0.2em] whitespace-nowrap shrink-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sağ İkonlar */}
            <div className="flex items-center space-x-2 sm:space-x-5 flex-shrink-0 min-w-max pl-8">
              
              {/* Tema Butonu */}
              {isMounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-foreground/50 hover:text-accent transition-all duration-300 p-2 rounded-full hover:bg-foreground/5 group relative overflow-hidden"
                >
                  <div className="relative h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                    <SunIcon className={`absolute h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100 text-amber-500'}`} />
                    <MoonIcon className={`absolute h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100 text-blue-400' : '-rotate-90 opacity-0 scale-50'}`} />
                  </div>
                </button>
              )}

              {/* Arama Butonu */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-foreground/50 hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/5"
              >
                <span className="sr-only">Arama Yap</span>
                <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </button>

              {/* Kullanıcı Menüsü */}
              <div className="relative inline-block text-left w-10 h-10 flex items-center justify-center">
                {isMounted ? (
                  <Menu>
                    <MenuButton className="flex items-center text-foreground/50 hover:text-primary focus:outline-none transition-colors p-2 rounded-full hover:bg-foreground/5">
                      <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                      <MenuItems className="absolute right-0 top-12 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-background/90 backdrop-blur-xl shadow-2xl ring-1 ring-foreground/10 focus:outline-none overflow-hidden">
                        <div className="py-2">
                          <MenuItem>{({ active }) => (<Link href="/profil" className={`${active ? 'bg-primary/5 text-primary' : 'text-foreground/80'} block px-4 py-2.5 text-sm font-bold`}>Profil Detayları</Link>)}</MenuItem>
                          <MenuItem>{({ active }) => (<Link href="/siparisler" className={`${active ? 'bg-primary/5 text-primary' : 'text-foreground/80'} block px-4 py-2.5 text-sm font-bold`}>Sipariş Geçmişi</Link>)}</MenuItem>
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/50" />
                )}
              </div>

              {/* Sepet İkonu */}
              <div className="flow-root pl-1">
                <Link href="/sepet" className="group flex items-center p-2 relative rounded-full hover:bg-foreground/5 transition-all">
                  <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-foreground/50 group-hover:text-primary transition-colors" />
                  <span className="absolute top-1 right-1 sm:top-0 sm:right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-white shadow-lg">
                    3
                  </span>
                </Link>
              </div>

            </div>
          </div>
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} closeModal={() => setIsSearchOpen(false)} />
    </>
  );
}