<template>
  <div class="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-slate-50">
    <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/30 blur-[120px] pointer-events-none"></div>
    <div class="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/30 blur-[120px] pointer-events-none"></div>
    <div class="absolute -bottom-[10%] left-[20%] w-[60%] h-[50%] rounded-full bg-sky-400/30 blur-[120px] pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-3xl rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
      <div class="text-center text-slate-900 mb-8">
        <div class="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-indigo-700 shadow-sm backdrop-blur-sm">Sastro Jendro</div>
        <h1 class="text-4xl font-black mt-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">Daftar Anggota</h1>
        <p class="text-slate-600 mt-2 font-medium">Bergabung dan nikmati berbagai keuntungan.</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <button @click="registerWithGoogle" class="group flex items-center gap-4 rounded-[1.5rem] border border-white/50 bg-white/30 hover:bg-white/50 shadow-sm backdrop-blur-md px-5 py-5 text-left text-slate-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <svg class="h-8 w-8 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div><div class="font-bold text-lg">Daftar dengan Google</div><div class="text-sm text-slate-500 font-semibold mt-0.5">Lebih Cepat & Praktis</div></div>
        </button>
        <div class="rounded-[1.5rem] border border-white/50 bg-white/30 shadow-sm backdrop-blur-md p-5 text-slate-800 transition-all hover:bg-white/40">
          <div class="text-xs uppercase tracking-[0.2em] font-bold text-indigo-600 mb-3">Keuntungan</div>
          <ul class="space-y-2.5 text-sm font-semibold text-slate-700">
            <li class="flex items-center gap-3"><div class="rounded-full bg-emerald-100 text-emerald-600 p-1"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div> Kartu member digital</li>
            <li class="flex items-center gap-3"><div class="rounded-full bg-emerald-100 text-emerald-600 p-1"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div> Akses event eksklusif</li>
            <li class="flex items-center gap-3"><div class="rounded-full bg-emerald-100 text-emerald-600 p-1"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div> Jejaring komunitas elit</li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-slate-200/50 pt-8 relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-50/80 backdrop-blur-sm px-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 rounded-full">Atau Secara Manual</div>
        <form @submit.prevent="submitRegistration" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <input v-model="form.fullName" required placeholder="Nama Lengkap" class="w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md px-4 py-3.5 text-slate-800 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/50 transition-all shadow-inner shadow-white/40" />
            <input v-model="form.email" required type="email" placeholder="Alamat Email" class="w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md px-4 py-3.5 text-slate-800 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/50 transition-all shadow-inner shadow-white/40" />
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <input v-model="form.password" required type="password" placeholder="Password" class="w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md px-4 py-3.5 text-slate-800 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/50 transition-all shadow-inner shadow-white/40" />
            <input v-model="form.confirmPassword" required type="password" placeholder="Ulangi Password" class="w-full rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md px-4 py-3.5 text-slate-800 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/50 transition-all shadow-inner shadow-white/40" />
          </div>
          <div class="flex items-center gap-3 py-1">
            <input id="agree" v-model="form.agreeTerms" type="checkbox" class="h-5 w-5 rounded-md border-white/60 bg-white/50 shadow-sm backdrop-blur-sm text-indigo-500 focus:ring-indigo-400/50" />
            <label for="agree" class="text-slate-600 text-sm font-semibold cursor-pointer">Saya setuju dengan syarat & ketentuan</label>
          </div>
          <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur-sm p-3 text-sm font-semibold text-red-600 text-center">{{ error }}</div>
          <div v-if="successMessage" class="rounded-2xl border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm p-3 text-sm font-semibold text-emerald-600 text-center">{{ successMessage }}</div>
          <button type="submit" :disabled="isSubmitting" class="w-full rounded-2xl bg-slate-900 border border-slate-700 py-4 mt-2 text-white font-bold tracking-wide shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0">{{ isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang' }}</button>
        </form>
        <p class="mt-6 text-center text-slate-600 text-sm font-semibold">Sudah punya akun? <NuxtLink to="/member/login" class="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-300 underline-offset-4">Masuk di sini</NuxtLink></p>
      </div>
    </div>
  </div>
</template>
<script setup>
const form = ref({ fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: false })
const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')
const registerWithGoogle = () => window.location.href = '/api/auth/google'
const submitRegistration = () => { error.value=''; successMessage.value=''; if(!form.value.agreeTerms){error.value='Setujui syarat.'; return}; if(form.value.password!==form.value.confirmPassword){error.value='Password tidak cocok.'; return}; isSubmitting.value=true; setTimeout(()=>{successMessage.value='Berhasil! Mengalihkan...'; navigateTo('/member/login'); isSubmitting.value=false},700) }
</script>