// POST: Super Admin Login
export default defineEventHandler(async (event) => {
  if (getMethod(event) === 'POST') {
    const { email, password } = await readBody(event)

    try {
      // TODO: Connect to MongoDB and verify super admin
      // const admin = await db.collection('users')
      //   .findOne({ email, role: 'superadmin' })
      //
      // if (!admin || !await bcrypt.compare(password, admin.password)) {
      //   throw createError({
      //     statusCode: 401,
      //     statusMessage: 'Invalid credentials'
      //   })
      // }
      //
      // const token = jwt.sign(
      //   { userId: admin._id, email: admin.email, role: 'superadmin' },
      //   process.env.JWT_SECRET
      // )

      // Mock: Allow superadmin login with any credentials
      if (email && password) {
        setCookie(event, 'admin-token', 'mock-superadmin-token', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7
        })
        
        setCookie(event, 'admin-role', 'superadmin', {
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7
        })

        return {
          success: true,
          message: 'Super Admin login successful',
          token: 'mock-superadmin-token',
          role: 'superadmin',
          admin: {
            id: '1',
            name: 'Super Admin',
            email: email
          }
        }
      } else {
        throw createError({
          statusCode: 400,
          statusMessage: 'Email dan password harus diisi'
        })
      }
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Login gagal'
      })
    }
  }
})
