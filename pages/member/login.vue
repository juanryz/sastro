<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-white flex items-center justify-center p-4">
    <div class="w-full max-w-md rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-slate-200/50">
      <div class="text-center mb-5">
        <div class="mx-auto w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold">SJ</div>
        <h1 class="mt-3 text-2xl font-bold text-slate-900">Member Sign In</h1>
        <p class="text-slate-600">Masuk dengan akun atau Google.</p>
      </div>
      <button @click="loginWithGoogle" class="w-full rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm py-2.5 text-sm font-semibold text-slate-900 hover:bg-white/80 flex items-center justify-center gap-2">🟢 Sign in with Google</button>
      <div class="mt-4 text-slate-500 text-center text-xs uppercase tracking-[0.2em]">atau</div>
      <form @submit.prevent="login" class="mt-3 space-y-3">
        <input v-model="credentials.username" type="text" placeholder="Email atau Username" required class="w-full rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400" />
        <input v-model="credentials.password" type="password" placeholder="Password" required class="w-full rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400" />
        <button type="submit" :disabled="isLoading" class="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-2 text-white font-semibold shadow-md hover:shadow-lg">{{ isLoading ? 'Memproses...' : 'Masuk' }}</button>
      </form>
      <div v-if="error" class="mt-3 rounded-3xl border border-red-200 bg-red-50 p-2 text-xs text-red-600">{{ error }}</div>
      <div class="mt-4 text-center text-slate-600 text-sm">Belum punya akun? <NuxtLink to="/register" class="text-blue-600 hover:text-indigo-800 font-semibold">Daftar</NuxtLink></div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: false })
const credentials = ref({ username: '', password: '' })
const isLoading = ref(false)
const error = ref('')
const login = async () => { error.value=''; isLoading.value=true; if(!credentials.value.username||!credentials.value.password){error.value='Username/email dan password harus diisi'; isLoading.value=false; return}; try{navigateTo('/member/profile')}catch{error.value='Login gagal.'}finally{isLoading.value=false} }
const loginWithGoogle = () => { window.location.href = '/api/auth/google' }
</script>