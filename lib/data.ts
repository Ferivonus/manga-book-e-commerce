// lib/data.ts

export interface Manga {
  id: string;
  slug: string; // YENİ: URL yapıları için kritik alan
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
  views: number;
  popularityRank: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOneShot: boolean; 
}

export const allMangas: Manga[] = [
  {
    id: "1",
    slug: "vagabond",
    title: "Vagabond",
    author: "Takehiko Inoue",
    price: 149.90,
    originalPrice: 180.00,
    image: "https://images.unsplash.com/photo-1601850494422-3fb19e13f045",
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
    isBestSeller: true,
    isOneShot: false
  },
  {
    id: "2",
    slug: "berserk",
    title: "Berserk",
    author: "Kentaro Miura",
    price: 160.00,
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce",
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
    isBestSeller: true,
    isOneShot: false
  },
  {
    id: "3",
    slug: "chainsaw-man",
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    price: 115.00,
    originalPrice: 130.00,
    image: "https://images.unsplash.com/photo-1543004218-ee14110497f9",
    category: "Shounen",
    badge: "Popüler",
    description: "Denji'nin hayatta kalma mücadelesi ve Pochita ile birleşerek bir iblis avcısına dönüşme hikayesi.",
    rating: 5,
    reviewsCount: 420,
    stock: 30,
    pages: 192,
    publisher: "Gerekli Şeyler",
    views: 32000,
    popularityRank: 3,
    isNewArrival: true,
    isBestSeller: true,
    isOneShot: false
  },
  {
    id: "4",
    slug: "yuruyen-sato",
    title: "Yürüyen Şato",
    author: "Diana Wynne Jones",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1544640808-32cb4f6864c7",
    category: "Fantezi",
    badge: "Koleksiyon",
    description: "Sophie ve büyücü Howl'un büyülü ve sıcacık hikayesi. Ghibli stüdyolarına ilham veren başyapıt.",
    rating: 5,
    reviewsCount: 342,
    stock: 50,
    pages: 312,
    publisher: "İthaki Yayınları",
    views: 8900,
    popularityRank: 8,
    isNewArrival: false,
    isBestSeller: false,
    isOneShot: true
  },
  {
    id: "5",
    slug: "oyasumi-punpun",
    title: "Oyasumi Punpun",
    author: "Inio Asano",
    price: 135.50,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    category: "Hayattan Kesitler",
    description: "Punpun'un melankolik ve sarsıcı büyüme hikayesi. Hayatın gerçekleriyle yüzleşen bir çocuğun portresi.",
    rating: 4,
    reviewsCount: 89,
    stock: 8,
    pages: 224,
    publisher: "Gerekli Şeyler",
    views: 4200,
    popularityRank: 10,
    isNewArrival: false,
    isBestSeller: false,
    isOneShot: false
  },
  {
    id: "6",
    slug: "spy-x-family",
    title: "Spy x Family",
    author: "Tatsuya Endo",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1580920461360-1000f149874a",
    category: "Shounen",
    badge: "Yeni",
    description: "Bir casus, bir suikastçı ve bir telepatın sahte aile olma hikayesi. Hem komik hem aksiyon dolu.",
    rating: 5,
    reviewsCount: 210,
    stock: 25,
    pages: 200,
    publisher: "Gerekli Şeyler",
    views: 18400,
    popularityRank: 4,
    isNewArrival: true,
    isBestSeller: true,
    isOneShot: false
  },
  {
    id: "7",
    slug: "nana",
    title: "Nana",
    author: "Ai Yazawa",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1543004218-ee14110497f9",
    category: "Shoujo",
    badge: "Yeni",
    description: "Zıt karakterlere sahip iki genç kadının Tokyo'daki dostluğu ve aşk mücadeleleri.",
    rating: 5,
    reviewsCount: 165,
    stock: 12,
    pages: 192,
    publisher: "Gerekli Şeyler",
    views: 9200,
    popularityRank: 6,
    isNewArrival: true,
    isBestSeller: false,
    isOneShot: false
  },
  {
    id: "8",
    slug: "vinland-saga",
    title: "Vinland Saga",
    author: "Makoto Yukimura",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf",
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
    isBestSeller: false,
    isOneShot: false
  }
];

// Sayfalarda kullanılacak yardımcı exportlar
export const featuredMangas = allMangas.slice(0, 4);
export const newArrivalsList = allMangas.filter(m => m.isNewArrival);
export const bestSellersList = [...allMangas].sort((a, b) => a.popularityRank - b.popularityRank).slice(0, 4);

// Navbar ve diğer alanlarda kullanılacak dinamik kategori listesi
export const categories = [
  { name: 'Yeni', href: '/yeni' },
  { name: 'Popüler', href: '/populer' },
  { name: 'Shounen', href: '/kategori/shounen' },
  { name: 'Shoujo', href: '/kategori/shoujo' },
  { name: 'Seinen', href: '/kategori/seinen' },
  { name: 'Isekai', href: '/kategori/isekai' },
  { name: 'Hayattan Kesitler', href: '/kategori/hayattan-kesitler' },
  { name: 'Karanlık Fantezi', href: '/kategori/karanlik-fantezi' },
];