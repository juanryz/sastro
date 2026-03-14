<template>
  <div class="relative py-24 flex items-center justify-center p-4 overflow-hidden">
    <PageLoader />
    <!-- Premium Blur Blobs -->
    <div class="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/30 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-400/30 blur-[120px] pointer-events-none"></div>

    <div class="reveal relative z-10 w-full max-w-lg rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
      <div class="text-center mb-8">
        <div class="mx-auto w-40 h-auto flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Sastra Jendra" class="w-full h-auto object-contain drop-shadow-sm" />
        </div>
        <h1 class="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">Masuk</h1>
        <p class="text-slate-600 font-medium mt-2">Masukkan email dan kata sandi untuk melanjutkan.</p>
      </div>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] ml-1 mb-2">Email</label>
          <input v-model="credentials.email" type="text" placeholder="contoh@email.com" required class="w-full rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md px-5 py-4 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white transition-all shadow-inner shadow-white/40" />
        </div>
        
        <div>
          <label class="block text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] ml-1 mb-2">Kata Sandi</label>
          <div class="relative">
            <input v-model="credentials.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required class="w-full rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md px-5 py-4 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white transition-all shadow-inner shadow-white/40 pr-14" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors bg-white/50 rounded-lg focus:outline-none">
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
            </button>
          </div>
        </div>
        
        <button type="submit" :disabled="isLoading" class="w-full rounded-2xl bg-slate-900 border border-slate-700 py-4 mt-4 text-white font-bold tracking-wide shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 text-lg">
          {{ isLoading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>

      <div class="my-8 flex items-center gap-3 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
        <div class="h-px w-full bg-slate-300/50"></div>
        <span>atau</span>
        <div class="h-px w-full bg-slate-300/50"></div>
      </div>

      <button @click="loginWithGoogle" class="group w-full rounded-2xl border border-white/80 bg-white/50 shadow-sm backdrop-blur-md py-4 px-4 font-bold text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3">
        <svg class="h-6 w-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Masuk dengan Google</span>
      </button>

      <div v-if="error" class="mt-6 rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur-sm p-4 text-sm font-semibold text-red-600 text-center shadow-inner">{{ error }}</div>
      
      <div class="mt-8 text-center text-slate-600 text-sm font-medium">
        Belum punya akun? <NuxtLink to="/register" class="text-indigo-600 hover:text-indigo-800 font-bold underline decoration-indigo-300 underline-offset-4 ml-1">Daftar sekarang</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '~/composables/useReveal'

useReveal()

const credentials = ref({ email: '', password: '' })
const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Mock user database — server akan menentukan role berdasarkan akun
const mockUsers = {
  'admin@sastrojendro.id': { role: 'admin', password: 'admin123' },
  'super@sastrojendro.id': { role: 'superadmin', password: 'super123' },
}

const login = async () => { 
  error.value = ''
  isLoading.value = true
  
  if (!credentials.value.email || !credentials.value.password) {
    error.value = 'Mohon masukkan email dan kata sandi.'
    isLoading.value = false
    return
  }
  
  try {
    const emailInput = credentials.value.email.trim().toLowerCase()
    const mockUser = mockUsers[emailInput]

    if (mockUser) {
      // Admin / Super Admin login
      if (credentials.value.password !== mockUser.password) {
        error.value = 'Kata sandi salah.'
        isLoading.value = false
        return
      }
      const adminToken = useCookie('admin-token')
      const adminRole = useCookie('admin-role')
      adminToken.value = 'mock-token'
      adminRole.value = mockUser.role
      navigateTo(mockUser.role === 'superadmin' ? '/admin/super' : '/admin')
    } else {
      // Member login (email apapun yang bukan admin)
      const token = useCookie('member-token')
      token.value = 'dummy-token'
      navigateTo('/member/profile')
    }
  } catch {
    error.value = 'Gagal masuk. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = () => { 
  window.location.href = '/api/auth/google' 
}

useHead({
  title: 'Masuk - Sastro Jendro'
})
</script>