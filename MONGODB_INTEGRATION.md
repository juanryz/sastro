# MongoDB Integration Guide

This file provides example implementations for connecting the existing API endpoints to MongoDB.

## Installation

Add required packages to your project:

```bash
npm install mongodb bcryptjs jsonwebtoken zod
```

## Setup Database Connection

Create `server/utils/db.ts`:

```typescript
import { MongoClient, Db } from 'mongodb'

let db: Db | null = null

export async function connectDB(): Promise<Db> {
  if (db) return db

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI environment variable not set')
  }

  const client = new MongoClient(uri)
  await client.connect()
  db = client.db('SastroJendro')
  
  console.log('Connected to MongoDB')
  return db
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not connected')
  }
  return db
}
```

## Password Hashing Utility

Create `server/utils/password.ts`:

```typescript
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
```

## JWT Utility

Create `server/utils/jwt.ts`:

```typescript
import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: string
  email: string
  role?: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRATION || '7d'
  })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as TokenPayload
  } catch (error) {
    return null
  }
}
```

## Input Validation

Create `server/utils/validation.ts`:

```typescript
import { z } from 'zod'

export const memberRegistrationSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
  phone: z.string(),
  birthDate: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  interests: z.array(z.string()),
  experience: z.string()
})

export const memberLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional()
})

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
```

## Example API Implementations

### 1. Member Registration

Update `server/api/auth/register-member.post.ts`:

```typescript
import { connectDB } from '~/server/utils/db'
import { hashPassword } from '~/server/utils/password'
import { memberRegistrationSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate input
    const validated = memberRegistrationSchema.parse(body)
    
    const db = await connectDB()
    const membersCollection = db.collection('members')
    
    // Check for existing email/username
    const existing = await membersCollection.findOne({
      $or: [
        { email: validated.email },
        { username: validated.username }
      ]
    })
    
    if (existing) {
      return {
        success: false,
        message: 'Email atau username sudah terdaftar'
      }
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validated.password)
    
    // Create new member
    const result = await membersCollection.insertOne({
      ...validated,
      password: hashedPassword,
      status: 'pending',
      membershipType: 'regular',
      joinedAt: new Date(),
      cardDownloadCount: 0
    })
    
    return {
      success: true,
      message: 'Registrasi berhasil! Tunggu verifikasi admin.',
      memberId: result.insertedId
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.name === 'ZodError') {
      return {
        success: false,
        message: 'Data tidak valid',
        errors: error.errors
      }
    }
    
    return {
      success: false,
      message: 'Terjadi kesalahan saat registrasi'
    }
  }
})
```

### 2. Member Login

Update `server/api/auth/member-login.post.ts`:

```typescript
import { connectDB } from '~/server/utils/db'
import { verifyPassword } from '~/server/utils/password'
import { generateToken } from '~/server/utils/jwt'
import { memberLoginSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate input
    const validated = memberLoginSchema.parse(body)
    
    const db = await connectDB()
    const membersCollection = db.collection('members')
    
    // Find member by email or username
    const member = await membersCollection.findOne({
      $or: [
        { email: validated.email },
        { username: validated.email }
      ]
    })
    
    if (!member) {
      return {
        success: false,
        message: 'Email atau password salah'
      }
    }
    
    // Check if member is verified
    if (member.status !== 'verified') {
      return {
        success: false,
        message: 'Akun Anda belum diverifikasi oleh admin'
      }
    }
    
    // Verify password
    const passwordMatch = await verifyPassword(validated.password, member.password)
    if (!passwordMatch) {
      return {
        success: false,
        message: 'Email atau password salah'
      }
    }
    
    // Generate token
    const token = generateToken({
      id: member._id.toString(),
      email: member.email,
      role: 'member'
    })
    
    // Update last login
    await membersCollection.updateOne(
      { _id: member._id },
      { $set: { lastLogin: new Date() } }
    )
    
    // Set cookie
    const expiresIn = validated.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
    setCookie(event, 'member-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: expiresIn
    })
    
    return {
      success: true,
      token,
      member: {
        id: member._id.toString(),
        fullName: member.fullName,
        email: member.email,
        memberId: member.memberId,
        membershipType: member.membershipType
      }
    }
  } catch (error: any) {
    console.error('Login error:', error)
    
    return {
      success: false,
      message: 'Terjadi kesalahan saat login'
    }
  }
})
```

### 3. Get Current Member

Update `server/api/auth/member-me.get.ts`:

```typescript
import { connectDB } from '~/server/utils/db'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'member-token')
    if (!token) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      }))
    }
    
    // Verify token and extract member ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    
    const db = await connectDB()
    const member = await db.collection('members').findOne({
      _id: new ObjectId(decoded.id)
    })
    
    if (!member) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'Member not found'
      }))
    }
    
    return {
      id: member._id.toString(),
      fullName: member.fullName,
      email: member.email,
      memberId: member.memberId,
      membershipType: member.membershipType,
      status: member.status
    }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    }))
  }
})
```

### 4. Member Profile

Update `server/api/members/profile.get.ts`:

```typescript
import { connectDB } from '~/server/utils/db'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'member-token')
    if (!token) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      }))
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    
    const db = await connectDB()
    const member = await db.collection('members').findOne({
      _id: new ObjectId(decoded.id)
    })
    
    if (!member) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'Member not found'
      }))
    }
    
    // Get member activities (logins, downloads, etc.)
    const activities = await db.collection('activities')
      .find({ memberId: member._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()
    
    return {
      memberId: member.memberId,
      fullName: member.fullName,
      email: member.email,
      phone: member.phone,
      birthDate: member.birthDate,
      address: member.address,
      city: member.city,
      province: member.province,
      interests: member.interests,
      experience: member.experience,
      joinedAt: member.joinedAt,
      status: member.status,
      membershipType: member.membershipType,
      cardDownloadCount: member.cardDownloadCount,
      lastLogin: member.lastLogin,
      // Activities for display
      recentActivities: activities.map(a => ({
        type: a.type,
        description: a.description,
        createdAt: a.createdAt
      }))
    }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    }))
  }
})
```

### 5. Super Admin Login

Update `server/api/auth/superadmin-login.post.ts`:

```typescript
import { connectDB } from '~/server/utils/db'
import { verifyPassword } from '~/server/utils/password'
import { generateToken } from '~/server/utils/jwt'
import { adminLoginSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const validated = adminLoginSchema.parse(body)
    
    const db = await connectDB()
    const usersCollection = db.collection('users')
    
    // Find user with super admin role
    const admin = await usersCollection.findOne({
      email: validated.email,
      role: 'superadmin'
    })
    
    if (!admin) {
      return {
        success: false,
        message: 'Email atau password salah'
      }
    }
    
    if (!admin.active) {
      return {
        success: false,
        message: 'Akun admin tidak aktif'
      }
    }
    
    // Verify password
    const passwordMatch = await verifyPassword(validated.password, admin.password)
    if (!passwordMatch) {
      return {
        success: false,
        message: 'Email atau password salah'
      }
    }
    
    // Generate token
    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
      role: 'superadmin'
    })
    
    // Update last login
    await usersCollection.updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date() } }
    )
    
    // Set cookies
    setCookie(event, 'admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    })
    
    setCookie(event, 'admin-role', 'superadmin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000
    })
    
    return {
      success: true,
      token,
      role: 'superadmin',
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email
      }
    }
  } catch (error: any) {
    console.error('Super admin login error:', error)
    
    return {
      success: false,
      message: 'Email atau password salah'
    }
  }
})
```

### 6. Verify Member (Super Admin)

Create `server/api/admin/members/verify.post.ts`:

```typescript
import { connectDB } from '~/server/utils/db'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    // Check if super admin
    const adminRole = getCookie(event, 'admin-role')
    if (adminRole !== 'superadmin') {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Access denied'
      }))
    }
    
    const { memberId } = await readBody(event)
    
    const db = await connectDB()
    const membersCollection = db.collection('members')
    
    // Generate verification ID
    const count = await membersCollection.countDocuments({ status: 'verified' })
    const verificationId = `SJ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`
    
    const result = await membersCollection.updateOne(
      { _id: new ObjectId(memberId) },
      {
        $set: {
          status: 'verified',
          memberId: verificationId,
          verifiedAt: new Date()
        }
      }
    )
    
    if (result.matchedCount === 0) {
      return {
        success: false,
        message: 'Member tidak ditemukan'
      }
    }
    
    return {
      success: true,
      message: 'Member berhasil diverifikasi',
      memberId: verificationId
    }
  } catch (error: any) {
    console.error('Member verification error:', error)
    
    return {
      success: false,
      message: 'Terjadi kesalahan saat verifikasi'
    }
  }
})
```

## Migration from Mock Data

To migrate existing mock implementations:

1. Install MongoDB driver and bcryptjs
2. Copy utility files (db.ts, password.ts, jwt.ts, validation.ts)
3. Update each API endpoint following examples above
4. Test each endpoint with MongoDB connection
5. Add error handling and logging
6. Update environment variables

## Testing

```javascript
// Test member registration
POST /api/auth/register-member
{
  "fullName": "Test User",
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123",
  "phone": "+62812345678",
  "birthDate": "1990-01-15",
  "address": "Jl. Test 123",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "interests": ["Seni Tradisional"],
  "experience": "Test bio"
}

// Test member login
POST /api/auth/member-login
{
  "email": "test@example.com",
  "password": "password123",
  "rememberMe": false
}

// Test get current member (with valid token)
GET /api/auth/member-me
```

## Next Steps

1. Create the utility files in `server/utils/`
2. Update each API endpoint incrementally
3. Test thoroughly with MongoDB
4. Set up logging and monitoring
5. Deploy to Vercel with MongoDB Atlas connection
