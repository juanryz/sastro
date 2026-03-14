<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-white flex items-center justify-center p-4">
    <div class="w-full max-w-lg rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 p-6 shadow-2xl shadow-slate-200/50">
      <div class="text-center mb-5">
        <div class="mx-auto w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-black">SJ</div>
        <h1 class="mt-3 text-2xl font-bold text-slate-900">Admin Sign In</h1>
        <p class="text-slate-600">Login dengan Google atau akun admin.</p>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-4 bg-white/70 shadow-sm border border-white/60 backdrop-blur-sm rounded-3xl p-1">
        <button @click="loginType='admin'" :class="loginType==='admin' ? 'bg-indigo-500 text-white' : 'text-slate-600 hover:bg-white/80 shadow-sm'" class="rounded-xl py-2 font-semibold">Admin</button>
        <button @click="loginType='superadmin'" :class="loginType==='superadmin' ? 'bg-cyan-400 text-white' : 'text-slate-600 hover:bg-white/80 shadow-sm'" class="rounded-xl py-2 font-semibold">Super Admin</button>
      </div>
      <form @submit.prevent="login" class="space-y-3">
        <div>
          <label for="email" class="block text-slate-600 text-sm">Email</label>
          <input id="email" v-model="credentials.email" type="email" required class="mt-1 w-full rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30" placeholder="admin@sastrojendro.id" />
        </div>
        <div>
          <label for="password" class="block text-slate-600 text-sm">Password</label>
          <input id="password" v-model="credentials.password" type="password" required class="mt-1 w-full rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30" placeholder="••••••••" />
        </div>
        <button type="submit" :disabled="isLoading" class="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-2 text-white font-semibold shadow-md hover:shadow-lg hover:from-indigo-400 hover:to-cyan-300 disabled:opacity-50">{{ isLoading ? 'Memproses...' : (loginType==='admin' ? 'Masuk Admin' : 'Masuk Super Admin') }}</button>
      </form>
      <div class="mt-3 text-center text-slate-500 text-xs uppercase tracking-[0.2em]">atau</div>
      <button @click="loginWithGoogle" class="mt-2 w-full rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm py-2 font-semibold text-slate-900 hover:bg-white/80">🟢 Masuk dengan Google</button>
      <div v-if="error" class="mt-3 rounded-3xl border border-red-200 bg-red-50 p-2 text-xs text-red-600">{{ error }}</div>
    </div>
  </div>
</template>
<script setup>
const credentials = ref({ email: '', password: '' })
const loginType = ref('admin')
const isLoading = ref(false)
const error = ref('')
const login = async () => {
  error.value = ''
  isLoading.value = true
  if (!credentials.value.email || !credentials.value.password) {
    error.value = 'Email dan password harus diisi'
    isLoading.value = false
    return
  }
  try {
    navigateTo(loginType.value==='superadmin' ? '/admin/super' : '/admin')
  } catch {
    error.value = 'Login gagal.'
  } finally {
    isLoading.value = false
  }
}
const loginWithGoogle = () => { window.location.href = '/api/auth/google' }
</script>