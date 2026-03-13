export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  // In a real app, this would verify the JWT token

  if (to.path.startsWith('/admin')) {
    // For now, we'll allow admin access without strict checking
    // In production, implement proper authentication check
    const token = useCookie('auth-token').value
    if (!token && to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})
