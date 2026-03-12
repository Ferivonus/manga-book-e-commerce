import { DocumentTextIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Kullanım Koşulları | Manga Sokağı',
  description: 'Manga Sokağı web sitesi kullanım koşulları ve kuralları.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="relative bg-foreground/[0.02] py-24 sm:py-32 border-b border-foreground/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <DocumentTextIcon className="h-12 w-12 text-foreground/60 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
            Kullanım <span className="text-primary italic">Koşulları</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Sokağımızda gezinirken uyulması gereken temel kurallar ve haklarınız.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="prose prose-lg prose-p:text-foreground/60 prose-li:text-foreground/60 prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary mx-auto">
          <h2>1. Taraflar ve Kapsam</h2>
          <p>
            Bu kullanım koşulları, <strong>Manga Sokağı</strong> web sitesini ziyaret eden tüm kullanıcılar (&quot;Kullanıcı&quot; veya &quot;Alıcı&quot;) için geçerlidir. Siteye erişim sağlayarak veya alışveriş yaparak bu koşulları kabul etmiş sayılırsınız.
          </p>

          <h2>2. Fiyatlar ve Stok Durumu</h2>
          <p>
            Sitemizde yer alan fiyatlar Türk Lirası (TL) cinsindendir ve KDV dahildir. Manga Sokağı, önceden haber vermeksizin fiyatlarda ve ürün stok durumlarında değişiklik yapma hakkını saklı tutar. Nadir veya baskısı tükenen ürünlerde stok hataları yaşanması durumunda, alıcı derhal bilgilendirilir ve tam para iadesi yapılır.
          </p>

          <h2>3. Fikri Mülkiyet Hakları</h2>
          <p>
            Manga Sokağı web sitesinde yer alan tüm logo, metin, grafik ve arayüz tasarımlarının hakları Manga Sokağı&apos;na aittir. Eserlerin kapak görselleri ve telif hakları ilgili yayınevlerine ve eser sahiplerine aittir. İzinsiz kopyalanamaz ve ticari amaçla kullanılamaz.
          </p>

          <h2>4. Kullanıcı Yükümlülükleri</h2>
          <p>Kullanıcılar siteyi kullanırken;</p>
          <ul>
            <li>Site altyapısına zarar verecek siber faaliyetlerde bulunmamayı,</li>
            <li>Sipariş sürecinde doğru ve güncel iletişim bilgileri vermeyi,</li>
            <li>Yorum ve değerlendirme yaparken genel ahlak kurallarına uymayı kabul eder.</li>
          </ul>

          <h2>5. Sözleşme Değişiklikleri</h2>
          <p>
            Manga Sokağı, yasal mevzuatlar veya operasyonel gereksinimler doğrultusunda bu &quot;Kullanım Koşulları&quot; metnini dilediği zaman tek taraflı olarak güncelleme hakkına sahiptir. Değişiklikler sitede yayınlandığı andan itibaren yürürlüğe girer.
          </p>
        </div>
      </div>
    </div>
  );
}