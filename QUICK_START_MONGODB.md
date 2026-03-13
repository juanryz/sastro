# Quick Reference - MongoDB Setup & Testing

## 🚀 Get Started in 3 Commands

```bash
# 1. Initialize MongoDB collections and indexes
npm run db:init

# 2. Start development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

---

## 📋 Essential Commands

### Initialize Database
```bash
npx tsx scripts/init-db.ts
```

### Start Development Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

### Run Tests (when set up)
```bash
npm run test
```

### Production Build
```bash
npm run build
npm run start
```

---

## 🧪 Test API Endpoints

### 1. Register a New Member
```bash
curl -X POST http://localhost:3000/api/auth/register-member \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test123@example.com",
    "username": "testuser123",
    "password": "TestPassword123!",
    "phone": "+62812345678",
    "birthDate": "1995-06-15",
    "address": "Jl. Test Street 123",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "interests": ["Seni Tradisional", "Budaya"],
    "experience": "Passionate member"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registrasi berhasil! Tunggu verifikasi admin.",
  "memberId": "507f1f77bcf86cd799439011"
}
```

### 2. Verify Member (Manual - via MongoDB Compass)
1. Open MongoDB Compass
2. Find the member you just created
3. Update `status` from `"pending"` to `"verified"`

Or use MongoDB Shell:
```bash
db.members.updateOne(
  { email: "test123@example.com" },
  { $set: { status: "verified", memberId: "SJ-2024-001" } }
)
```

### 3. Login as Member
```bash
curl -X POST http://localhost:3000/api/auth/member-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test123@example.com",
    "password": "TestPassword123!",
    "rememberMe": false
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "member": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Test User",
    "email": "test123@example.com",
    "memberId": "SJ-2024-001",
    "membershipType": "regular"
  }
}
```

### 4. Get Current Member Info
```bash
curl http://localhost:3000/api/auth/member-me \
  -H "Cookie: member-token=eyJhbGc..."
```

**Expected Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "Test User",
  "email": "test123@example.com",
  "memberId": "SJ-2024-001",
  "membershipType": "regular",
  "status": "verified"
}
```

### 5. Get Full Member Profile
```bash
curl http://localhost:3000/api/members/profile \
  -H "Cookie: member-token=eyJhbGc..."
```

**Expected Response:**
```json
{
  "memberId": "SJ-2024-001",
  "fullName": "Test User",
  "email": "test123@example.com",
  "phone": "+62812345678",
  "birthDate": "1995-06-15",
  "address": "Jl. Test Street 123",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "interests": ["Seni Tradisional", "Budaya"],
  "experience": "Passionate member",
  "joinedAt": "2026-03-14T...",
  "status": "verified",
  "membershipType": "regular",
  "cardDownloadCount": 0,
  "lastLogin": "2026-03-14T...",
  "recentActivities": []
}
```

---

## 🔍 MongoDB Queries

### View All Members
```bash
# In MongoDB Compass or Shell
db.members.find()
```

### View Pending Members
```bash
db.members.find({ status: "pending" })
```

### View Verified Members
```bash
db.members.find({ status: "verified" })
```

### Verify a Member
```bash
db.members.updateOne(
  { _id: ObjectId("...") },
  { $set: { status: "verified", memberId: "SJ-2024-001", verifiedAt: new Date() } }
)
```

### Delete a Member (if needed)
```bash
db.members.deleteOne({ email: "test123@example.com" })
```

---

## 🔧 Environment Variables

Your `.env.local` file contains:

```env
MONGODB_URI=mongodb+srv://juan:Juan11@@@sastro.tsbfaub.mongodb.net/SastroJendro?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRATION=7d
```

⚠️ **Important**: Change `JWT_SECRET` for production!

---

## 📱 Test in VS Code

### Using REST Client Extension

1. Install **REST Client** extension (humao.rest-client)
2. Create file: `test-api.http`
3. Copy-paste the curl commands above (remove `curl -X POST` and URL headers)
4. Click "Send Request" to test

Example `test-api.http`:
```http
### Register Member
POST http://localhost:3000/api/auth/register-member
Content-Type: application/json

{
  "fullName": "New Member",
  "email": "newmember@example.com",
  "username": "newmember",
  "password": "Test123!!",
  "phone": "+62812345678",
  "birthDate": "1995-05-15",
  "address": "Jl. Test 123",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "interests": ["Seni"],
  "experience": "Test"
}

### Get Member Profile (after login)
GET http://localhost:3000/api/members/profile
```

---

## ✅ Success Indicators

When everything works:

- ✅ Register endpoint returns success + memberId
- ✅ New member found in MongoDB with status='pending'
- ✅ After verification, login succeeds with JWT token
- ✅ Token-based endpoints return member data
- ✅ Profile endpoint shows complete member info

---

## ❌ Common Issues & Fixes

### "MONGODB_URI not set"
```bash
# Check .env.local exists
ls -la .env.local

# Check it has the connection string
cat .env.local
```

### "Cannot connect to MongoDB"
```bash
# Test your connection string in MongoDB Compass
# Or run the test playground:
# Open test-mongodb.mongodb and run
```

### "Duplicate key error"
```bash
# Member already exists, register with different email
# Or delete the member:
db.members.deleteOne({ email: "test@example.com" })
```

### "Token verification failed"
```bash
# JWT_SECRET might have changed
# Check .env.local has consistent JWT_SECRET
```

---

## 📚 Documentation Files

- **MONGODB_SETUP.md** - Detailed setup guide
- **MONGODB_INTEGRATION_COMPLETE.md** - What's been completed
- **DATABASE.md** - Database schema reference
- **MONGODB_INTEGRATION.md** - API examples
- **IMPLEMENTATION_CHECKLIST.md** - Task tracking

---

## 🚨 Important Reminders

1. **Save your MongoDB connection string** - It's in `.env.local`
2. **Never commit `.env.local`** - Contains credentials
3. **Use strong passwords** - Minimum 8 characters recommended
4. **Change JWT_SECRET** - Before deploying to production
5. **Enable network restrictions** - MongoDB Atlas security

---

## 📞 Support

For issues:
1. Check error logs in terminal
2. Review MONGODB_SETUP.md troubleshooting
3. Verify MongoDB connection in MongoDB Compass
4. Check `.env.local` for correct configuration

---

**Last Updated**: 2026-03-14
**Status**: Ready for testing ✅
