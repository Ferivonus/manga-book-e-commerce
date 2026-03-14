import { allMangas, categories as mockCategories, Manga } from './data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ============================================================================
// 🧱 TİP TANIMLAMALARI (Backend ile Uyumlu)
// ============================================================================

interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface VolumeResponse {
  id: number;
  volumeNumber: number | null;
  title: string;
  slug: string;
  price: string | number;
  originalPrice: string | number | null;
  imageUrl: string;
  badge: string | null;
  stock: number;
  pages: number;
  publisher: string | null;
  isNewArrival: boolean;
  isBestSeller: boolean;
  manga?: MangaSeriesResponse; 
}

interface MangaSeriesResponse {
  id: number;
  title: string;
  slug: string;
  author: string;
  description: string | null;
  isOneShot: boolean;
  rating: string | number | null;
  views: number;
  popularityRank: number;
  category?: CategoryResponse;
  volumes?: VolumeResponse[];
}

interface PaginatedMangaResponse {
  items: MangaSeriesResponse[];
  totalCount: number;
}

// Frontend'de detay sayfasında kullanılacak, volumes içeren genişletilmiş tip
export interface MangaDetail extends Manga {
  volumes: {
    id: string;
    volumeNumber: number | null;
    title: string;
    slug: string;
    price: number;
    imageUrl: string;
    stock: number;
  }[];
}

// ============================================================================
// 🛡️ YARDIMCI FONKSİYONLAR
// ============================================================================

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      const storedData = localStorage.getItem('auth-storage');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        return parsed?.state?.token || null;
      }
    } catch (error) {
      console.error('Token okunurken hata oluştu:', error);
      return null;
    }
  }
  return null;
};

// ============================================================================
// 🛠️ VERİ DÖNÜŞTÜRÜCÜLER (Adapters)
// ============================================================================

export function mapVolumeToManga(volume: VolumeResponse): Manga {
  return {
    id: volume.id.toString(),
    // DÜZELTME: Linkler için her zaman üst serinin slug'ını kullanıyoruz.
    // Eğer manga verisi eksikse fallback olarak volume slug'ı kullanılır.
    slug: volume.manga?.slug || volume.slug, 
    
    // UI'da hangi ismi görmek istiyorsan onu seçebilirsin:
    // volume.title -> "Vagabond Cilt 1" 
    // volume.manga?.title -> "Vagabond"
    title: volume.title, 
    
    author: volume.manga?.author || "Bilinmiyor",
    price: Number(volume.price),
    originalPrice: volume.originalPrice ? Number(volume.originalPrice) : undefined,
    image: volume.imageUrl,
    category: volume.manga?.category?.name || "Genel",
    badge: volume.badge || undefined,
    description: volume.manga?.description || "",
    rating: Number(volume.manga?.rating || 0),
    reviewsCount: 0, 
    stock: volume.stock,
    pages: volume.pages,
    publisher: volume.publisher || "",
    views: volume.manga?.views || 0,
    popularityRank: volume.manga?.popularityRank || 0,
    isNewArrival: volume.isNewArrival,
    isBestSeller: volume.isBestSeller,
    isOneShot: volume.manga?.isOneShot ?? false,
  };
}

export function mapSeriesToManga(series: MangaSeriesResponse): Manga {
  const defaultVolume = series.volumes && series.volumes.length > 0 ? series.volumes[0] : null;
  
  return {
    id: series.id.toString(),
    slug: series.slug, // Zaten seri slug'ı (örn: vagabond)
    title: series.title,
    author: series.author,
    price: defaultVolume ? Number(defaultVolume.price) : 0,
    originalPrice: defaultVolume?.originalPrice ? Number(defaultVolume.originalPrice) : undefined,
    image: defaultVolume?.imageUrl || series.volumes?.[0]?.imageUrl || "/placeholder.png",
    category: series.category?.name || "Genel",
    badge: defaultVolume?.badge || undefined,
    description: series.description || "",
    rating: Number(series.rating || 0),
    reviewsCount: 0,
    stock: defaultVolume?.stock || 0,
    pages: defaultVolume?.pages || 0,
    publisher: defaultVolume?.publisher || "",
    views: series.views,
    popularityRank: series.popularityRank,
    isNewArrival: defaultVolume?.isNewArrival || false,
    isBestSeller: defaultVolume?.isBestSeller || false,
    isOneShot: series.isOneShot,
  };
}

// Detay sayfası için ciltleri (volumes) de içeren dönüştürücü
export function mapSeriesToMangaDetail(series: MangaSeriesResponse): MangaDetail {
  const baseManga = mapSeriesToManga(series);
  
  return {
    ...baseManga,
    volumes: series.volumes?.map(v => ({
      id: v.id.toString(),
      volumeNumber: v.volumeNumber,
      title: v.title,
      slug: v.slug,
      price: Number(v.price),
      imageUrl: v.imageUrl,
      stock: v.stock
    })) || [],
  };
}

// ============================================================================
// 📚 GENEL API FONKSİYONLARI (Koleksiyon & Keşif)
// ============================================================================

export async function getMangas(categorySlug?: string, searchTerm?: string, page: number = 1, limit: number = 12) {
  try {
    const skip = (page - 1) * limit;
    const url = new URL(`${API_URL}/mangas`);
    
    if (categorySlug && categorySlug !== 'tumu') url.searchParams.append('category', categorySlug);
    if (searchTerm) url.searchParams.append('search', searchTerm);
    
    url.searchParams.append('skip', skip.toString());
    url.searchParams.append('take', limit.toString());

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error(`API Hatası: ${res.status}`);

    const data = (await res.json()) as PaginatedMangaResponse;
    
    return {
      mangas: data.items.map(mapSeriesToManga),
      totalCount: data.totalCount
    };
  } catch (error) {
    console.warn("⚠️ Mangalar çekilemedi, mock veriler kullanılıyor...", error);
    return { mangas: allMangas.slice(0, limit), totalCount: allMangas.length };
  }
}

export async function getFeaturedMangas() {
  try {
    const res = await fetch(`${API_URL}/mangas/featured`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Featured verisi çekilemedi');

    const data = await res.json() as { newArrivals: VolumeResponse[], bestSellers: VolumeResponse[] };

    return {
      newArrivals: data.newArrivals.map(mapVolumeToManga),
      bestSellers: data.bestSellers.map(mapVolumeToManga)
    };
  } catch {
    // ESLint unused-vars hatasını önlemek için error parametresini kaldırdık
    return {
      newArrivals: allMangas.filter(m => m.isNewArrival).slice(0, 8),
      bestSellers: allMangas.filter(m => m.isBestSeller).slice(0, 8)
    };
  }
}

// Artık detay sayfasının beklediği MangaDetail tipini dönüyoruz
export async function getMangaBySlug(slug: string): Promise<MangaDetail | null> {
  try {
    const res = await fetch(`${API_URL}/mangas/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Manga bulunamadı');

    const data = (await res.json()) as MangaSeriesResponse;
    return mapSeriesToMangaDetail(data);
  } catch {
    // ESLint unused-vars hatasını önlemek için error parametresini kaldırdık
    return null;
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Kategoriler çekilemedi');

    const data = (await res.json()) as CategoryResponse[];
    return data.map((cat) => ({ name: cat.name, href: `/kategori/${cat.slug}`, icon: cat.icon }));
  } catch {
    // ESLint unused-vars hatasını önlemek için error parametresini kaldırdık
    return mockCategories;
  }
}

// ============================================================================
// 🔑 KİMLİK DOĞRULAMA (Auth) API FONKSİYONLARI
// ============================================================================

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Giriş işlemi başarısız oldu.');
  }
  
  return data;
}

export async function registerUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Kayıt işlemi başarısız oldu.');
  }

  return data;
}

// ============================================================================
// 🔒 KORUMALI API FONKSİYONLARI (Profil & Favoriler)
// ============================================================================

export async function getUserProfile() {
  const token = getAuthToken();
  if (!token) throw new Error('Oturum bulunamadı');

  const res = await fetch(`${API_URL}/user/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Profil bilgileri alınamadı');
  return res.json();
}

export async function updateUserProfile(name: string) {
  const token = getAuthToken();
  if (!token) throw new Error('Oturum bulunamadı');

  const res = await fetch(`${API_URL}/user/profile`, {
    method: 'PUT',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  if (!res.ok) throw new Error('Profil güncellenemedi');
  return res.json();
}

export async function toggleMangaFavorite(mangaId: number) {
  const token = getAuthToken();
  if (!token) throw new Error('Lütfen önce giriş yapın');

  const res = await fetch(`${API_URL}/user/favorites/manga/${mangaId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('İşlem başarısız');
  return res.json();
}

export async function toggleVolumeFavorite(volumeId: number) {
  const token = getAuthToken();
  if (!token) throw new Error('Lütfen önce giriş yapın');

  const res = await fetch(`${API_URL}/user/favorites/volume/${volumeId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('İşlem başarısız');
  return res.json();
}