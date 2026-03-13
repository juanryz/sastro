import jwt from 'jsonwebtoken'

export interface TokenPayload {
  id: string
  email: string
  role?: string
}

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET || 'secret'
  const expiresIn = process.env.JWT_EXPIRATION || '7d'
  
  return jwt.sign(payload, secret, {
    expiresIn
  })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'secret'
    return jwt.verify(token, secret) as TokenPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
