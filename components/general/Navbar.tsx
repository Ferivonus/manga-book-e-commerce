"use client";

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// DÜZELTME 1: TransitionChild import edildi
import { Menu, MenuButton, MenuItems, MenuItem, Transition, TransitionChild, Dialog, DialogPanel } from '@headlessui/react';
import { 
  ShoppingBagIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  SunIcon, 
  MoonIcon,
  ChevronDownIcon,
  Bars3Icon, 
  XMarkIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes'; 
import SearchModal from './SearchModal'; 
import { getCategories } from '@/lib/api';

type CategoryItem = {
  name: string;
  href: string;
};

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme(); 
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isCategoryActive = pathname.startsWith('/kategori');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Kategoriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCategories();

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <header className="bg-background/95 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50 transition-all duration-500">
        <nav className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto" aria-label="Top">
          <div className="flex w-full items-center justify-between h-20">
            
            {/* --- Logo Alanı --- */}
            <div className="flex items-center min-w-max pr-4 lg:pr-8">
              <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground uppercase flex-shrink-0 group">
                Manga<span className="text-primary transition-colors duration-300 group-hover:text-accent italic">Sokagi</span>
              </Link>
            </div>

            {/* --- MASAÜSTÜ NAVİGASYON --- */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-12">
              <NavLink href="/yeni" label="Yeni Gelenler" active={isActive('/yeni')} />
              <NavLink href="/populer" label="Popüler" active={isActive('/populer')} />
              <NavLink href="/koleksiyon" label="Kütüphane" active={isActive('/koleksiyon')} />

              {/* Kategoriler Dropdown */}
              <div className="relative group py-8">
                <button className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isCategoryActive ? 'text-primary' : 'text-foreground/50 group-hover:text-primary'}`}>
                  Kategoriler
                  <ChevronDownIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180 stroke-[3px]" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-background/95 backdrop-blur-2xl border border-primary/10 rounded-[2rem] shadow-2xl p-3 overflow-hidden ring-1 ring-white/10">
                    <div className="grid grid-cols-1 gap-1">
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <Link 
                            key={cat.name} 
                            href={cat.href} 
                            className={`px-5 py-3 text-[10px] font-black rounded-2xl transition-all uppercase tracking-widest flex items-center justify-between group/item ${isActive(cat.href) ? 'bg-primary text-white' : 'text-foreground/60 hover:bg-primary/5 hover:text-primary'}`}
                          >
                            {cat.name}
                            <ChevronRightIcon className="h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-all" />
                          </Link>
                        ))
                      ) : (
                        <div className="py-4 text-center animate-pulse text-[10px] font-black text-foreground/20 uppercase">Raflar Diziliyor...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/favorites" className={`text-[11px] font-black uppercase tracking-[0.2em] relative transition-colors ${isActive('/favorites') ? 'text-accent' : 'text-accent/60 hover:text-accent'}`}>
                Favorilerim
                <span className="absolute -top-3 -right-4 bg-accent text-white text-[8px] font-black px-1.5 py-0.5 rounded-full rotate-12 shadow-lg animate-bounce">
                  HOT
                </span>
              </Link>
            </div>

            {/* --- SAĞ AKSİYONLAR --- */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 min-w-max pl-4 lg:pl-8">
              
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="group hidden xl:flex items-center gap-3 bg-foreground/[0.03] border border-foreground/5 px-4 py-2 rounded-full text-foreground/40 hover:text-primary hover:border-primary/20 transition-all"
              >
                <MagnifyingGlassIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-[10px] font-black uppercase tracking-widest">Arama Yap</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-foreground/10 bg-background px-1.5 font-mono text-[10px] font-medium opacity-50">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="xl:hidden text-foreground/50 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {isMounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-full bg-foreground/[0.03] text-foreground/40 hover:text-accent transition-all hover:rotate-12 border border-transparent hover:border-accent/10"
                >
                  <SunIcon className={`h-5 w-5 transition-all ${theme === 'dark' ? 'hidden' : 'block text-accent'}`} />
                  <MoonIcon className={`h-5 w-5 transition-all ${theme === 'dark' ? 'block text-primary' : 'hidden'}`} />
                </button>
              )}

              {/* Kullanıcı Menüsü */}
              <div className="relative hidden sm:block">
                {isMounted ? (
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="p-2.5 rounded-full bg-foreground/[0.03] text-foreground/40 hover:text-primary transition-all border border-transparent hover:border-primary/10">
                      <UserIcon className="h-5 w-5" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                      <MenuItems className="absolute right-0 top-12 mt-2 w-56 origin-top-right rounded-[2rem] bg-background/95 backdrop-blur-2xl shadow-2xl ring-1 ring-primary/10 focus:outline-none overflow-hidden p-2">
                        <div className="flex flex-col gap-1">
                          {/* DÜZELTME 2: Headless UI v2'ye uygun data-[focus] yapısı eklendi */}
                          <MenuItem>
                            <Link 
                              href="/profil" 
                              className={`block px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl data-[focus]:bg-primary/10 data-[focus]:text-primary transition-colors ${isActive('/profil') ? 'bg-primary/10 text-primary' : 'text-foreground/60'}`}
                            >
                              Profil Bilgilerim
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link 
                              href="/siparisler" 
                              className={`block px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl data-[focus]:bg-primary/10 data-[focus]:text-primary transition-colors ${isActive('/siparisler') ? 'bg-primary/10 text-primary' : 'text-foreground/60'}`}
                            >
                              Siparişlerim
                            </Link>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-foreground/[0.03] animate-pulse" />
                )}
              </div>

              {/* Sepet */}
              <Link href="/cart" className="group p-2.5 rounded-full bg-foreground/[0.03] relative hover:bg-primary transition-all duration-500 border border-transparent hover:border-primary/20">
                <ShoppingBagIcon className={`h-5 w-5 transition-colors ${isActive('/cart') ? 'text-primary' : 'text-foreground/40 group-hover:text-white'}`} />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-black text-white shadow-xl ring-2 ring-background">
                  0
                </span>
              </Link>

              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 rounded-full bg-foreground/[0.03] text-foreground/40">
                <Bars3Icon className="h-6 w-6" />
              </button>

            </div>
          </div>
        </nav>
      </header>

      {/* --- MOBİL ÇEKMECE --- */}
      <Transition show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsMobileMenuOpen}>
          {/* DÜZELTME 1: Transition.Child yerine TransitionChild kullanıldı */}
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            {/* DÜZELTME 1: Transition.Child yerine TransitionChild kullanıldı */}
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-2xl border-r border-primary/10">
                
                <div className="flex px-6 pb-4 pt-6 justify-between items-center border-b border-primary/10">
                  <span className="text-xl font-black uppercase tracking-tighter text-foreground">MENÜ</span>
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-xl p-2 text-foreground/50 hover:text-primary bg-foreground/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Menüyü Kapat</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-b border-primary/10 px-6 py-8">
                  <div className="grid grid-cols-1 gap-y-6">
                    <Link href="/yeni" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/yeni') ? 'text-primary' : 'text-foreground/80'}`}>Yeni Gelenler</Link>
                    <Link href="/populer" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/populer') ? 'text-primary' : 'text-foreground/80'}`}>Popüler Seriler</Link>
                    <Link href="/koleksiyon" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/koleksiyon') ? 'text-primary' : 'text-foreground/80'}`}>Kütüphane</Link>
                    <Link href="/favorites" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest flex items-center justify-between ${isActive('/favorites') ? 'text-accent' : 'text-accent/80'}`}>
                      Favorilerim
                      <span className="bg-accent text-white text-[9px] font-black px-2 py-1 rounded-lg">HOT</span>
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 px-6 py-8">
                  <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em]">Kategoriler</h3>
                  <div className="grid grid-cols-1 gap-y-5">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`text-sm font-bold uppercase tracking-widest flex items-center justify-between ${isActive(category.href) ? 'text-primary' : 'text-foreground/70'}`}
                        >
                          {category.name}
                          {isActive(category.href) && <ChevronRightIcon className="h-4 w-4 text-primary" />}
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-foreground/50 italic animate-pulse">Raflar Diziliyor...</span>
                    )}
                  </div>
                </div>

                <div className="space-y-6 border-t border-primary/10 px-6 py-8 mt-auto">
                  <Link href="/profil" onClick={() => setIsMobileMenuOpen(false)} className={`block text-sm font-bold uppercase tracking-widest ${isActive('/profil') ? 'text-primary' : 'text-foreground/80'}`}>Profil Detayları</Link>
                  <Link href="/siparisler" onClick={() => setIsMobileMenuOpen(false)} className={`block text-sm font-bold uppercase tracking-widest ${isActive('/siparisler') ? 'text-primary' : 'text-foreground/80'}`}>Sipariş Geçmişi</Link>
                  
                  {isMounted && (
                    <div className="pt-6 flex items-center justify-between border-t border-foreground/5">
                      <span className="text-[10px] font-black text-foreground/50 uppercase tracking-[0.3em]">Tema Seçimi</span>
                      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="bg-foreground/5 p-3 rounded-2xl text-foreground hover:text-primary transition-colors">
                        {theme === 'dark' ? <SunIcon className="h-6 w-6 text-accent" /> : <MoonIcon className="h-6 w-6 text-primary" />}
                      </button>
                    </div>
                  )}
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <SearchModal isOpen={isSearchOpen} closeModal={() => setIsSearchOpen(false)} />
    </>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${active ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}
    >
      {label}
      {active && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-lg animate-in fade-in zoom-in duration-500" />}
    </Link>
  );
}