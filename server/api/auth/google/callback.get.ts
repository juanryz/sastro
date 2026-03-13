import { OAuth2Client } from 'google-auth-library'
import { connectDB } from '~/server/utils/db'
import { generateToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL || `${event.node.req.headers.host?.startsWith('localhost') ? 'http' : 'https'}://${event.node.req.headers.host}/api/auth/google/callback`;

  const oauth2Client = new OAuth2Client(
    config.googleClientId,
    config.googleClientSecret,
    callbackUrl
  )

  const query = getQuery(event)
  const code = Array.isArray(query.code) ? query.code[0] : query.code

  if (!code) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing code' }))
  }

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token || '',
      audience: config.googleClientId
    })
    const payload = ticket.getPayload()

    if (!payload?.email) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Unable to retrieve email from Google' }))
    }

    const db = await connectDB()
    const users = db.collection('users')

    const existing = await users.findOne({ email: payload.email })

    const user = existing
      ? existing
      : {
          name: payload.name || payload.email,
          email: payload.email,
          role: 'admin',
          active: true,
          joinedAt: new Date(),
          createdAt: new Date()
        }

    if (!existing) {
      await users.insertOne(user)
    }

    const token = generateToken({
      id: (existing?._id as any)?.toString() || (user as any)._id?.toString() || '',
      email: user.email,
      role: user.role || 'admin'
    })

    setCookie(event, 'admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })

    setCookie(event, 'admin-role', 'admin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })

    return sendRedirect(event, '/admin')
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Google OAuth failed' }))
  }
})