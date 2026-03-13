# Database Setup Guide

This project uses MongoDB to store all data including members, articles, organization structure, and admin users. This guide explains how to set up and connect MongoDB to the Sastro Jendro website.

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended for Vercel Deployment)

MongoDB Atlas is a cloud-hosted MongoDB service that integrates seamlessly with Vercel.

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new project named "Sastro Jendro"

2. **Create a Database Cluster**
   - Select "Create a Database"
   - Choose "M0 Shared" (free tier)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Go to "Database Access" tab
   - Click "Add New Database User"
   - Create username: `sastro_admin`
   - Create password: (generate a strong one)
   - Set user permissions: "Admin"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" tab
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - Note: For production, restrict to Vercel IPs

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Select "Drivers" → "Node.js"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Option 2: Local MongoDB

For development/testing:

```bash
# Install MongoDB Compass (GUI)
# or install mongod locally (macOS):
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Default connection: mongodb://localhost:27017
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://sastro_admin:YOUR_PASSWORD@cluster.mongodb.net/SastroJendro?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRATION=7d
```

For Vercel deployment, add these environment variables in your Vercel project settings.

## Database Collections

### 1. members
Stores registered organizational members.

```javascript
{
  _id: ObjectId,
  memberId: "SJ-2024-001",           // Generated on verification
  fullName: "Nama Lengkap",
  email: "member@example.com",
  username: "username",
  password: "hashed_password",       // bcryptjs hashed
  phone: "+62812345678",
  birthDate: "1990-01-15",
  address: "Jl. Raya No. 123",
  city: "Jakarta",
  province: "DKI Jakarta",
  interests: ["Seni Tradisional", "Budaya"],
  experience: "Member description/bio",
  status: "verified",                // pending, verified, rejected
  membershipType: "regular",         // regular, lifetime, honorary
  rejectionReason: null,             // Only if status is rejected
  joinedAt: ISODate("2024-01-15"),
  verifiedAt: ISODate("2024-01-20"),
  cardImageUrl: "https://...",
  cardDownloadCount: 0,
  lastLogin: ISODate("2024-01-25")
}
```

### 2. articles
Stores news and blog posts.

```javascript
{
  _id: ObjectId,
  title: "Judul Artikel",
  slug: "judul-artikel",
  content: "Konten artikel...",
  excerpt: "Ringkasan singkat...",
  author: "Nama Penulis",
  category: "Berita",             // Berita, Blog, Pengumuman
  imageUrl: "https://...",
  published: true,
  createdAt: ISODate("2024-01-15"),
  updatedAt: ISODate("2024-01-20"),
  views: 150,
  featured: false
}
```

### 3. organization_structure
Stores organizational hierarchy and member roles.

```javascript
{
  _id: ObjectId,
  name: "Posisi/Jabatan",
  rank: 1,                          // Display order
  description: "Deskripsi posisi",
  department: "Departemen",
  members: [
    {
      memberId: "SJ-2024-001",
      name: "Nama Anggota",
      imageUrl: "https://..."
    }
  ],
  createdAt: ISODate("2024-01-15"),
  updatedAt: ISODate("2024-01-20")
}
```

### 4. users (Admin/Super Admin)
Stores admin and super admin accounts.

```javascript
{
  _id: ObjectId,
  name: "Nama Admin",
  email: "admin@sastrojendro.id",
  password: "hashed_password",       // bcryptjs hashed
  role: "admin",                     // admin, superadmin, moderator, viewer
  permissions: ["users:write", "articles:write", ...],
  active: true,
  lastLogin: ISODate("2024-01-25"),
  joinedAt: ISODate("2024-01-15"),
  createdBy: "superadmin_id"
}
```

## Creating Collections

### Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Create database: `SastroJendro`
4. Create collections: `members`, `articles`, `organization_structure`, `users`

### Using MongoDB Shell
```javascript
use SastroJendro

// Create collections with validation
db.createCollection("members", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "fullName", "username"],
      properties: {
        email: { bsonType: "string" },
        fullName: { bsonType: "string" },
        username: { bsonType: "string" }
      }
    }
  }
})

db.createCollection("articles")
db.createCollection("organization_structure")
db.createCollection("users")

// Create indexes for faster queries
db.members.createIndex({ email: 1 }, { unique: true })
db.members.createIndex({ username: 1 }, { unique: true })
db.members.createIndex({ memberId: 1 })
db.articles.createIndex({ slug: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
```

## Initializing Super Admin

Create first super admin user:

```javascript
// In MongoDB Shell or via API
db.users.insertOne({
  name: "Super Admin",
  email: "superadmin@sastrojendro.id",
  password: "bcrypt_hashed_password", // Use bcryptjs to hash password
  role: "superadmin",
  permissions: ["*"],                 // Full access
  active: true,
  joinedAt: new Date()
})
```

## API Endpoints Connected to Database

All following endpoints need MongoDB integration:

### Authentication
- `POST /api/auth/register-member` - Register new member
- `POST /api/auth/member-login` - Member login
- `POST /api/auth/login` - Admin login
- `POST /api/auth/superadmin-login` - Super admin login
- `GET /api/auth/member-me` - Get current member
- `GET /api/auth/admin-me` - Get current admin

### Members
- `GET /api/members/profile` - Get member profile
- `PUT /api/members/profile` - Update member profile
- `GET /api/members` - Get all members (admin view)
- `POST /api/admin/members/verify` - Verify member (super admin)
- `POST /api/admin/members/reject` - Reject member (super admin)

### Articles
- `GET /api/articles` - Get all articles (paginated)
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (admin)
- `PUT /api/articles/:id` - Update article (admin)
- `DELETE /api/articles/:id` - Delete article (super admin)

## Example MongoDB Queries

```javascript
// Find member by email
db.members.findOne({ email: "member@example.com" })

// Find all verified members
db.members.find({ status: "verified" })

// Find pending member registrations
db.members.find({ status: "pending" })

// Get articles by category
db.articles.find({ category: "Berita", published: true }).sort({ createdAt: -1 })

// Count total members by status
db.members.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Get admin users with super admin role
db.users.find({ role: "superadmin" })

// Update member verification
db.members.updateOne(
  { _id: ObjectId("...") },
  {
    $set: {
      status: "verified",
      memberId: "SJ-2024-001",
      verifiedAt: new Date()
    }
  }
)
```

## Security Best Practices

1. **Password Hashing**
   - Use `bcryptjs` library
   - Never store plain passwords
   - Salt rounds: 10

2. **JWT Tokens**
   - Store in HTTP-only cookies
   - Set `Secure` flag for HTTPS only
   - Set `SameSite=Strict`
   - Expiration: 7 days for members, 1 day for admins

3. **Rate Limiting**
   - Implement on `/api/auth/login` endpoints
   - Prevent brute force attacks

4. **Input Validation**
   - Validate all input on API endpoints
   - Use `zod` or `joi` for schema validation
   - Sanitize user input

5. **Database Index**
   - Create indexes on frequently queried fields
   - Email and username should be unique

## Monitoring & Backups

### MongoDB Atlas Monitoring
1. Go to "Monitoring" tab in your cluster
2. Set up alerts for disk usage, connections
3. Enable backup snapshots (daily/weekly)

### Regular Backups
```bash
# Backup local MongoDB
mongodump --db SastroJendro --out ./backups/

# Restore from backup
mongorestore --db SastroJendro ./backups/SastroJendro/
```

## Troubleshooting

### Connection Issues
```javascript
// Test connection in API route
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
await client.connect()
console.log("Connected to MongoDB")
```

### Duplicate Key Error
```javascript
// Drop existing unique index
db.members.dropIndex("email_1")

// Verify no duplicates, then recreate
db.members.createIndex({ email: 1 }, { unique: true })
```

### Authentication Failure
- Verify MongoDB user credentials
- Check IP whitelist in Network Access
- Ensure database user has proper permissions

## Next Steps

1. Set up MongoDB Atlas account with connection string
2. Add `MONGODB_URI` to `.env.local`
3. Update API endpoints to use real MongoDB queries (currently mocked)
4. Implement bcryptjs password hashing
5. Implement JWT token generation/verification
6. Test full authentication flows

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose ODM](https://mongoosejs.com/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
