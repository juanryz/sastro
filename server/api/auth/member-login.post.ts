import { connectDB } from '~/server/utils/db'
import { verifyPassword } from '~/server/utils/password'
import { generateToken } from '~/server/utils/jwt'
import { memberLoginSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate input
    const validated = memberLoginSchema.parse(body)
    
    // Connect to database
    const db = await connectDB()
    const membersCollection = db.collection('members')
    
    // Find member by email or username
    const member = await membersCollection.findOne({
      $or: [
        { email: validated.email },
        { username: validated.email }
      ]
    }) as any
    
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
    
    if (error.name === 'ZodError') {
      return {
        success: false,
        message: 'Data tidak valid'
      }
    }
    
    return {
      success: false,
      message: 'Terjadi kesalahan saat login'
    }
  }
})
