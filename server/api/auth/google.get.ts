import { OAuth2Client } from 'google-auth-library'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL || `${event.node.req.headers.host?.startsWith('localhost') ? 'http' : 'https'}://${event.node.req.headers.host}/api/auth/google/callback`

  const oauth2Client = new OAuth2Client(
    config.googleClientId,
    config.googleClientSecret,
    callbackUrl
  )

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['openid', 'email', 'profile']
  })

  return sendRedirect(event, authUrl)
})