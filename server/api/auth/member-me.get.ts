import { connectDB } from '~/server/utils/db'
import { verifyToken } from '~/server/utils/jwt'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'member-token')

    if (!token) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      }))
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      }))
    }

    // Connect to database
    const db = await connectDB()
    const member = await db.collection('members').findOne({
      _id: new ObjectId(decoded.id)
    }) as any

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
    console.error('Member me error:', error)
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    }))
  }
})
