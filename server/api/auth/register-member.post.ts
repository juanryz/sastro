import { connectDB } from '~/server/utils/db'
import { hashPassword } from '~/server/utils/password'
import { memberRegistrationSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate input
    const validated = memberRegistrationSchema.parse(body)
    
    // Connect to database
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
        message: existing.email === validated.email 
          ? 'Email sudah terdaftar' 
          : 'Username sudah terdaftar'
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
      memberId: result.insertedId.toString()
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
