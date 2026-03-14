<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-white flex items-center justify-center p-4">
    <div class="w-full max-w-3xl rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 p-6 md:p-8 shadow-2xl shadow-slate-200/50">
      <div class="text-center text-slate-900 mb-4">
        <div class="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs uppercase tracking-[0.2em] font-semibold">Material 3</div>
        <h1 class="text-3xl font-bold mt-3">Daftar Anggota</h1>
        <p class="text-slate-600 mt-1">Daftar cepat lewat Google atau form.</p>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <button @click="registerWithGoogle" class="flex items-center gap-2 rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-left text-slate-900 hover:bg-white/80"><span>🟢</span><div><div class="font-semibold">Daftar dengan Google</div><div class="text-xs text-slate-500">Tanpa password</div></div></button>
        <div class="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm p-3 text-slate-800"><div class="text-xs uppercase tracking-[0.15em] text-slate-500">Keuntungan</div><ul class="mt-2 space-y-1 text-sm"><li>• Kartu digital</li><li>• Akses event</li><li>• Info komunitas</li></ul></div>
      </div>
      <div class="mt-4 border-t border-white/50 pt-4">
        <form @submit.prevent="submitRegistration" class="space-y-3">
          <div class="grid gap-2 md:grid-cols-2"><input v-model="form.fullName" required placeholder="Nama lengkap" class="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400" /><input v-model="form.email" required type="email" placeholder="Email" class="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400" /></div>
          <div class="grid gap-2 md:grid-cols-2"><input v-model="form.password" required type="password" placeholder="Password" class="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400" /><input v-model="form.confirmPassword" required type="password" placeholder="Ulangi password" class="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm px-3 py-2 text-slate-900 placeholder-slate-400" /></div>
          <div class="flex items-center gap-2"><input id="agree" v-model="form.agreeTerms" type="checkbox" class="h-4 w-4 rounded border-white/60 bg-white/70 shadow-sm backdrop-blur-sm text-indigo-500" /><label for="agree" class="text-slate-600 text-sm">Setuju syarat & kebijakan</label></div>
          <div v-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-2 text-xs text-red-600">{{ error }}</div>
          <div v-if="successMessage" class="rounded-3xl border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-600">{{ successMessage }}</div>
          <button type="submit" :disabled="isSubmitting" class="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-2 text-white font-semibold shadow-md hover:shadow-lg">{{ isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang' }}</button>
        </form>
        <p class="mt-3 text-center text-slate-600 text-sm">Sudah punya akun? <NuxtLink to="/member/login" class="text-blue-600 hover:text-indigo-800 font-semibold">Masuk</NuxtLink></p>
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