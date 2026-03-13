<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-3xl rounded-3xl bg-slate-900/90 border border-white/10 p-6 md:p-8 shadow-2xl">
      <div class="text-center text-white mb-4">
        <div class="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs uppercase tracking-[0.2em] font-semibold">Material 3</div>
        <h1 class="text-3xl font-bold mt-3">Daftar Anggota</h1>
        <p class="text-slate-300 mt-1">Daftar cepat lewat Google atau form.</p>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <button @click="registerWithGoogle" class="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-left text-slate-100 hover:bg-slate-700"><span>🟢</span><div><div class="font-semibold">Daftar dengan Google</div><div class="text-xs text-slate-400">Tanpa password</div></div></button>
        <div class="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-200"><div class="text-xs uppercase tracking-[0.15em] text-slate-400">Keuntungan</div><ul class="mt-2 space-y-1 text-sm"><li>• Kartu digital</li><li>• Akses event</li><li>• Info komunitas</li></ul></div>
      </div>
      <div class="mt-4 border-t border-slate-700 pt-4">
        <form @submit.prevent="submitRegistration" class="space-y-3">
          <div class="grid gap-2 md:grid-cols-2"><input v-model="form.fullName" required placeholder="Nama lengkap" class="rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100" /><input v-model="form.email" required type="email" placeholder="Email" class="rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100" /></div>
          <div class="grid gap-2 md:grid-cols-2"><input v-model="form.password" required type="password" placeholder="Password" class="rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100" /><input v-model="form.confirmPassword" required type="password" placeholder="Ulangi password" class="rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100" /></div>
          <div class="flex items-center gap-2"><input id="agree" v-model="form.agreeTerms" type="checkbox" class="h-4 w-4 rounded border-slate-500 bg-slate-800 text-indigo-500" /><label for="agree" class="text-slate-300 text-sm">Setuju syarat & kebijakan</label></div>
          <div v-if="error" class="rounded-xl border border-red-400/30 bg-red-500/10 p-2 text-xs text-red-200">{{ error }}</div>
          <div v-if="successMessage" class="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2 text-xs text-emerald-200">{{ successMessage }}</div>
          <button type="submit" :disabled="isSubmitting" class="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-2 text-slate-900 font-semibold">{{ isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang' }}</button>
        </form>
        <p class="mt-3 text-center text-slate-300 text-sm">Sudah punya akun? <NuxtLink to="/member/login" class="text-indigo-300 hover:text-indigo-200 font-semibold">Masuk</NuxtLink></p>
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