# Quick Reference & Getting Started

## 🎯 Project Overview

**Website Name:** Sastro Jendro Hayuningrat Pangruwating  
**Tech Stack:** Nuxt 3 + Vue 3 + Tailwind CSS + MongoDB + Vercel  
**Language:** Indonesian (Ready for English translation)  
**Status:** Ready for Development & Deployment ✅

---

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Build for production
npm run start            # Start production server
npm run preview          # Preview production build

# Testing
npm run build            # Check for build errors
npm run dev              # Check for runtime errors
```

---

## 🌐 Website URLs

### Frontend Routes
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Home Page | ✅ Ready |
| `/berita` | News/Blog List | ✅ Ready |
| `/berita/[slug]` | Article Detail | ✅ Ready |
| `/struktur` | Organization Structure | ✅ Ready |
| `/anggota` | Members List | ✅ Ready |
| `/kontak` | Contact Form | ✅ Ready |
| `/admin/login` | Admin Login | ✅ Ready |
| `/admin` | Admin Dashboard | ✅ Ready |
| `/admin/berita` | Manage Articles | ✅ Ready |
| `/admin/struktur` | Manage Structure | ✅ Ready |
| `/admin/anggota` | Manage Members | ✅ Ready |

### API Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/articles` | GET | Get all articles |
| `/api/articles/[id]` | GET/PUT/DELETE | Article operations |
| `/api/members` | GET | Get all members |
| `/api/organization-structure` | GET | Get org structure |
| `/api/auth/login` | POST | User login |
| `/api/auth/logout` | POST | User logout |
| `/api/auth/me` | GET | Current user info |
| `/api/contact` | POST | Submit contact form |

---

## 📁 File Structure

### Important Files
```
sastro-website/
├── pages/                          # Public pages
├── layouts/default.vue            # Main layout
├── server/api/                    # Backend routes
├── middleware/admin.ts            # Route protection
├── components/                    # Reusable components
├── nuxt.config.ts                 # Nuxt configuration
├── package.json                   # Dependencies
├── .env.example                   # Environment template
├── vercel.json                    # Vercel config
├── README.md                      # Main documentation
├── DEPLOYMENT.md                  # Deployment guide
├── FEATURES.md                    # Features documentation
└── .gitignore                     # Git ignore rules
```

---

## 🔐 Authentication

### Demo Credentials
```
Email:    admin@demo.com
Password: demo123
```

### How to Change Admin Password
1. Hash new password dengan bcrypt
2. Update di MongoDB `users` collection
3. Deploy changes

```javascript
// Generate hashed password (Node.js console)
const bcrypt = require('bcryptjs');
const password = 'newpassword123';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

---

## 🗄️ MongoDB Collections

Quick reference untuk database structure:

### Collections yang Harus Dibuat:
```javascript
// articles - untuk menyimpan berita
db.createCollection("articles")

// members - untuk menyimpan anggota
db.createCollection("members")

// organization-structure - untuk struktur organisasi
db.createCollection("organization-structure")

// contact-messages - untuk pesan kontak
db.createCollection("contact-messages")

// users - untuk admin users
db.createCollection("users")
```

---

## 🔧 Environment Variables Checklist

Pastikan semua variable sudah diset:

- ✅ `MONGODB_URI` - MongoDB connection string
- ✅ `GOOGLE_CLIENT_ID` - Google OAuth ID
- ✅ `GOOGLE_CLIENT_SECRET` - Google OAuth Secret
- ✅ `JWT_SECRET` - JWT signing secret (min 32 chars)
- ✅ `SMTP_HOST` - Email SMTP server
- ✅ `SMTP_PORT` - Email SMTP port
- ✅ `SMTP_USER` - Email username
- ✅ `SMTP_PASSWORD` - Email password
- ✅ `API_BASE` - API base URL
- ✅ `SITE_URL` - Website base URL

---

## 🎨 Customization

### Mengubah Warna
Edit Tailwind colors di `tailwind.config.js` (jika ada) atau use Tailwind classes di components.

**Current Colors:**
- Primary: `amber-600` (Orange/Brown)
- Secondary: `gray-800`
- Accent: `yellow-400`

### Mengubah Logo & Branding
1. Replace logo di `public/images/`
2. Update `layouts/default.vue` dengan logo baru
3. Update meta tags di `nuxt.config.ts`

### Mengubah Konten Organisasi
1. Login ke Admin Dashboard
2. Klik "Struktur Organisasi"
3. Edit informasi organisasi
4. Simpan perubahan

---

## 🐛 Common Errors & Solutions

### Error: "Cannot find MongoDB"
```
Solution:
1. Check MONGODB_URI di .env.local
2. Pastikan IP Anda whitelisted di MongoDB Atlas
3. Verifikasi username dan password
```

### Error: "JWT token expired"
```
Solution:
1. Login kembali
2. Refresh page
3. Clear browser cookies dan login lagi
```

### Error: "Build fails on Vercel"
```
Solution:
1. Check Vercel logs
2. Pastikan package.json build script benar
3. Verify environment variables di Vercel
```

---

## ✅ Pre-Deployment Checklist

- [ ] Semua environment variables sudah diset
- [ ] MongoDB database sudah ready
- [ ] Admin user sudah dibuat
- [ ] Google OAuth configured (jika digunakan)
- [ ] SMTP email configured
- [ ] Homepage content sudah diisi
- [ ] Navigation links sudah benar
- [ ] Footer information sudah updated
- [ ] Website sudah di-test di localhost
- [ ] Code sudah di-commit ke GitHub
- [ ] README sudah lengkap

---

## 📱 Testing Checklist

### Desktop Testing
- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Admin login works
- [ ] Admin dashboard displays

### Mobile Testing
- [ ] Responsive design works
- [ ] Touch targets are adequate
- [ ] Images load correctly
- [ ] Forms are usable on mobile

### Feature Testing
- [ ] Can view articles
- [ ] Can view organization structure
- [ ] Can submit contact form
- [ ] Admin can create articles
- [ ] Admin can manage structure

---

## 📞 Contact for Support

Website: https://sastrojendro.id  
Email: info@sastrojendro.id  
Phone: +62 (274) 312-3456

---

## 📚 Documentation Files

1. **README.md** - Main documentation & setup guide
2. **DEPLOYMENT.md** - Detailed deployment instructions
3. **FEATURES.md** - All features & additional development
4. **QUICKSTART.md** - This file!

---

## 🎓 Next Steps

1. **Setup**: Follow README.md
2. **Customize**: Update content via admin dashboard
3. **Test**: Test all features locally
4. **Deploy**: Follow DEPLOYMENT.md
5. **Monitor**: Check Vercel dashboard

---

**You're all set!** 🎉 Happy development!
