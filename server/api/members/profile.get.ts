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

    // Get recent activities
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
      recentActivities: activities.map(a => ({
        type: a.type,
        description: a.description,
        createdAt: a.createdAt
      }))
    }
  } catch (error) {
    console.error('Member profile error:', error)
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    }))
  }
})
