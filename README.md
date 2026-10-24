# Zyro Panel Upgrade — UI Starter

Versi ini meningkatkan tampilan dashboard dan menyediakan halaman Overview, Servers, Nodes, Global Chat, Music Search, serta Admin UI. Bahasa antarmuka Indonesia.

## Deploy frontend di Vercel
1. Ekstrak ZIP.
2. Upload **isi folder project** ke root repository GitHub (jangan commit ZIP sebagai satu-satunya file).
3. Import repository ke https://vercel.com/new.
4. Framework preset: Next.js; Root Directory: `.`; install `npm install`; build `npm run build`.
5. Deploy.

## Status fungsionalitas — jujur dan penting
Ini masih **UI preview**, bukan panel hosting produksi:
- Server list dan tombol Start/Stop/Restart mengubah status preview di browser; tidak menjalankan container.
- Node page belum terhubung ke mesin VPS.
- Global Chat hanya tersimpan pada sesi halaman saat ini, tidak real-time antar-user.
- Music Search hanya antarmuka; perlu integrasi provider yang berizin.
- Login bukan autentikasi produksi dan tidak boleh dipakai untuk melindungi data sungguhan.

## Arsitektur produksi yang direkomendasikan
- Frontend: Next.js di Vercel (dashboard saja).
- Backend API: service Node.js/NestJS pada VPS/managed host.
- Database: PostgreSQL untuk user, server, nodes, audit log.
- Realtime: WebSocket + Redis pub/sub untuk chat dan console.
- Node agent: Docker + Wings/Pterodactyl Wings pada VPS Linux untuk lifecycle server, file manager, logs, CPU/RAM/disk, backup, dan allocations.
- Secrets: hanya server-side environment variables; jangan pernah kirim API keys ke browser.

Pterodactyl menggunakan Panel untuk mengelola dan Wings pada node untuk menjalankan server dalam container Docker. Vercel cocok untuk UI/API pendek, bukan menggantikan mesin node Docker yang selalu hidup.

Dokumentasi arsitektur: https://docs.pterodactyl.io/v2/project/how-it-works
Panduan Wings: https://docs.pterodactyl.io/v2/wings/installing

## Sebelum membeli VPS
Karena belum ada VPS/domain, deploy dulu UI preview gratis jika tersedia. Untuk benar-benar menyalakan Node.js/Python server, siapkan VPS Linux yang mendukung Docker; domain dapat ditambahkan kemudian. Jangan simpan password admin sungguhan di kode.
