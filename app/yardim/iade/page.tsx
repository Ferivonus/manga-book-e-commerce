import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'İade Koşulları | Manga Sokağı',
  description: 'Manga Sokağı ürün iade ve değişim şartları.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="relative bg-accent/5 py-24 sm:py-32 border-b border-accent/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-40"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <ArrowPathRoundedSquareIcon className="h-12 w-12 text-accent mx-auto mb-6" />
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
            İade <span className="text-accent italic">Koşulları</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Memnuniyetiniz bizim için her şeyden önemlidir. Sorunsuz bir iade süreci için bilmeniz gerekenler.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-24">
        <div className="prose prose-lg prose-p:text-foreground/60 prose-li:text-foreground/60 prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary mx-auto">
          <h2>İade Süresi</h2>
          <p>
            Manga Sokağı&apos;ndan satın aldığınız ürünleri, teslimat tarihinden itibaren <strong>14 gün içerisinde</strong> hiçbir sebep belirtmeksizin iade edebilirsiniz.
          </p>

          <h2>İade Şartları</h2>
          <p>
            Ürünlerin iade edilebilmesi için belirli şartları sağlaması gerekmektedir. Koleksiyon değerini korumak adına hassas olduğumuzu bilmenizi isteriz:
          </p>
          <ul>
            <li>Mangalar ve kitaplar <strong>okunmamış, kapağı kırılmamış ve sayfaları yıpranmamış</strong> olmalıdır.</li>
            <li>Shrink&apos;li (jelatinli) satılan özel baskı veya kutulu setlerin jelatini açılmamış olmalıdır.</li>
            <li>Eğer ürün size hasarlı ulaştıysa, kargo görevlisine &quot;Hasar Tespit Tutanağı&quot; tutturmanız büyük önem taşımaktadır.</li>
          </ul>

          <h2>İade Süreci Nasıl İşler?</h2>
          <ol>
            <li><strong>İletişime Geçin:</strong> &quot;İletişim&quot; sayfamızdan veya <code>ferivonus@gmail.com</code> adresi üzerinden sipariş numaranızla birlikte iade talebinizi bize iletin.</li>
            <li><strong>Kodu Alın:</strong> Müşteri hizmetlerimiz size ücretsiz bir iade kargo kodu sağlayacaktır.</li>
            <li><strong>Kargolayın:</strong> Ürünü faturasıyla birlikte, hasar görmeyecek şekilde (tercihen size gönderdiğimiz kutuyla) paketleyip anlaşmalı kargo firmasına teslim edin.</li>
            <li><strong>İade Onayı:</strong> Ürün depomuza ulaşıp kondisyon kontrolünden geçtikten sonra, 3 iş günü içerisinde ücret iadeniz bankanıza iletilir.</li>
          </ol>

          <h2>Değişim İşlemleri</h2>
          <p>
            Şu an için doğrudan değişim işlemimiz bulunmamaktadır. Değiştirmek istediğiniz ürünü iade edip, yeni ürün için yeniden sipariş oluşturabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}