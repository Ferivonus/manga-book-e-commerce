import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Gizlilik Politikası | Manga Sokağı',
  description: 'Kişisel verilerinizin nasıl korunduğuna dair politikamız.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="relative bg-primary/5 py-24 sm:py-32 border-b border-primary/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <ShieldCheckIcon className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
            Gizlilik <span className="text-primary italic">Politikası</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Verileriniz sokağımızın mahzenlerinde, en üst düzey güvenlik standartlarıyla korunmaktadır.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="prose prose-lg prose-p:text-foreground/60 prose-li:text-foreground/60 prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary mx-auto">
          <h2>1. Giriş</h2>
          <p>
            Manga Sokağı olarak, kişisel verilerinizin güvenliğine saygı duyuyoruz. Bu Gizlilik Politikası, web sitemizi kullanırken topladığımız bilgileri nasıl işlediğimizi, koruduğumuzu ve paylaştığımızı açıklamaktadır.
          </p>

          <h2>2. Topladığımız Bilgiler</h2>
          <p>Size daha iyi bir alışveriş deneyimi sunmak için aşağıdaki verileri toplayabiliriz:</p>
          <ul>
            <li><strong>Kişisel Tanımlayıcılar:</strong> Ad, soyad, e-posta adresi, telefon numarası.</li>
            <li><strong>Teslimat Bilgileri:</strong> Kargo adresi, fatura adresi.</li>
            <li><strong>Cihaz ve Kullanım Verileri:</strong> IP adresi, tarayıcı türü, ziyaret edilen sayfalar (Çerezler aracılığıyla).</li>
          </ul>

          <h2>3. Verilerin Kullanımı</h2>
          <p>Topladığımız verileri şu amaçlarla kullanırız:</p>
          <ul>
            <li>Siparişlerinizi işlemek ve teslimatını sağlamak.</li>
            <li>Müşteri hizmetleri taleplerinize yanıt vermek.</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek (örn. Fatura kesimi).</li>
            <li>Açık rızanız olması halinde size özel kampanyalar sunmak.</li>
          </ul>

          <h2>4. Çerezler (Cookies)</h2>
          <p>
            Manga Sokağı, oturumunuzu açık tutmak, sepetinizi hatırlamak ve site trafiğini analiz etmek için çerezleri kullanır. Çerez tercihlerinizi tarayıcı ayarlarınızdan değiştirebilirsiniz.
          </p>

          <h2>5. Bilgi Paylaşımı</h2>
          <p>
            Kişisel verilerinizi asla üçüncü şahıslara satmayız. Bilgileriniz sadece siparişin tamamlanması için gerekli olan iş ortaklarımızla (Kargo firmaları, ödeme altyapı sağlayıcıları) paylaşılır.
          </p>

          <h2>6. İletişim</h2>
          <p>
            Kişisel verilerinizle ilgili her türlü soru ve silme/düzeltme talebiniz için <code>ferivonus@gmail.com</code> adresi üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}