# MongoDB Setup & Connection Guide

## ✅ Completed Setup Steps

Your MongoDB connection is now ready! Here's what has been set up:

### 1. **Environment Configuration**
✓ `.env.local` created with your MongoDB connection string
✓ JWT secret configured
✓ Node environment set to development

### 2. **Utility Functions Created**
✓ `server/utils/db.ts` - MongoDB connection management
✓ `server/utils/password.ts` - Password hashing with bcryptjs
✓ `server/utils/jwt.ts` - Token generation and verification
✓ `server/utils/validation.ts` - Input validation schemas with Zod

### 3. **API Endpoints Updated with MongoDB**
✓ `POST /api/auth/register-member` - Now uses MongoDB for registration
✓ `POST /api/auth/member-login` - Now uses MongoDB for authentication
✓ `GET /api/auth/member-me` - Now retrieves from MongoDB
✓ `GET /api/members/profile` - Now retrieves member profile from MongoDB

### 4. **Dependencies Added**
✓ `zod` - Input validation library added to package.json
✓ All other dependencies already included: mongodb, bcryptjs, jsonwebtoken

---

## 🚀 Next Steps

### Step 1: Initialize Database Collections
Run this command to create collections and indexes:

```bash
npx tsx scripts/init-db.ts
```

Or add this script to `package.json`:
```json
"scripts": {
  "db:init": "tsx scripts/init-db.ts"
}
```

Then run:
```bash
npm run db:init
```

### Step 2: Test MongoDB Connection in VS Code

1. **Open MongoDB Playground** in VS Code:
   - Look for `test-mongodb.mongodb` in the file explorer
   - Right-click and select "Run All Commands in Playground"

2. **Expected Output:**
   ```
   ✓ Connected to MongoDB
   ✓ Members collection exists
   ... (other collections)
   ✓ Database setup complete!
   ```

### Step 3: Create Initial Admin User (Optional)

Create a script `scripts/create-admin.ts`:

```typescript
import { MongoClient } from 'mongodb'
import { hashPassword } from '../server/utils/password'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://juan:Juan11@@@sastro.tsbfaub.mongodb.net/SastroJendro'

async function createAdmin() {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('SastroJendro')
    
    const hashedPassword = await hashPassword('admin123')
    
    const result = await db.collection('users').insertOne({
      name: 'Super Admin',
      email: 'superadmin@sastrojendro.id',
      password: hashedPassword,
      role: 'superadmin',
      active: true,
      joinedAt: new Date()
    })
    
    console.log('✓ Super admin created:', result.insertedId)
  } finally {
    await client.close()
  }
}

createAdmin()
```

---

## 🔧 How to Use Updated API Endpoints

### Register Member

```bash
curl -X POST http://localhost:3000/api/auth/register-member \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123",
    "phone": "+62812345678",
    "birthDate": "1990-01-15",
    "address": "Jl. Test 123",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "interests": ["Seni Tradisional"],
    "experience": "Saya adalah penggemar seni tradisional"
  }'
```

### Login Member

```bash
curl -X POST http://localhost:3000/api/auth/member-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "rememberMe": false
  }'
```

### Get Current Member

```bash
curl http://localhost:3000/api/auth/member-me \
  -H "Cookie: member-token=YOUR_TOKEN_HERE"
```

### Get Member Profile

```bash
curl http://localhost:3000/api/members/profile \
  -H "Cookie: member-token=YOUR_TOKEN_HERE"
```

---

## 🔍 Testing in VS Code

### 1. Use REST Client Extension (Recommended)

Install extension: REST Client (humao.rest-client)

Create `test-api.http`:

```http
### Register Member
POST http://localhost:3000/api/auth/register-member
Content-Type: application/json

{
  "fullName": "Test Member",
  "email": "test@example.com",
  "username": "testmember",
  "password": "Test123!!",
  "phone": "+62812345678",
  "birthDate": "1995-05-15",
  "address": "Jl. Test 123",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "interests": ["Seni", "Budaya"],
  "experience": "Passionate about cultural arts"
}

### Login Member
POST http://localhost:3000/api/auth/member-login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!!",
  "rememberMe": false
}

### Get Current Member
GET http://localhost:3000/api/auth/member-me
```

Click "Send Request" next to each request to test.

---

## 🛡️ Security Notes

1. **CHANGE JWT_SECRET**: Update `.env.local` with a strong secret for production
2. **CHANGE DATABASE PASSWORD**: Your MongoDB password is in `.env.local` - keep it safe!
3. **USE HTTPS**: Always use HTTPS in production
4. **RATE LIMITING**: Add rate limiting to /api/auth/* endpoints

---

## ⚙️ Remaining API Endpoints to Update

Still need MongoDB integration:

- [ ] POST /api/auth/superadmin-login
- [ ] POST /api/auth/login (admin login)
- [ ] POST /api/auth/member-logout
- [ ] POST /api/admin/members/verify
- [ ] POST /api/admin/members/reject
- [ ] All content APIs (articles, members list, etc.)

You can follow the same pattern used in the 4 updated endpoints above.

---

## 📊 Check Database Status

### List All Members
```bash
# In MongoDB Compass or mongodb shell
use SastroJendro
db.members.find()
```

### Get Pending Members Awaiting Verification
```bash
db.members.find({ status: "pending" })
```

### Get Verified Members
```bash
db.members.find({ status: "verified" })
```

---

## 🆘 Troubleshooting

### Connection Error: "MONGODB_URI environment variable not set"
→ Make sure `.env.local` exists and has the correct connection string

### Duplicate Key Error
→ This means the email/username already exists in the database
→ Delete the duplicate or use a different email

### Token Verification Failed
→ The JWT_SECRET might have changed
→ Make sure all instances use the same JWT_SECRET

### Cannot Create Collection
→ You may not have permission in MongoDB Atlas
→ Check your database user permissions

---

## 📝 Environment Variables Reference

```env
# Database
MONGODB_URI=mongodb+srv://juan:Juan11@@@sastro.tsbfaub.mongodb.net/SastroJendro?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRATION=7d

# Environment
NODE_ENV=development
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB connection established
- [ ] Collections created (members, articles, users, organization_structure, activities)
- [ ] Indexes created on email and username
- [ ] Registered a test member (POST /api/auth/register-member)
- [ ] Member appears in MongoDB with status='pending'
- [ ] Login attempt with unverified member shows correct error
- [ ] Member can be queried from MongoDB
- [ ] GET /api/auth/member-me returns correct member data

---

## 📚 Documentation

- [DATABASE.md](../DATABASE.md) - Complete database schema
- [MONGODB_INTEGRATION.md](../MONGODB_INTEGRATION.md) - Integration examples
- [IMPLEMENTATION_CHECKLIST.md](../IMPLEMENTATION_CHECKLIST.md) - Task tracking

---

**Status**: MongoDB integration started ✓
**Connected Endpoints**: 4/7 core endpoints
**Next Priority**: Verify member system works end-to-end

Need help? Check the troubleshooting guide above or review DATABASE.md for more details.
