# Honest & Rare — Konuşma Özeti

## Proje
React 19 + Vite + React Router DOM v7 + Framer Motion (motion/react) + Tailwind CSS

---

## Yapılan Değişiklikler

### Nav (`src/components/Nav.jsx`)
- Tüm kategoriler eklendi: Bestseller, Gifts, Spirits, Gin, Craft Beer, Coffee/Tea, Snacks, Limos & Co, Spices, Wine, Journal, Our Story
- Mega menu: hover'da açılan dropdown, Born Ready Slanted başlık, grid kolonlar, border-right ayraçlar
- Bestseller / Journal / Our Story altın (#c4933f) rengiyle vurgulanıyor
- Logo: 26px yükseklik
- Kategoriler Bestseller ile Journal arasında ortalanmış

### Hero (`src/components/ui/hero-section-7.jsx`)
- Başlık: "Quality" → Born Ready Slanted, "instead of quantity." → Cormorant Garamond italic, tek satır, her ikisi siyah (#1a1614)
- Scroll animasyonları eklendi (useScroll + useTransform + useSpring):
  - Giriş: başlık aşağıdan gelir, divider genişler, CTA'lar sırayla görünür
  - Scroll: başlık yukarı kayar + solar, video yakınlaşır, scroll cue solar, swirls parallax
- Scroll cue: pulse animasyonu

### Announcement Bar (App.jsx, BestsellerPage.jsx, RecipePage.jsx, BrandPage.jsx)
- `whiteSpace: 'nowrap'` tüm sayfalarda mevcut
- Metin: "✦ Quality instead of quantity" / "✦ 9,500 independent products" / "✦ No mainstream"

### BestsellerPage (`src/pages/BestsellerPage.jsx`)
- Sidebar filtreler: FilterSection + FilterCheck accordion bileşenleri
- Filtre grupları: Category, Price, Origin, Eating Style, ABV, Brand, On Sale
- Multi-select OR logic (matchesGroup fonksiyonu)
- Grid layout: 220px sidebar + 1fr ürünler

### LifestyleProjects (`src/components/LifestyleProjects.jsx`)
- "Content first. Commerce second." bölümü kayan marquee banner'a dönüştürüldü
- Koyu (#1a1614) arka plan, video yok
- Büyük satır: "Content first." beyaz + "Commerce second." altın italic, sağdan sola kayan
- Alt satır: küçük etiket + açıklama metni

### Brand Story Sayfası (`src/pages/BrandPage.jsx`) — YENİ SAYFA
- Route: `/brand`
- Nav'da "Our Story" olarak görünüyor (altın renk)
- Bölümler: Hero, How It All Started, Our Marketplace, Our Belief (manifesto), Meet Our Team, What Drives Us, CTA, Contact
- Tasarım: site design sistemiyle tam uyumlu — section-label-dark, gold-rule, btn-primary, btn-ghost-light CSS class'ları
- Borderless grid layout, editorial stil (Brand.jsx ile aynı dil)
- CTA bölümü: koyu arka plan + RARE ghost watermark
- Tüm emojiler kaldırıldı

### Emoji Temizliği
- Tüm resim emojileri (🥃🍺🍾🚚📦🌍🔒) kaldırıldı
- ✦ ✓ ♥ ♡ tipografik semboller korundu

### MCP Server
- Higgsfield MCP eklendi: `claude mcp add --transport http higgsfield https://mcp.higgsfield.ai/mcp`

---

## Dosya Yapısı (değiştirilen/eklenen)
```
src/
├── App.jsx                          — announcement bar, router
├── main.jsx                         — /brand route eklendi
├── components/
│   ├── Nav.jsx                      — mega menu, tüm kategoriler, Our Story
│   ├── Brand.jsx                    — "Our Manifesto" → /brand linki
│   └── ui/
│       └── hero-section-7.jsx       — scroll animasyonları
│   └── LifestyleProjects.jsx        — marquee banner
├── pages/
│   ├── BestsellerPage.jsx           — sidebar filtreler
│   ├── BrandPage.jsx                — YENİ: Our Story sayfası
│   ├── RecipePage.jsx               — announcement bar fix
│   └── ProductDetailPage.jsx        — emoji temizliği
└── data/
    └── recipes.js                   — değişmedi
```

---

## Tasarım Sistemi
- **Renkler:** `#1a1614` (koyu), `#f0eeea` (açık bg), `#e8e4de` (ikincil bg), `#c4933f` (altın), `#7a9a6e` (yeşil)
- **Fontlar:** Futura LT Pro (sans), Cormorant Garamond (serif/display), Born Ready Slanted (accent)
- **CSS Class'lar:** `section-label`, `section-label-dark`, `gold-rule`, `btn-primary`, `btn-ghost`, `btn-ghost-light`

---

## Vercel
- Deploy edildi: https://honest-rare.vercel.app
- CLI: `vercel --prod`
