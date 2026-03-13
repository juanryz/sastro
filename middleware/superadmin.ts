export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/admin/super')) {
    const token = useCookie('admin-token').value
    const role = useCookie('admin-role').value

    if (!token || role !== 'superadmin') {
      return navigateTo('/admin/login')
    }
  }
})
