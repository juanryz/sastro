export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/member') && to.path !== '/member/login') {
    const token = useCookie('member-token').value
    if (!token) {
      return navigateTo('/member/login')
    }
  }
})
