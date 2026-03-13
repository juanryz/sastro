// GET: Check current user
export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'auth-token')

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      })
    }

    // TODO: Verify token and get user
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const user = await db.collection('users')
    //   .findOne({ _id: decoded.userId })

    return {
      id: '1',
      name: 'Admin',
      email: 'admin@sastrojendro.id'
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }
})
