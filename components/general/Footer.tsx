import Link from 'next/link';
import { categories } from '@/lib/data'; // Kategorileri data.ts'den çekiyoruz

const footerNavigation = {
  yardim: [
    { name: 'Kargo ve Teslimat', href: '/yardim/kargo' },
    { name: 'İade Koşulları', href: '/yardim/iade' },
    { name: 'Sıkça Sorulan Sorular', href: '/yardim/sss' },
    { name: 'İletişim', href: '/iletisim' },
  ],
  kurumsal: [
    { name: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
    { name: 'Gizlilik Sözleşmesi', href: '/kurumsal/gizlilik' },
    { name: 'Kullanım Koşulları', href: '/kurumsal/kosullar' },
  ],
};

export default function Footer() {
  // Footer'ın çok uzamasını engellemek için sadece ilk 5 kategoriyi alıyoruz
  const visibleCategories = categories.slice(0, 5);
  const hasMoreCategories = categories.length > 5;

  return (
    <footer className="bg-background border-t border-foreground/5 transition-colors duration-500 relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* İnce Dekoratif Çizgi */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Sol Kısım: Logo ve Açıklama */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground uppercase group block w-fit">
              Manga<span className="text-primary transition-colors duration-300 group-hover:text-accent">Sokagi</span>
            </Link>
            <p className="text-sm leading-relaxed text-foreground/60 max-w-xs font-medium">
              En sevdiğin seriler, tekli ciltler ve özel koleksiyonlar. Ghibli sıcaklığında manga kültürünü tek bir çatı altında topluyoruz. Kahveni al ve okumaya başla.
            </p>
          </div>

          {/* Sağ Kısım: Link Menüleri */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              
              {/* Dinamik Kategoriler (Akıllı Sınırlandırma) */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">Keşfet</h3>
                <ul role="list" className="space-y-4">
                  {visibleCategories.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  
                  {/* Eğer 5'ten fazla kategori varsa bu link çıkar */}
                  {hasMoreCategories && (
                    <li className="pt-2">
                      <Link href="/koleksiyon" className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1 group">
                        Tüm Kategoriler 
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">Yardım</h3>
                <ul role="list" className="space-y-4">
                  {footerNavigation.yardim.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">Kurumsal</h3>
                <ul role="list" className="space-y-4">
                  {footerNavigation.kurumsal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alt Kısım: Telif Hakkı */}
        <div className="mt-16 border-t border-foreground/5 pt-8 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-foreground/40">
            &copy; {new Date().getFullYear()} MangaSokagi, Inc. Tüm hakları saklıdır.
          </p>
          <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
            Gölbaşı, Ankara&apos;dan sevgilerle
          </p>
        </div>
      </div>
    </footer>
  );
}