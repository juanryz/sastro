// POST: Logout
export default defineEventHandler(async (event) => {
  if (getMethod(event) === 'POST') {
    deleteCookie(event, 'auth-token')
    return { success: true, message: 'Logged out successfully' }
  }
})
