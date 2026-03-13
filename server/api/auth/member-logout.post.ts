// POST: Member logout
export default defineEventHandler(async (event) => {
  if (getMethod(event) === 'POST') {
    deleteCookie(event, 'member-token')
    return { success: true, message: 'Logged out successfully' }
  }
})
