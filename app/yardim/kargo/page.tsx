import { TruckIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Kargo ve Teslimat | Manga Sokağı',
  description: 'Siparişlerinizin kargo ve teslimat süreçleri hakkında bilgiler.',
};

export default function ShippingPage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="relative bg-secondary/5 py-24 sm:py-32 border-b border-secondary/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <TruckIcon className="h-12 w-12 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
            Kargo ve <span className="text-secondary italic">Teslimat</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Hikayelerinizin size en hızlı ve güvenli şekilde ulaşması için nasıl çalıştığımızı öğrenin.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="prose prose-lg prose-p:text-foreground/60 prose-li:text-foreground/60 prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary mx-auto">
          <h2>Kargo Ücretleri</h2>
          <p>
            Manga Sokağı&apos;nda okuma tutkunuzu desteklemek için <strong>500 TL ve üzeri tüm siparişlerinizde kargo ücretsizdir!</strong> 500 TL altındaki siparişlerinizde ise Türkiye&apos;nin her yerine sabit <strong>29.90 TL</strong> kargo ücreti yansıtılır.
          </p>

          <h2>Teslimat Süresi</h2>
          <p>
            Zamanın sizin için ne kadar değerli olduğunu, yeni bir cilde başlamanın heyecanını biliyoruz.
          </p>
          <ul>
            <li><strong>Hafta İçi (Pazartesi - Cuma):</strong> Saat 15:00&apos;e kadar verilen siparişleriniz aynı gün kargoya teslim edilir.</li>
            <li><strong>Hafta Sonu ve Tatiller:</strong> Cumartesi, Pazar ve resmi tatil günlerinde verilen siparişleriniz, takip eden ilk iş gününde kargoya verilir.</li>
          </ul>
          <p>
            Kargoya teslim edilen siparişler, bulunduğunuz ile ve ilçeye bağlı olarak ortalama <strong>1-3 iş günü</strong> içerisinde adresinize ulaşır.
          </p>

          <h2>Paketleme Standartlarımız (Kusursuz Kondisyon)</h2>
          <p>
            Bir manganın en önemli unsuru kondisyonudur. Bu yüzden hiçbir kitabımızı sadece bir poşete koyup göndermiyoruz. Tüm siparişleriniz:
          </p>
          <ul>
            <li>Önce neme ve toza karşı şeffaf koruyucu kılıfa alınır.</li>
            <li>Ardından darbe emici kalın baloncuklu naylonlara sarılır.</li>
            <li>Son olarak, köşelerin ezilmesini engelleyen sert karton kutulara yerleştirilerek gönderilir.</li>
          </ul>

          <h2>Sipariş Takibi</h2>
          <p>
            Siparişiniz kargoya teslim edildiğinde, e-posta adresinize ve telefonunuza bir takip numarası iletilir. Ayrıca &quot;Siparişlerim&quot; sayfası üzerinden de kargonuzun anlık durumunu görüntüleyebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}