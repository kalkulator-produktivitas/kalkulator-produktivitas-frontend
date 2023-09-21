export default defineNuxtRouteMiddleware((to, from) => {
  let auth = localStorage.getItem('auth')
  if (!auth) {
    return navigateTo('/app/login');
  }
})