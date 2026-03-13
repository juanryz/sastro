// POST: Login
export default defineEventHandler(async (event) => {
  if (getMethod(event) === 'POST') {
    const { email, password } = await readBody(event)

    try {
      // TODO: Connect to MongoDB and find user
      // Verify password with bcrypt
      // Generate JWT token
      // const user = await db.collection('users')
      //   .findOne({ email })
      //
      // if (!user || !await bcrypt.compare(password, user.password)) {
      //   throw createError({
      //     statusCode: 401,
      //     statusMessage: 'Invalid email or password'
      //   })
      // }
      //
      // const token = jwt.sign(
      //   { userId: user._id, email: user.email },
      //   process.env.JWT_SECRET
      // )

      // Mock successful login
      setCookie(event, 'auth-token', 'mock-token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return {
        success: true,
        message: 'Login successful',
        token: 'mock-token',
        user: {
          id: '1',
          name: 'Admin',
          email: email
        }
      }
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Login failed'
      })
    }
  }
})
