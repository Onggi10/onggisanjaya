# Panduan Deploy ke Vercel

Proyek ini sudah dikonfigurasi agar bisa di-deploy ke **Vercel** dengan mudah.

## Langkah-langkah Deploy

### 1. Push kode ke GitHub
- Di Lovable, buka **GitHub → Connect to GitHub** dan buat repository baru.
- Atau jika sudah punya repo, push perubahan terbaru.

### 2. Import project di Vercel
1. Buka [https://vercel.com/new](https://vercel.com/new)
2. Pilih repository GitHub Anda
3. Vercel akan otomatis mendeteksi konfigurasi dari `vercel.json`:
   - **Build Command**: `vite build`
   - **Output Directory**: `.output/public`
   - **Install Command**: `npm install`
4. Klik **Deploy**

### 3. Selesai 🎉
Vercel akan memberikan URL seperti `your-project.vercel.app`.

## Catatan tentang GitHub Pages

GitHub Pages **tidak direkomendasikan** untuk proyek ini karena:
- GitHub Pages hanya melayani file statis murni
- TanStack Start dirancang untuk SSR/edge runtime
- Vercel jauh lebih cocok dan tetap **gratis** untuk personal project

## Custom Domain
Setelah deploy, Anda bisa menambahkan custom domain di:
**Vercel Dashboard → Project → Settings → Domains**
