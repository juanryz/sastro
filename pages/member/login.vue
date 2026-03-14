<template>
  <div class="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-slate-50">
    <!-- Premium Blur Blobs -->
    <div class="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/30 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-400/30 blur-[120px] pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-md rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
      <div class="text-center mb-6">
        <div class="mx-auto w-40 h-auto flex items-center justify-center mb-4">
          <img src="/logo.png" alt="Sastra Jendra" class="w-full h-auto object-contain drop-shadow-sm" />
        </div>
        <h1 class="mt-5 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Sign In</h1>
        <p class="text-slate-600 font-medium mt-1">Selamat datang kembali, Member!</p>
      </div>
      
      <button @click="loginWithGoogle" class="group w-full rounded-2xl border border-white/50 bg-white/30 shadow-sm backdrop-blur-md py-3.5 px-4 font-bold text-slate-700 hover:bg-white/60 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3">
        <svg class="h-6 w-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Sign in with Google
      </button>

      <div class="my-6 flex items-center gap-3 text-slate-400 text-xs uppercase tracking-[0.2em] font-bold">
        <div class="h-px w-full bg-slate-300/50"></div>
        <span>atau</span>
        <div class="h-px w-full bg-slate-300/50"></div>
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <input v-model="credentials.username" type="text" placeholder="Email atau Username" required class="w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md px-4 py-3.5 text-slate-800 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/50 transition-all shadow-inner shadow-white/40" />
        <input v-model="credentials.password" type="password" placeholder="Password" required class="w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md px-4 py-3.5 text-slate-800 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/50 transition-all shadow-inner shadow-white/40" />
        <button type="submit" :disabled="isLoading" class="w-full rounded-2xl bg-slate-900 border border-slate-700 py-3.5 text-white font-bold tracking-wide shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0">{{ isLoading ? 'Memproses...' : 'Sign In Secara Manual' }}</button>
      </form>
      <div v-if="error" class="mt-4 rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur-sm p-3 text-xs font-semibold text-red-600 text-center">{{ error }}</div>
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