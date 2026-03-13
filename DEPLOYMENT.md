# �배포 Guide - Vercel Deployment

Panduan lengkap untuk mendeploy website Sastro Jendro ke Vercel.

## 🚀 Quick Start

### 1. Persiapkan Repository

```bash
# Initialize git jika belum
git init
git add .
git commit -m "Initial project setup"

# Create repository di GitHub
# Push ke GitHub
git remote add origin https://github.com/username/sastro-website.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment

#### Option A: GitHub Integration (Recommended)

1. **Kunjungi Vercel**
   - Buka https://vercel.com
   - Sign in dengan GitHub account

2. **Connect Repository**
   - Klik "New Project"
   - Pilih repository "sastro-website"
   - Vercel akan auto-detect Nuxt project

3. **Set Environment Variables**
   - Di Vercel Dashboard, buka project settings
   - Masuk ke "Environment Variables"
   - Tambahkan semua variabel dari `.env.example`:

   ```
   MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/sastro
   GOOGLE_CLIENT_ID = your_google_client_id
   GOOGLE_CLIENT_SECRET = your_google_client_secret
   JWT_SECRET = your_jwt_secret_key_min_32_chars
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your_email@gmail.com
   SMTP_PASSWORD = your_app_password
   ```

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai
   - Website Anda sekarang live! 🎉

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Untuk production
vercel --prod
```

### 3. Custom Domain (Optional)

1. Di Vercel Dashboard → Settings → Domains
2. Tambahkan domain Anda (contoh: sastrojendro.id)
3. Update DNS records di domain registrar

## 🔧 Pre-Deployment Checklist

- ✅ Semua dependencies terinstall (`npm install`)
- ✅ Environment variables sudah dikonfigurasi
- ✅ MongoDB Atlas database sudah setup
- ✅ Google OAuth credentials sudah siap (jika menggunakan)
- ✅ Email SMTP sudah configured (untuk contact form)
- ✅ Code sudah di-commit ke GitHub
- ✅ README.md sudah lengkap

## 📊 Monitoring & Logs

### View Deployment Logs

```bash
# With Vercel CLI
vercel logs

# Or via Vercel Dashboard
# Project → Deployments → Select deployment → View logs
```

### Monitor Performance

- Vercel Analytics: https://vercel.com/analytics
- Web Vitals: https://web.dev/vitals

## 🔓 Environment Variables di Vercel

### Cara Set Environment Variables

1. **Via Dashboard:**
   - Settings → Environment Variables
   - Add variable → Enter key & value
   - Select environments (Production/Preview/Development)

2. **Via Vercel CLI:**
   ```bash
   vercel env add MONGODB_URI
   # Masukkan value saat diminta
   ```

3. **Via `.env.production`:**
   ```bash
   # Jangan commit ke GitHub, gunakan secrets
   # di GitHub Actions untuk auto-deployment
   ```

### Production vs Preview Environment

- **Production**: Variable yang digunakan di domain utama
- **Preview**: Variable untuk preview deployments (sebelum merge ke main)
- **Development**: Variable untuk local development (`.env.local`)

## 🔐 Security Best Practices

1. **Jangan commit .env files**
   - Sudah di`.gitignore`
   - Gunakan Vercel/GitHub secrets untuk sensitive data

2. **Secure Cookies**
   - Auth token disimpan sebagai HTTP-only cookie
   - Tidak accessible dari JavaScript

3. **HTTPS Only**
   - Vercel automatically menggunakan HTTPS
   - Redirect HTTP → HTTPS

4. **JWT Secret**
   - Gunakan minimum 32 characters random string
   - Ganti setiap deployment jika di-compromise

## 🐛 Troubleshooting

### Build Fails: "Cannot find module X"

```bash
# Clear cache dan rebuild
npm install
npm run build
```

### 502 Bad Gateway Error

Mungkin ada error di server API:
- Check Vercel logs
- Verify MongoDB connection string
- Check environment variables

### CORS Errors

Tambah ke `nuxt.config.ts`:

```typescript
nitro: {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}
```

### Database Connection Timeout

1. Verifikasi MongoDB Atlas IP whitelist
2. Pastikan connection string correct
3. Check MongoDB Atlas region

## 📈 Performance Optimization

### Image Optimization

```vue
<img 
  src="..." 
  alt="..."
  loading="lazy"
  width="800"
  height="600"
/>
```

### Code Splitting

Nuxt 3 automatically code-split routes.

### Caching

```javascript
// Cache API responses
const article = await $fetch('/api/articles/1', {
  headers: {
    'Cache-Control': 'max-age=3600' // 1 hour
  }
})
```

## 🔄 CI/CD Pipeline

### Auto-Deploy dengan GitHub

1. Push ke `main` branch
2. GitHub automatically trigger Vercel deployment
3. Preview deployment untuk PR
4. Production deployment setelah merge

### Rollback Deploy

```bash
vercel rollback
# Atau via Dashboard: Deployments → Select previous
```

## 📱 Preview Links

Vercel generate preview URL untuk setiap git push:
- Automatic preview untuk setiap branch
- Share dengan client untuk testing
- Merge ke main untuk production

## 🎯 Post-Deployment

1. **Test Website**
   - Kunjungi domain Anda di browser
   - Test semua halaman
   - Test admin login
   - Test contact form

2. **Setup Analytics**
   - Google Analytics integration
   - Vercel Analytics

3. **Monitor Uptime**
   - Setup uptime monitoring (free dengan UptimeRobot)
   - Set alert for downtime

4. **Backup Database**
   - Enable MongoDB automatic backup
   - Test restore procedure

## 💡 Tips

- **Staging Environment**: Gunakan preview deployment untuk testing
- **Custom Build Output**: Configure di `nuxt.config.ts`
- **Serverless Functions**: Deploy API routes sebagai serverless functions
- **Edge Middleware**: Tambahkan request processing logic

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- GitHub Actions: https://github.com/features/actions
- MongoDB Support: https://www.mongodb.com/support

---

**Happy Deploying!** 🚀

Selamat deployment kesitus produksi kami!
