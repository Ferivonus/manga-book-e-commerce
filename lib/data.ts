// lib/data.ts

export interface Manga {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string; // "Yeni", "Popüler", "Tükenebilir" vb.
  description: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  pages: number;
  publisher: string;
  // Yeni eklenen istatistiksel veriler
  views: number; // Toplam tıklanma/görüntülenme
  popularityRank: number; // Genel popülerlik sırası (1 en popüler)
  isNewArrival: boolean; // /yeni sayfası için
  isBestSeller: boolean; // /populer sayfası için
}

export const allMangas: Manga[] = [
  {
    id: "1",
    title: "Vagabond Cilt 1",
    author: "Takehiko Inoue",
    price: 149.90,
    originalPrice: 180.00,
    image: "https://images.unsplash.com/photo-1601850494422-3fb19e13f045?q=80&w=600&auto=format&fit=crop",
    category: "Seinen",
    badge: "Popüler",
    description: "Miyamoto Musashi'nin efsanevi kılıç yolu serüveni. Çizimlerindeki muazzam detaylar ve felsefi derinliğiyle bir başyapıt.",
    rating: 5,
    reviewsCount: 128,
    stock: 15,
    pages: 256,
    publisher: "Marmara Çizgi",
    views: 12500,
    popularityRank: 2,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: "2",
    title: "Yürüyen Şato",
    author: "Diana Wynne Jones",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1544640808-32cb4f6864c7?q=80&w=600&auto=format&fit=crop",
    category: "Fantezi",
    badge: "Çok Satan",
    description: "Ghibli stüdyolarına ilham veren orijinal eser. Sophie ve büyücü Howl'un büyülü ve sıcacık hikayesi.",
    rating: 5,
    reviewsCount: 342,
    stock: 50,
    pages: 312,
    publisher: "İthaki Yayınları",
    views: 8900,
    popularityRank: 5,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: "3",
    title: "Oyasumi Punpun Cilt 1",
    author: "Inio Asano",
    price: 135.50,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    category: "Hayattan Kesitler",
    description: "Punpun'un melankolik ve sarsıcı büyüme hikayesi. Hayatın gerçekleriyle yüzleşen bir çocuğun portresi.",
    rating: 4,
    reviewsCount: 89,
    stock: 8,
    pages: 224,
    publisher: "Gerekli Şeyler",
    views: 4200,
    popularityRank: 8,
    isNewArrival: false,
    isBestSeller: false
  },
  {
    id: "4",
    title: "Berserk Cilt 1",
    author: "Kentaro Miura",
    price: 160.00,
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop",
    category: "Karanlık Fantezi",
    badge: "Tükenebilir",
    description: "Kara Kılıç Ustası Guts'ın karanlık bir dünyada verdiği amansız mücadele. Epik bir karanlık fantezi dramı.",
    rating: 5,
    reviewsCount: 512,
    stock: 3,
    pages: 240,
    publisher: "Marmara Çizgi",
    views: 25000,
    popularityRank: 1,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: "5",
    title: "Spy x Family Cilt 1",
    author: "Tatsuya Endo",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1580920461360-1000f149874a?q=80&w=600&auto=format&fit=crop",
    category: "Shounen",
    badge: "Yeni",
    description: "Bir casus, bir suikastçı ve bir telepatın sahte aile olma hikayesi. Hem komik hem aksiyon dolu.",
    rating: 5,
    reviewsCount: 210,
    stock: 25,
    pages: 200,
    publisher: "Gerekli Şeyler",
    views: 18400,
    popularityRank: 3,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: "6",
    title: "Nana Cilt 1",
    author: "Ai Yazawa",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1543004218-ee14110497f9?q=80&w=600&auto=format&fit=crop",
    category: "Shoujo",
    badge: "Yeni",
    description: "Aynı ismi taşıyan ama zıt karakterlere sahip iki genç kadının Tokyo'daki dostluğu ve aşk mücadeleleri.",
    rating: 5,
    reviewsCount: 165,
    stock: 12,
    pages: 192,
    publisher: "Gerekli Şeyler",
    views: 9200,
    popularityRank: 6,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: "7",
    title: "Slime: Reincarnated",
    author: "Fuse",
    price: 130.00,
    image: "https://images.unsplash.com/photo-1618519764620-7403abdb09c1?q=80&w=600&auto=format&fit=crop",
    category: "Isekai",
    badge: "Popüler",
    description: "Bir slime olarak başka bir dünyada reenkarne olan Rimuru'nun medeniyet kurma serüveni.",
    rating: 4,
    reviewsCount: 142,
    stock: 20,
    pages: 210,
    publisher: "Marmara Çizgi",
    views: 11000,
    popularityRank: 4,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: "8",
    title: "Vinland Saga Cilt 1",
    author: "Makoto Yukimura",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=600&auto=format&fit=crop",
    category: "Seinen",
    badge: "Koleksiyon",
    description: "Viking çağına dair epik bir intikam ve barış arayışı hikayesi. Thorfinn'in büyük dönüşümü.",
    rating: 5,
    reviewsCount: 195,
    stock: 10,
    pages: 220,
    publisher: "Marmara Çizgi",
    views: 7800,
    popularityRank: 7,
    isNewArrival: false,
    isBestSeller: false
  }
];

// Sayfalarda kullanılacak yardımcı exportlar
export const featuredMangas = allMangas.slice(0, 4);
export const newArrivals = allMangas.filter(m => m.isNewArrival);
export const bestSellers = allMangas.sort((a, b) => a.popularityRank - b.popularityRank).slice(0, 4);



// YENİ: Navbar ve diğer alanlarda kullanılacak dinamik kategori listesi
export const categories = [
  { name: 'Yeni', href: '/yeni' },
  { name: 'Popüler', href: '/populer' },
  { name: 'Shounen', href: '/kategori/shounen' },
  { name: 'Shoujo', href: '/kategori/shoujo' },
  { name: 'Seinen', href: '/kategori/seinen' },
  { name: 'Isekai', href: '/kategori/isekai' },
  { name: 'Hayattan Kesitler', href: '/kategori/hayattan-kesitler' }, // URL dostu slug
  { name: 'Karanlık Fantezi', href: '/kategori/karanlik-fantezi' }, // URL dostu slug
];