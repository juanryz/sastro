<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-xl">
      <div class="text-center mb-5">
        <div class="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold">SJ</div>
        <h1 class="mt-3 text-2xl font-bold text-white">Member Sign In</h1>
        <p class="text-slate-300">Masuk dengan akun atau Google.</p>
      </div>
      <button @click="loginWithGoogle" class="w-full rounded-xl border border-slate-600 bg-slate-800 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-700 flex items-center justify-center gap-2">🟢 Sign in with Google</button>
      <div class="mt-4 text-slate-400 text-center text-xs uppercase tracking-[0.2em]">atau</div>
      <form @submit.prevent="login" class="mt-3 space-y-3">
        <input v-model="credentials.username" type="text" placeholder="Email atau Username" required class="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100" />
        <input v-model="credentials.password" type="password" placeholder="Password" required class="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100" />
        <button type="submit" :disabled="isLoading" class="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-2 text-slate-900 font-semibold">{{ isLoading ? 'Memproses...' : 'Masuk' }}</button>
      </form>
      <div v-if="error" class="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 p-2 text-xs text-red-200">{{ error }}</div>
      <div class="mt-4 text-center text-slate-300 text-sm">Belum punya akun? <NuxtLink to="/register" class="text-indigo-300 hover:text-indigo-200 font-semibold">Daftar</NuxtLink></div>
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