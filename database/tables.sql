-- --- 1. ENUM TİPİ TANIMLAMA ---
-- PostgreSQL'de ENUM'lar tablo dışında bir tip olarak tanımlanır
CREATE TYPE manga_badge AS ENUM (
    'Yeni',
    'Popüler',
    'Tükenebilir',
    'Koleksiyon',
    'İndirim'
);
-- --- 2. KATEGORİLER TABLOSU ---
CREATE TABLE IF NOT EXISTS categories (
    id SMALLSERIAL PRIMARY KEY,
    -- Küçük tablolar için SMALLSERIAL daha performanslıdır
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(60) NOT NULL UNIQUE,
    icon VARCHAR(50) DEFAULT NULL
);
-- --- 3. MANGAS TABLOSU ---
CREATE TABLE IF NOT EXISTS mangas (
    id SERIAL PRIMARY KEY,
    category_id SMALLINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    author VARCHAR(150) NOT NULL,
    -- PostgreSQL'de UNSIGNED yoktur, onun yerine CHECK constraint kullanırız
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    original_price DECIMAL(10, 2) CHECK (original_price >= 0),
    image_url VARCHAR(500) NOT NULL,
    badge manga_badge DEFAULT NULL,
    -- Yukarıda tanımladığımız tipi kullandık
    description TEXT,
    rating DECIMAL(2, 1) DEFAULT 0.0 CHECK (
        rating >= 0
        AND rating <= 5
    ),
    reviews_count INTEGER DEFAULT 0 CHECK (reviews_count >= 0),
    stock SMALLINT DEFAULT 0 CHECK (stock >= 0),
    pages SMALLINT DEFAULT 0 CHECK (pages >= 0),
    publisher VARCHAR(100),
    views INTEGER DEFAULT 0,
    popularity_rank INTEGER DEFAULT 0,
    -- PostgreSQL gerçek BOOLEAN tipini destekler
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_best_seller BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key
    CONSTRAINT fk_manga_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);
-- --- 4. İNDEKSLER (Performans İçin) ---
CREATE INDEX idx_manga_category ON mangas(category_id);
CREATE INDEX idx_manga_new_arrival ON mangas(is_new_arrival)
WHERE is_new_arrival IS TRUE;
CREATE INDEX idx_manga_best_seller ON mangas(is_best_seller)
WHERE is_best_seller IS TRUE;
-- --- 5. UPDATED_AT FONKSİYONU ---
-- PostgreSQL'de otomatik güncellenen tarih için bu trigger gereklidir
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_manga_modtime BEFORE
UPDATE ON mangas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Kategorileri Ekle
INSERT INTO categories (id, name, slug)
VALUES (1, 'Seinen', 'seinen'),
    (2, 'Fantezi', 'fantezi'),
    (3, 'Hayattan Kesitler', 'hayattan-kesitler'),
    (4, 'Karanlık Fantezi', 'karanlik-fantezi'),
    (5, 'Shounen', 'shounen'),
    (6, 'Shoujo', 'shoujo'),
    (7, 'Isekai', 'isekai');
-- Mangaları Ekle
INSERT INTO mangas (
        category_id,
        title,
        slug,
        author,
        price,
        original_price,
        image_url,
        badge,
        description,
        rating,
        reviews_count,
        stock,
        pages,
        publisher,
        views,
        popularity_rank,
        is_new_arrival,
        is_best_seller
    )
VALUES (
        1,
        'Vagabond Cilt 1',
        'vagabond-cilt-1',
        'Takehiko Inoue',
        149.90,
        180.00,
        'https://images.unsplash.com/photo-1601850494422-3fb19e13f045',
        'Popüler',
        'Miyamoto Musashi''nin efsanevi kılıç yolu serüveni.',
        5.0,
        128,
        15,
        256,
        'Marmara Çizgi',
        12500,
        2,
        FALSE,
        TRUE
    ),
    (
        2,
        'Yürüyen Şato',
        'yuruyen-sato',
        'Diana Wynne Jones',
        125.00,
        NULL,
        'https://images.unsplash.com/photo-1544640808-32cb4f6864c7',
        'Popüler',
        'Sophie ve büyücü Howl''un büyülü hikayesi.',
        5.0,
        342,
        50,
        312,
        'İthaki Yayınları',
        8900,
        5,
        FALSE,
        TRUE
    ),
    (
        3,
        'Oyasumi Punpun Cilt 1',
        'oyasumi-punpun-cilt-1',
        'Inio Asano',
        135.50,
        150.00,
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73',
        NULL,
        'Punpun''un melankolik ve sarsıcı büyüme hikayesi.',
        4.0,
        89,
        8,
        224,
        'Gerekli Şeyler',
        4200,
        8,
        FALSE,
        FALSE
    ),
    (
        4,
        'Berserk Cilt 1',
        'berserk-cilt-1',
        'Kentaro Miura',
        160.00,
        NULL,
        'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce',
        'Tükenebilir',
        'Kara Kılıç Ustası Guts''ın amansız mücadelesi.',
        5.0,
        512,
        3,
        240,
        'Marmara Çizgi',
        25000,
        1,
        FALSE,
        TRUE
    ),
    (
        5,
        'Spy x Family Cilt 1',
        'spy-x-family-cilt-1',
        'Tatsuya Endo',
        110.00,
        NULL,
        'https://images.unsplash.com/photo-1580920461360-1000f149874a',
        'Yeni',
        'Bir casus, bir suikastçı ve bir telepatın hikayesi.',
        5.0,
        210,
        25,
        200,
        'Gerekli Şeyler',
        18400,
        3,
        TRUE,
        TRUE
    ),
    (
        6,
        'Nana Cilt 1',
        'nana-cilt-1',
        'Ai Yazawa',
        120.00,
        NULL,
        'https://images.unsplash.com/photo-1543004218-ee14110497f9',
        'Yeni',
        'İki genç kadının Tokyo''daki dostluğu.',
        5.0,
        165,
        12,
        192,
        'Gerekli Şeyler',
        9200,
        6,
        TRUE,
        FALSE
    ),
    (
        7,
        'Slime: Reincarnated',
        'slime-reincarnated',
        'Fuse',
        130.00,
        NULL,
        'https://images.unsplash.com/photo-1618519764620-7403abdb09c1',
        'Popüler',
        'Rimuru''nun medeniyet kurma serüveni.',
        4.0,
        142,
        20,
        210,
        'Marmara Çizgi',
        11000,
        4,
        FALSE,
        TRUE
    ),
    (
        8,
        'Vinland Saga Cilt 1',
        'vinland-saga-cilt-1',
        'Makoto Yukimura',
        155.00,
        NULL,
        'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf',
        'Koleksiyon',
        'Viking çağına dair epik bir intikam hikayesi.',
        5.0,
        195,
        10,
        220,
        'Marmara Çizgi',
        7800,
        7,
        FALSE,
        FALSE
    );