"use client";

import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { ShoppingBagIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

// Manga dallarını zenginleştirdik
const navigation = [
  { name: 'Yeni', href: '/yeni' },
  { name: 'Popüler', href: '/populer' },
  { name: 'Shounen', href: '/kategori/shounen' },
  { name: 'Shoujo', href: '/kategori/shoujo' },
  { name: 'Seinen', href: '/kategori/seinen' },
  { name: 'Isekai', href: '/kategori/isekai' },
  { name: 'Hayattan Kesitler', href: '/kategori/slice-of-life' },
  { name: 'Karanlık Fantezi', href: '/kategori/dark-fantasy' },
];

export default function Navbar() {
  return (
    <header className="bg-background border-b border-foreground/10 sticky top-0 z-50 transition-colors duration-500">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between h-16">
          
          {/* Logo Alanı */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter text-foreground uppercase flex-shrink-0">
              Manga<span className="text-accent">Sokagi</span>
            </Link>
          </div>

          {/* Masaüstü Navigasyon (Ekstra dallar sığsın diye space-x-6'ya düşürdük) */}
          <div className="hidden ml-10 space-x-6 lg:block overflow-x-auto">
            {navigation.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Sağ İkonlar (Arama, Kullanıcı, Sepet) */}
          <div className="ml-10 flex items-center space-x-4 flex-shrink-0">
            <button className="text-foreground/60 hover:text-primary transition-colors">
              <span className="sr-only">Arama Yap</span>
              <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Headless UI v2 Kullanıcı Menüsü */}
            <div className="relative inline-block text-left">
              <Menu>
                <MenuButton className="flex items-center text-foreground/60 hover:text-primary focus:outline-none transition-colors">
                  <span className="sr-only">Kullanıcı Menüsü</span>
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </MenuButton>
              
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-foreground/5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <Link 
                            href="/profil" 
                            className={`${
                              active ? 'bg-primary/10 text-primary' : 'text-foreground/80'
                            } block px-4 py-2 text-sm transition-colors`}
                          >
                            Profilim
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <Link 
                            href="/siparisler" 
                            className={`${
                              active ? 'bg-primary/10 text-primary' : 'text-foreground/80'
                            } block px-4 py-2 text-sm transition-colors`}
                          >
                            Siparişlerim
                          </Link>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>

            {/* Sepet İkonu */}
            <div className="flow-root">
              <Link href="/sepet" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-foreground/60 group-hover:text-primary transition-colors" aria-hidden="true" />
                <span className="ml-2 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">0</span>
                <span className="sr-only">sepetindeki ürünler</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}