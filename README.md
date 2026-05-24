# Our Little Universe

Romantic Constellation Memory Website dengan React, Vite, Tailwind CSS, Framer Motion, dan React Icons. Semua data memakai file lokal/dummy data, tanpa database, backend, Firebase, atau API eksternal.

## Struktur Folder

Semua tampilan, data dummy, komponen kecil, dan CSS custom utama sekarang disatukan di `src/App.jsx`. Ini memudahkan upgrade tampilan karena kamu bisa mengganti seluruh isi `App.jsx` saja.

```txt
src/
  assets/
    images/
      cover.jpg
      photo-1.jpg
      photo-2.jpg
      photo-3.jpg
      photo-4.jpg
      photo-5.jpg
      photo-6.jpg
  App.jsx
  main.jsx
  index.css
public/
  music/
    song.mp3
```

## Cara Membuat Project React + Vite

```bash
npm create vite@latest our-little-universe -- --template react
cd our-little-universe
npm install
```

## Dependency

```bash
npm install framer-motion react-icons
npm install -D tailwindcss@3.4.17 postcss autoprefixer @vitejs/plugin-react
npx tailwindcss init -p
```

## Menjalankan Project

```bash
npm run dev
```

## Mengganti Gambar

Ganti file di `src/assets/images/` dengan nama yang sama:

- `cover.jpg`
- `photo-1.jpg` sampai `photo-6.jpg`

Gunakan rasio portrait agar gallery tetap cinematic. Ukuran aman: 1200 x 1600 px atau 900 x 1200 px.

## Mengganti Musik

Taruh file MP3 lokal di `public/music/song.mp3`. File MP3 sengaja di-ignore dari Git agar lagu komersial tidak ikut ter-upload ke GitHub publik. Kalau mau deploy dengan audio, gunakan lagu milik sendiri atau lagu berlisensi.

## Mengubah Data

Semua data ada langsung di `src/App.jsx`:

- `timelineItems`
- `reasons`
- `starMessages`
- `galleryItems`

## Build Project

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Deploy ke Netlify

1. Push project ke GitHub.
2. Buka Netlify lalu pilih `Add new site` dan `Import an existing project`.
3. Pilih repository project ini.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. Klik `Deploy`.

## Tips Portfolio

- Pakai foto asli yang warnanya konsisten: night, pink, purple, silver.
- Ganti copywriting dengan cerita personal agar terasa eksklusif.
- Tambahkan 1 screenshot desktop dan 1 screenshot mobile di portfolio.
- Tulis tech stack dengan jelas: React, Vite, Tailwind CSS, Framer Motion.
- Untuk demo publik, pakai musik bebas lisensi atau milik sendiri.
