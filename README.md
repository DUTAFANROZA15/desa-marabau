# Website Profil Desa Marabau

Website profil desa **statis** (tanpa database), dibangun dengan **Astro**, untuk Desa Marabau,
Kecamatan Pariaman Selatan, Kota Pariaman, Sumatera Barat.

> Seluruh data pada situs ini (statistik penduduk, nama perangkat desa, berita, dsb.) adalah
> **data contoh/dummy** yang relevan secara struktur dengan Desa Marabau, dan wajib diperbarui
> oleh admin desa dengan data resmi sebelum dipublikasikan.

## 1. Stack Teknologi

- **Astro 7** — Static Site Generator, output 100% HTML statis (bisa di-hosting gratis di mana saja)
- **Content Collections** (Markdown, folder `src/content/`) — semua teks berita, galeri, perangkat
  desa, dusun, dan narasi profil dikelola lewat file `.md`, **tidak perlu sentuh kode**
- **CSS murni modern** — custom properties, Grid & Flexbox, tanpa framework CSS pihak ketiga
- **JavaScript minimal**, vanilla (tanpa jQuery/library berat), hanya untuk:
  - menu hamburger mobile
  - scroll reveal (IntersectionObserver)
  - filter & pencarian berita (client-side)
  - filter galeri + lightbox foto/video
  - animasi angka statistik (counter)

## 2. Struktur Folder

```
desa-marabau/
├─ src/
│  ├─ content.config.ts        # skema seluruh Content Collections
│  ├─ content/
│  │  ├─ berita/                # 1 file .md = 1 berita
│  │  ├─ galeri/                # 1 file .md = 1 item galeri (foto/video)
│  │  ├─ perangkat/              # 1 file .md = 1 perangkat desa
│  │  ├─ dusun/                  # 1 file .md = 1 dusun (pembagian wilayah)
│  │  └─ profil/                 # sejarah.md, visi-misi.md, potensi.md
│  ├─ components/                # Header, Footer, NewsCard, OrgChart, Illustration, dst.
│  ├─ layouts/BaseLayout.astro   # SEO meta, font, header/footer, scroll-reveal
│  ├─ styles/global.css          # design token (warna, tipografi, komponen dasar)
│  └─ pages/
│     ├─ index.astro             # Beranda
│     ├─ profil/index.astro      # Sejarah, Visi & Misi, Potensi & Budaya
│     ├─ lokasi/index.astro      # Peta, alamat, akses
│     ├─ kondisi-desa/index.astro# Batas wilayah, luas, orbitasi, demografi
│     ├─ pemerintahan/index.astro# Struktur organisasi, perangkat, pembagian wilayah
│     ├─ berita/index.astro      # Daftar berita + filter/pencarian
│     ├─ berita/[slug].astro     # Detail berita (otomatis dari file markdown)
│     └─ galeri/index.astro      # Galeri foto/video + lightbox
├─ public/                       # favicon, robots.txt, gambar statis tambahan
├─ astro.config.mjs
└─ package.json
```

## 3. Menjalankan di Komputer Lokal

Prasyarat: [Node.js](https://nodejs.org) versi 22 ke atas.

```bash
# 1. Masuk ke folder project
cd desa-marabau

# 2. Install dependency
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:4321` di browser. Perubahan pada file `.astro`/`.md` akan otomatis ter-refresh.

Perintah lain yang tersedia:

```bash
npm run build     # build versi produksi ke folder dist/
npm run preview   # jalankan hasil build secara lokal untuk pengecekan akhir
```

## 4. Cara Admin Desa Mengedit Konten (Tanpa Coding)

| Ingin mengubah…            | Edit file di…                                   |
| --------------------------- | ------------------------------------------------ |
| Tambah/ubah berita          | `src/content/berita/*.md` (salin file yang ada, ubah judul file & isi) |
| Tambah/ubah foto/video galeri | `src/content/galeri/*.md`                       |
| Nama & jabatan perangkat desa | `src/content/perangkat/*.md`                    |
| Data dusun (RT/KK)          | `src/content/dusun/*.md`                          |
| Sejarah / Visi Misi / Potensi | `src/content/profil/sejarah.md`, `visi-misi.md`, `potensi.md` |
| Statistik di Beranda & Kondisi Desa | `src/pages/index.astro` & `src/pages/kondisi-desa/index.astro` (cari angka yang ingin diubah) |
| Alamat, telepon, sosial media | `src/components/Footer.astro` & `src/pages/lokasi/index.astro` |

Setiap file berita/galeri diawali bagian **frontmatter** (di antara `---`) berisi data terstruktur
(judul, tanggal, kategori), diikuti isi/narasi dalam format Markdown biasa.

### Mengganti Gambar

Situs ini memakai **ilustrasi SVG bergaya flat** (`src/components/Illustration.astro`) sebagai
placeholder, bukan foto asli — sehingga project tetap ringan tanpa perlu upload foto besar
saat demo. Untuk memakai foto asli:

1. Simpan foto ke folder `public/images/berita/` atau `public/images/galeri/`.
2. Pada komponen terkait (`NewsCard.astro`, `pages/galeri/index.astro`, dst.), ganti pemakaian
   `<Illustration variant="..." />` dengan tag `<img src="/images/..." alt="...">` —
   pastikan selalu mengisi atribut `alt` yang deskriptif.
3. Gunakan format `.webp`/`.jpg` terkompresi agar performa tetap cepat, dan tambahkan
   `loading="lazy"` pada `<img>` yang berada di bawah layar pertama.

## 5. Deploy ke Hosting Gratis

Build project menghasilkan folder statis `dist/` yang bisa di-deploy ke mana saja. Tiga opsi termudah:

### A. Netlify
1. Push project ini ke repository GitHub.
2. Di Netlify, pilih **Add new site → Import an existing project**, hubungkan repo.
3. Build command: `npm run build` — Publish directory: `dist`
4. Deploy.

### B. Vercel
1. Push ke GitHub, lalu import project di vercel.com/new.
2. Vercel otomatis mendeteksi Astro (`npm run build`, output `dist`). Deploy.

### C. Cloudflare Pages
1. Push ke GitHub, buat Pages project baru, hubungkan repo.
2. Build command: `npm run build` — Output directory: `dist`
3. Deploy.

### D. GitHub Pages
1. Tambahkan `site`/`base` sesuai nama repo pada `astro.config.mjs` jika repo bukan `username.github.io`.
2. Gunakan GitHub Actions resmi Astro (`withastro/action`) untuk build & publish otomatis ke
   branch `gh-pages`, atau upload folder `dist/` secara manual ke branch tersebut.

> **Penting:** setelah domain final diketahui, ubah nilai `site: 'https://desamarabau.example.id'`
> pada `astro.config.mjs` agar `sitemap.xml`, `robots.txt`, dan tag Open Graph menunjuk ke URL yang benar.

## 6. Performa, SEO & Aksesibilitas

- Setiap halaman memiliki `<title>`, meta `description`, dan tag Open Graph (lihat `BaseLayout.astro`).
- `sitemap-index.xml` dibuat otomatis oleh `@astrojs/sitemap` saat build; `robots.txt` tersedia di `public/`.
- Struktur HTML memakai tag semantik (`header`, `nav`, `main`, `section`, `footer`).
- Kontras warna dan ukuran teks disusun mengikuti panduan WCAG AA; seluruh elemen interaktif punya
  status fokus keyboard yang terlihat (`:focus-visible`).
- Tidak ada library JavaScript besar; animasi memakai `IntersectionObserver` bawaan browser dan
  menghormati preferensi `prefers-reduced-motion`.
- Peta memakai `<iframe>` OpenStreetMap (gratis, tanpa API key). Untuk peta interaktif dengan
  marker kustom, bisa diganti ke Leaflet.js sesuai kebutuhan.

## 7. Palet Desain

| Token | Nilai | Kegunaan |
|---|---|---|
| `--color-forest` | `#26402A` | Warna utama (header, judul, tombol garis) |
| `--color-sawah` | `#7C9A5B` | Aksen sekunder (badge kategori) |
| `--color-gabah` | `#C89B3C` | Aksen CTA/highlight (emas gabah/padi) |
| `--color-tanah` | `#7A4B2E` | Aksen cokelat tanah |
| `--color-cream` | `#F7F3E9` | Latar netral |
| `--font-display` | Fraunces | Judul & elemen ekspresif |
| `--font-body` | Plus Jakarta Sans | Teks isi & UI |

Motif garis "kontur sawah berundak" (`KonturDivider.astro`) dipakai berulang sebagai elemen
tanda-tangan visual yang menghubungkan identitas desa dengan gaya desain modern.

---

Dibuat sebagai kerangka awal yang siap dikembangkan lebih lanjut oleh tim desa/developer.
