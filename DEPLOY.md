# Panduan Deploy

Proyek ini punya custom build script yang menghasilkan **HTML statis** dari aplikasi TanStack Start, sehingga bisa di-deploy ke **Vercel**, **GitHub Pages**, **Netlify**, atau hosting static manapun.

## Cara kerjanya

`scripts/build-static.mjs` akan:

1. Menjalankan `vite build` (menghasilkan client bundle + SSR worker)
2. Memuat SSR worker, lalu merender route `/` ke HTML
3. Menulis HTML ke `dist/client/index.html`
4. Folder `dist/client/` siap di-deploy

## Deploy ke Vercel

### Cara 1: Import dari GitHub (Recommended)

1. Connect proyek ke GitHub via Lovable (menu **GitHub → Connect**)
2. Buka [vercel.com/new](https://vercel.com/new)
3. Import repository Anda
4. Vercel akan baca `vercel.json` otomatis:
   - **Build Command**: `node scripts/build-static.mjs`
   - **Output Directory**: `dist/client`
5. Klik **Deploy** ✅

### Cara 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

## Deploy ke GitHub Pages

1. Push ke GitHub (lihat di atas)
2. Tambahkan workflow `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20 }
         - run: npm install
         - run: npm run build:static
         - uses: actions/upload-pages-artifact@v3
           with: { path: dist/client }
         - uses: actions/deploy-pages@v4
   ```
3. Aktifkan **GitHub Pages** di Settings → Pages → Source: GitHub Actions

## Test build statis lokal

```bash
npm run build:static
npx serve dist/client
```

## Catatan

- Tetap bisa publish via tombol **Publish** Lovable (cara termudah, 1 klik)
- File `wrangler.jsonc` & SSR config tetap dipertahankan agar preview Lovable jalan normal
