# Zyro Panel — Vercel UI Starter

## Deploy ke Vercel
1. Extract ZIP.
2. Upload project ke GitHub repository.
3. Di Vercel pilih **Add New → Project**, import repository tersebut.
4. Framework: Next.js. Build command: `npm run build`. Deploy.

## Penting: batas fungsi
Project ini adalah **frontend starter yang bisa dijalankan di Vercel**. Login saat ini hanya membuka UI demo dan tidak menyediakan autentikasi produksi. Tombol Start/Stop/Restart dan pembuatan server mengubah data demo di browser saja; tidak menjalankan container Node.js/Python sungguhan.

Untuk hosting sungguhan, diperlukan backend/API dengan autentikasi aman, database, dan daemon agent di VPS (misalnya Docker + Wings). Jangan menyimpan password admin atau API secret di frontend. Jangan mengunggah secret ke GitHub/Vercel client-side environment variables.

## Jalankan lokal
```bash
npm install
npm run dev
```
Buka http://localhost:3000
