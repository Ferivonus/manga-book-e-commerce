import { SparklesIcon, HeartIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Hakkımızda | Manga Sokağı',
  description: 'Manga Sokağı hikayesi ve değerlerimiz.',
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      {/* Hero Alanı */}
      <div className="relative bg-primary/5 py-24 sm:py-32 border-b border-primary/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <SparklesIcon className="h-12 w-12 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl sm:text-7xl font-black text-foreground uppercase tracking-tighter mb-8">
            Bizim <span className="text-primary italic">Hikayemiz</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Sadece kitap satmıyoruz; her bir sayfasında kaybolacağın, yeni dünyalara açılan kapıların anahtarlarını sunuyoruz. Manga Sokağına hoş geldin.
          </p>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-24">
        <div className="prose prose-lg prose-p:text-foreground/60 prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary mx-auto">
          <h2 className="text-3xl mb-6">Nasıl Başladık?</h2>
          <p className="mb-10 text-lg leading-relaxed">
            Her şey, o çok sevdiğimiz Ghibli animasyonlarındaki sıcaklığı ve manga okurken hissettiğimiz o eşsiz heyecanı bir araya getirme fikriyle başladı. Manga Sokağı, Ankara Gölbaşı&apos;nda, kağıt kokusunu ve mürekkebin büyüsünü seven bir geliştirici tarafından, senin gibi tutkulu okurlar için tasarlandı.
          </p>

          <h2 className="text-3xl mb-6 mt-16">Neden Manga Sokağı?</h2>
          <p className="mb-12 text-lg leading-relaxed">
            Çünkü bir manganın kapağındaki o ufak bükülmenin bile okuma keyfini nasıl kaçırdığını biliyoruz. Bu yüzden koleksiyonumuzu özenle seçiyor, her bir siparişi sanki kendimize gönderiyormuşuz gibi paketliyoruz.
          </p>
        </div>

        {/* Değerlerimiz (Grid) */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-foreground/[0.02] p-8 rounded-[2.5rem] border border-foreground/5 text-center hover:bg-primary/5 transition-colors">
            <HeartIcon className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Kusursuz Kondisyon</h3>
            <p className="text-xs text-foreground/50 font-medium">Her eser depomuza girerken ve çıkarken incelenir.</p>
          </div>
          <div className="bg-foreground/[0.02] p-8 rounded-[2.5rem] border border-foreground/5 text-center hover:bg-secondary/5 transition-colors">
            <TruckIcon className="h-10 w-10 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Işık Hızında Kargo</h3>
            <p className="text-xs text-foreground/50 font-medium">Beklemeyi sevmediğini biliyoruz. Hemen yola çıkar.</p>
          </div>
          <div className="bg-foreground/[0.02] p-8 rounded-[2.5rem] border border-foreground/5 text-center hover:bg-primary/5 transition-colors">
            <ShieldCheckIcon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Güvenli Alışveriş</h3>
            <p className="text-xs text-foreground/50 font-medium">Tüm işlemlerin end-to-end şifreleme ile korunur.</p>
          </div>
        </div>
      </div>
    </div>
  );
}