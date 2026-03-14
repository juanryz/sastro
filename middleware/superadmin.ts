export default defineNuxtRouteMiddleware((to, from) => {
  const adminToken = useCookie('admin-token')
  const adminRole = useCookie('admin-role')

  if (!adminToken.value || adminRole.value !== 'superadmin') {
    return navigateTo('/member/login')
  }
})
