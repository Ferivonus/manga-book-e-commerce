import Link from 'next/link';
import { getCategories } from '@/lib/api';
import { SparklesIcon, FireIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const footerNavigation = {
  sokak: [
    { name: 'Yeni Gelenler', href: '/yeni' },
    { name: 'Popüler Seriler', href: '/populer' },
    { name: 'Tüm Kütüphane', href: '/koleksiyon' },
    { name: 'Favorilerim', href: '/favorites' },
  ],
  yardim: [
    { name: 'Kargo ve Teslimat', href: '/yardim/kargo' },
    { name: 'İade Koşulları', href: '/yardim/iade' },
    { name: 'Sıkça Sorulan Sorular', href: '/yardim/sss' },
    { name: 'İletişim', href: '/iletisim' },
  ],
  kurumsal: [
    { name: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
    { name: 'Gizlilik Politikası', href: '/kurumsal/gizlilik' },
    { name: 'Kullanım Koşulları', href: '/kurumsal/kosullar' },
  ],
};

export default async function Footer() {
  // Kategorileri API'den çekiyoruz
  let categories: { name: string; href: string }[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Footer kategorileri yüklenemedi:", error);
  }

  // Sadece ilk 5 kategoriyi gösterip geri kalanı için "Tümünü Gör" butonu koyacağız
  const visibleCategories = categories.slice(0, 5);
  const hasMoreCategories = categories.length > 5;

  return (
    <footer className="bg-background relative overflow-hidden border-t border-foreground/5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Dekoratif Ghibli Işıltıları */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50"></div>

      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:pt-28 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-12 xl:gap-12">
          
          {/* --- Sol Kısım: Marka ve Açıklama --- */}
          <div className="space-y-8 xl:col-span-4">
            <Link href="/" className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground uppercase group block w-fit">
              Manga<span className="text-primary transition-colors duration-300 group-hover:text-accent italic">Sokagi</span>
            </Link>
            <p className="text-sm leading-relaxed text-foreground/50 max-w-sm font-medium italic">
              En sevdiğin seriler, tekli ciltler ve özel koleksiyonlar. Ghibli sıcaklığında manga kültürünü tek bir çatı altında topluyoruz. Çayını al ve sayfaları çevirmeye başla.
            </p>
            
            {/* Sosyal Medya İkonları */}
            <div className="flex items-center gap-5">
              <a href="https://github.com/ferivonus" target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-primary transition-colors p-2 bg-foreground/[0.03] rounded-xl hover:bg-primary/10">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-foreground/30 hover:text-accent transition-colors p-2 bg-foreground/[0.03] rounded-xl hover:bg-accent/10">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* --- Sağ Kısım: Menü Ağacı --- */}
          <div className="mt-16 grid grid-cols-2 gap-10 xl:col-span-8 xl:mt-0 lg:grid-cols-4">
            
            {/* Kolon 1: Sokak (Hızlı Linkler) */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-6 flex items-center gap-2">
                <FireIcon className="h-4 w-4 text-accent" /> Keşfet
              </h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.sokak.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm font-bold text-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolon 2: Kategoriler (API'den Dinamik) */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-6">Reyonlar</h3>
              <ul role="list" className="space-y-4">
                {categories.length > 0 ? visibleCategories.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm font-bold text-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">
                      {item.name}
                    </Link>
                  </li>
                )) : (
                  <li className="text-sm font-bold text-foreground/30 italic animate-pulse">Raflar Yükleniyor...</li>
                )}
                
                {hasMoreCategories && (
                  <li className="pt-3">
                    <Link href="/kategori/tumu" className="text-xs font-black text-primary hover:text-accent transition-colors inline-flex items-center gap-2 group">
                      TÜMÜNÜ GÖR 
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Kolon 3: Yardım */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-6">Destek</h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.yardim.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm font-bold text-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolon 4: Kurumsal */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-6">Kurumsal</h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.kurumsal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm font-bold text-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        
        {/* --- Alt Kısım: Telif Hakkı ve Geliştirici İmzanız --- */}
        <div className="mt-20 border-t border-foreground/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-4 w-4 text-primary" />
            <p className="text-xs font-bold text-foreground/40 tracking-wide">
              &copy; {new Date().getFullYear()} MangaSokagi. Tüm hakları saklıdır.
            </p>
          </div>
          
          {/* Geliştirici İmzanız */}
          <div className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] bg-foreground/[0.02] px-4 py-2 rounded-xl border border-foreground/5 hover:border-primary/20 hover:bg-primary/5 transition-colors group">
            <CodeBracketIcon className="h-4 w-4 text-accent group-hover:text-primary transition-colors" />
            <span>
              Tasarım & Kodlama: <a href="https://fahrettinbasturk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors underline decoration-transparent hover:decoration-accent underline-offset-4">Fahrettin Baştürk</a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}