import { EnvelopeIcon, MapPinIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'İletişim | Manga Sokağı',
  description: 'Bizimle iletişime geçin.',
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="bg-primary/5 py-24 border-b border-primary/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <ChatBubbleLeftEllipsisIcon className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
            Bize <span className="text-primary italic">Ulaşın</span>
          </h1>
          <p className="text-lg text-foreground/50 font-medium italic max-w-2xl mx-auto">
            İster bir sipariş sorusu, ister yeni bir seri önerisi olsun; Sokağın kapıları sana her zaman açık.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* İletişim Bilgileri (Sol) */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">İletişim Kanalları</h2>
            
            <div className="flex gap-5 bg-foreground/[0.02] p-6 rounded-[2rem] border border-foreground/5">
              <div className="flex-shrink-0 mt-1">
                <EnvelopeIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">E-Posta</h3>
                <a href="mailto:ferivonus@gmail.com" className="text-base font-bold text-foreground hover:text-primary transition-colors italic">
                  ferivonus@gmail.com
                </a>
                <p className="text-xs text-foreground/40 mt-2">7/24 bize yazabilirsin. En kısa sürede döneceğiz.</p>
              </div>
            </div>

            <div className="flex gap-5 bg-foreground/[0.02] p-6 rounded-[2rem] border border-foreground/5">
              <div className="flex-shrink-0 mt-1">
                <MapPinIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">Merkez</h3>
                <p className="text-base font-bold text-foreground italic">Eymir Mahallesi</p>
                <p className="text-base font-bold text-foreground italic">Gölbaşı, Ankara</p>
                <p className="text-xs text-foreground/40 mt-2">Sadece operasyon merkezi (Fiziksel mağazamız şu an için yoktur).</p>
              </div>
            </div>
          </div>

          {/* İletişim Formu (Sağ) */}
          <div className="lg:col-span-8 bg-background rounded-[3rem] p-8 sm:p-12 shadow-2xl ring-1 ring-foreground/5">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Mesaj Gönder</h2>
            <form action="#" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-foreground/60 mb-2">Adınız Soyadınız</label>
                  <input type="text" name="name" id="name" className="block w-full rounded-2xl border-0 bg-foreground/[0.03] py-4 px-5 text-foreground ring-1 ring-inset ring-foreground/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm font-medium" placeholder="Chihiro Ogino" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-foreground/60 mb-2">E-Posta Adresiniz</label>
                  <input type="email" name="email" id="email" className="block w-full rounded-2xl border-0 bg-foreground/[0.03] py-4 px-5 text-foreground ring-1 ring-inset ring-foreground/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm font-medium" placeholder="chihiro@ghibli.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-[10px] font-black uppercase tracking-widest text-foreground/60 mb-2">Konu</label>
                <input type="text" name="subject" id="subject" className="block w-full rounded-2xl border-0 bg-foreground/[0.03] py-4 px-5 text-foreground ring-1 ring-inset ring-foreground/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm font-medium" placeholder="Sipariş Takibi, Öneri, İade..." />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-widest text-foreground/60 mb-2">Mesajınız</label>
                <textarea id="message" name="message" rows={5} className="block w-full rounded-2xl border-0 bg-foreground/[0.03] py-4 px-5 text-foreground ring-1 ring-inset ring-foreground/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm font-medium resize-none" placeholder="Ruhların Kaçışı mangası stoğa ne zaman girecek?"></textarea>
              </div>

              <button type="button" className="w-full bg-primary text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all">
                MESAJI GÖNDER
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}