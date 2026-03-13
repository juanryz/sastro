# Sastro Jendro Hayuningrat Pangruwating - Website

Website resmi untuk Sastro Jendro Hayuningrat Pangruwating - Organisasi pelestarian budaya Jawa tradisional.

## 🌟 Fitur Utama

- 🏠 **Home Page**: Pengenalan organisasi dengan banner menarik
- 📝 **Berita & Blog**: Sistem manajemen konten berita dengan kategori dan pencarian
- 🏢 **Struktur Organisasi**: Tampilan struktur organisasi yang dapat dikelola melalui dashboard
- 👥 **Daftar Anggota**: Tim anggota organisasi dengan detail profil
- 📞 **Form Kontak**: Formulir kontak publik untuk komunikasi umum
- 🔐 **Admin Dashboard**: Panel admin untuk mengelola semua konten
- 🎨 **Gallery**: Dokumentasi acara dan aktivitas organisasi (fitur tambahan)
- 🌙 **Dark Mode**: Dukungan Mode Gelap

## 🚀 Tech Stack

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **Backend**: Nitro (Nuxt Server Engine)
- **Database**: MongoDB
- **Autentikasi**: Google OAuth + JWT
- **Styling**: Tailwind CSS + Vuetify
- **Deployment**: Vercel

## 📋 Persyaratan

- Node.js 18+
- npm atau yarn
- MongoDB Atlas Account (free tier tersedia)
- Google OAuth Credentials (opsional)

## 🔧 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd sastro-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` dan sesuaikan nilai berikut:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sastro-jendro

# Google OAuth (opsional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT
JWT_SECRET=your_super_secret_key

# Email (untuk form kontak)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### 4. MongoDB Setup (opsional - untuk development lokal)

Jika menggunakan MongoDB lokal:

```bash
# macOS dengan Homebrew
brew install mongodb-community
brew services start mongodb-community

# Atau gunakan Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

Untuk produksi, gunakan **MongoDB Atlas** (gratis untuk tier terbatas):
- Kunjungi https://www.mongodb.com/cloud/atlas
- Buat cluster gratis
- Dapatkan connection string

### 5. Development Server

```bash
npm run dev
```

Buka browser ke `http://localhost:3000`

### 6. Build untuk Production

```bash
npm run build
npm run start
```

## 📁 Struktur Direktori

```
sastro-website/
├── pages/
│   ├── index.vue                 # Home Page
│   ├── berita/
│   │   ├── index.vue            # Daftar Berita
│   │   └── [slug].vue           # Detail Berita
│   ├── struktur/
│   │   └── index.vue            # Struktur Organisasi
│   ├── anggota/
│   │   └── index.vue            # Daftar Anggota
│   ├── kontak/
│   │   └── index.vue            # Form Kontak
│   └── admin/
│       ├── login.vue            # Admin Login
│       ├── index.vue            # Admin Dashboard
│       ├── berita/
│       ├── struktur/
│       └── anggota/
├── components/                   # Reusable Vue Components
├── layouts/
│   └── default.vue              # Main Layout
├── server/
│   ├── api/
│   │   ├── articles.ts          # GET Articles
│   │   ├── articles/[id].ts     # GET/PUT/DELETE Article
│   │   ├── auth/
│   │   │   ├── login.post.ts    # POST Login
│   │   │   ├── logout.post.ts   # POST Logout
│   │   │   └── me.get.ts        # GET Current User
│   │   ├── members.ts           # GET Members
│   │   ├── organization-structure.ts
│   │   └── contact.post.ts      # POST Contact Message
│   └── utils/
├── middleware/
│   └── admin.ts                 # Admin Route Protection
├── assets/
│   └── css/
│       └── main.css
├── public/
│   └── images/
├── nuxt.config.ts
├── package.json
├── vercel.json
└── .env.example
```

## 🔐 Admin Access

Akses admin dashboard di: `http://localhost:3000/admin`

**Default Demo Credentials:**
- Email: `admin@demo.com`
- Password: `demo123`

> ⚠️ Ubah credentials ini di database sebelum production!

## 📝 Managemen Konten

### Dashboard Admin

1. **Dashboard Utama**: Overview statistik
2. **Berita & Blog**: Tambah, edit, hapus artikel
3. **Struktur Organisasi**: Kelola hierarchy organisasi
4. **Anggota**: Kelola profil anggota
5. **Pengaturan Profil**: Edit info organisasi umum

### Menambah Berita

1. Masuk ke Admin Dashboard
2. Klik "Berita & Blog"
3. Klik "Tambah Berita"
4. Isi judul, kategori, konten, dan gambar
5. Pilih status (Draft/Dipublikasikan)
6. Simpan

## 🌐 Deployment ke Vercel

### Opsi 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Opsi 2: GitHub Integration

1. Push code ke GitHub
2. Masuk ke https://vercel.com
3. Klik "New Project"
4. Import repository GitHub
5. Tambahkan environment variables di Vercel Dashboard
6. Deploy!

### Environment Variables di Vercel

Di Vercel Dashboard Settings → Environment Variables, tambahkan:

```
MONGODB_URI=your_mongodb_atlas_uri
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

## 🛠️ Konfigurasi MongoDB

### Langkah Setup MongoDB Atlas:

1. Daftar di https://www.mongodb.com/cloud/atlas
2. Buat cluster baru (M0 - Free)
3. Setup authentication (username & password)
4. Whitelist IP address
5. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

### Database Collections:

```javascript
// articles
{
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  category: String,
  status: 'published' | 'draft',
  createdAt: Date,
  updatedAt: Date
}

// members
{
  name: String,
  position: String,
  bio: String,
  email: String,
  phone: String
}

// organization-structure
{
  ketua: { name, title, email },
  wakil: Array,
  departments: Array
}
```

## 🔒 Google OAuth Setup

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com)
2. Buat project baru
3. Enable "Google+ API"
4. Buat OAuth 2.0 credentials:
   - Type: OAuth client ID
   - Application type: Web application
   - Authorized redirect URIs: `https://yourdomain.com/api/auth/callback`
5. Copy Client ID dan Client Secret ke `.env.local`

## 📧 Setup Email (Contact Form)

Gunakan Gmail:

1. Enable 2-Factor Authentication
2. Create "App Password" untuk Gmail
3. Use App Password di `SMTP_PASSWORD`

## 📱 Fitur Tambahan yang Disarankan

Untuk pengembangan lebih lanjut:

- 🖼️ **Gallery**: Dokumentasi foto acara
- 📊 **Analytics**: Tracking pengunjung
- 🔔 **Newsletter**: Email subscription
- 💬 **Comments**: Komentar pada artikel
- 📱 **Mobile App**: PWA atau React Native
- 🎥 **Video**: Embedded video dari YouTube
- 📍 **Map**: Google Maps untuk lokasi
- 🌍 **Multi-language**: Bahasa Indonesia/Inggris

## 🐛 Troubleshooting

### Error: "Cannot find module 'mongodb'"

```bash
npm install mongodb
```

### Error: "MONGODB_URI is not defined"

Pastikan `.env.local` sudah dibuat dan berisi MONGODB_URI.

### Vercel Build Gagal

Periksa logs di Vercel Dashboard dan pastikan semua environment variables sudah diset.

## 📚 Documentation Links

- [Nuxt 3 Docs](https://nuxt.com)
- [Vue 3 Docs](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Vercel Docs](https://vercel.com/docs)

## 📞 Support

Untuk pertanyaan atau bug reports, buat issue di repository atau hubungi:
- Email: info@sastrojendro.id
- Website: https://sastrojendro.id

## 📄 License

Hak Cipta © 2024 Sastro Jendro Hayuningrat Pangruwating. All rights reserved.

---

**Happy Coding!** 🎉

Semoga website ini membantu dalam melestarikan budaya Jawa tradisional yang kaya.
