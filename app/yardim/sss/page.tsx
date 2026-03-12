"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const faqs = [
  {
    question: "Siparişim ne zaman kargoya verilir?",
    answer: "Hafta içi saat 15:00'e kadar verdiğiniz siparişler aynı gün kargoya teslim edilir. Cumartesi, Pazar ve resmi tatillerde verilen siparişler takip eden ilk iş günü yola çıkar."
  },
  {
    question: "Kargo ücretiniz ne kadar?",
    answer: "Sokağımızda 500 TL ve üzeri tüm alışverişlerde kargo ücretsizdir! 500 TL altındaki siparişleriniz için standart kargo ücretimiz 29.90 TL'dir."
  },
  {
    question: "Satın aldığım ürünleri nasıl iade edebilirim?",
    answer: "Ambalajı bozulmamış, okunmamış ve hasar görmemiş ürünleri teslim tarihinden itibaren 14 gün içerisinde koşulsuz şartsız iade edebilirsiniz. İade süreci için 'İletişim' sayfasından bize ulaşmanız yeterlidir."
  },
  {
    question: "Mangalar hasar görmeden nasıl paketleniyor?",
    answer: "Sizler gibi biz de koleksiyoneriz. Her bir mangayı önce koruyucu baloncuklu naylona sarıyor, ardından ezilmeyi önleyen özel kesim sert karton kutulara yerleştiriyoruz. Köşesinin dahi bükülmeyeceğine emin olabilirsiniz."
  },
  {
    question: "Aradığım seri stokta yok, ne zaman gelir?",
    answer: "Stoklarımız haftalık olarak yenilenmektedir. İlgilendiğiniz ürünün sayfasındaki 'Gelince Haber Ver' butonuna tıklayarak veya bize doğrudan ulaşarak stok güncellemesinden anında haberdar olabilirsiniz."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="bg-primary/5 py-24 border-b border-primary/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <QuestionMarkCircleIcon className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
            Sıkça Sorulan <span className="text-primary italic">Sorular</span>
          </h1>
          <p className="text-lg text-foreground/50 font-medium italic">Aklına takılan tüm soruların cevapları burada.</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-20">
        <dl className="space-y-6">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="bg-foreground/[0.02] border border-foreground/5 rounded-[2rem] overflow-hidden transition-all hover:border-primary/20">
              {({ open }) => (
                <>
                  <DisclosureButton className="flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none">
                    <span className={`text-base font-black uppercase tracking-tight transition-colors ${open ? 'text-primary' : 'text-foreground'}`}>
                      {faq.question}
                    </span>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon
                        className={`h-6 w-6 transition-transform duration-300 ${open ? '-rotate-180 text-primary' : 'text-foreground/30'}`}
                        aria-hidden="true"
                      />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="px-8 pb-6 text-foreground/60 font-medium leading-relaxed italic animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
        
        <div className="mt-20 text-center bg-secondary/5 p-10 rounded-[3rem] border border-secondary/10">
           <h3 className="text-xl font-black uppercase tracking-tight mb-3">Aradığın Cevabı Bulamadın mı?</h3>
           <p className="text-foreground/50 text-sm mb-6 font-medium italic">Sokağın rehberleri sana yardım etmek için burada.</p>
           <Link href="/iletisim" className="bg-secondary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary/90 transition-colors inline-block">
             BİZE MESAJ GÖNDER
           </Link>
        </div>
      </div>
    </div>
  );
}