import Link from 'next/link';

const footerNavigation = {
  kategoriler: [
    { name: 'Shounen', href: '/kategori/shounen' },
    { name: 'Shoujo', href: '/kategori/shoujo' },
    { name: 'Seinen', href: '/kategori/seinen' },
    { name: 'Koleksiyon Sürümleri', href: '/koleksiyon' },
    { name: 'Cilt Setleri', href: '/setler' },
  ],
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
  return (
    <footer className="bg-background border-t border-foreground/10 transition-colors duration-500" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Sol Kısım: Logo ve Açıklama */}
          <div className="space-y-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-foreground uppercase">
              Manga<span className="text-accent">Sokagi</span>
            </Link>
            <p className="text-sm leading-6 text-foreground/70">
              En sevdiğin seriler, tekli ciltler ve özel koleksiyonlar. Ghibli sıcaklığında manga kültürünü tek bir çatı altında topluyoruz.
            </p>
          </div>

          {/* Sağ Kısım: Link Menüleri */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Kategoriler</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.kategoriler.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-foreground/70 hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Yardım</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.yardim.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-foreground/70 hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Kurumsal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.kurumsal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-foreground/70 hover:text-primary transition-colors">
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
        <div className="mt-16 border-t border-foreground/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-foreground/50">
            &copy; {new Date().getFullYear()} MangaSokagi, Inc. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}