import { allMangas, categories as mockCategories, Manga } from './data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ============================================================================
// 🧱 TİP TANIMLAMALARI (Backend ile %100 Uyumlu)
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
  slug: string; // URL için kritik
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
  slug: string; // URL için kritik
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

// ============================================================================
// 🛠️ VERİ DÖNÜŞTÜRÜCÜLER (Adapters)
// ============================================================================

/**
 * Bir cildi (Volume) frontend Manga objesine çevirir.
 */
function mapVolumeToManga(volume: VolumeResponse): Manga {
  return {
    id: volume.id.toString(),
    slug: volume.slug, // DÜZELTME: Cilt slug'ını ekledik
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

/**
 * Bir seriyi (Series) frontend Manga objesine çevirir.
 */
function mapSeriesToManga(series: MangaSeriesResponse): Manga {
  const defaultVolume = series.volumes && series.volumes.length > 0 ? series.volumes[0] : null;
  
  return {
    id: series.id.toString(),
    slug: series.slug, // DÜZELTME: Seri slug'ını ekledik
    title: series.title,
    author: series.author,
    price: defaultVolume ? Number(defaultVolume.price) : 0,
    originalPrice: defaultVolume?.originalPrice ? Number(defaultVolume.originalPrice) : undefined,
    image: defaultVolume?.imageUrl || "",
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

// ============================================================================
// 📚 API FONKSİYONLARI
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
    return {
      mangas: allMangas.slice(0, limit),
      totalCount: allMangas.length
    };
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
  } catch (error) {
    console.warn("⚠️ Öne çıkanlar çekilemedi, mock veriler devrede...", error);
    return {
      newArrivals: allMangas.filter(m => m.isNewArrival).slice(0, 8),
      bestSellers: allMangas.filter(m => m.isBestSeller).slice(0, 8)
    };
  }
}

export async function getMangaBySlug(slug: string): Promise<Manga | null> {
  try {
    const res = await fetch(`${API_URL}/mangas/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Manga bulunamadı');

    const data = (await res.json()) as MangaSeriesResponse;
    return mapSeriesToManga(data);
  } catch (error) {
    console.warn(`⚠️ '${slug}' çekilemedi, mock veri aranıyor...`, error);
    // ID yerine slug ile eşleştirme yapıyoruz
    return allMangas.find(m => m.slug === slug) || null;
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Kategoriler çekilemedi');

    const data = (await res.json()) as CategoryResponse[];
    return data.map((cat) => ({
      name: cat.name,
      href: `/kategori/${cat.slug}`,
      icon: cat.icon
    }));
  } catch (error) {
    console.warn("⚠️ Kategoriler çekilemedi, mock veriler devrede...", error);
    return mockCategories;
  }
}

export async function getFavorites(userId?: string): Promise<Manga[]> {
  try {
    const url = userId ? `${API_URL}/favorites?userId=${userId}` : `${API_URL}/favorites`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API Hatası: ${res.status}`);

    const data = (await res.json()) as MangaSeriesResponse[];
    return data.map(mapSeriesToManga);
  } catch (error) {
    console.warn("⚠️ Favoriler çekilemedi, mock veriler devrede...", error);
    return [allMangas[0], allMangas[1], allMangas[2]];
  }
}