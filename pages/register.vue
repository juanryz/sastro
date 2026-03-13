<template>
  <div class="min-h-screen bg-blue-600 flex items-center justify-center p-4">
    <div class="w-full max-w-3xl rounded-none bg-white shadow-sm border border-gray-100  border border-white/20 p-6 md:p-8 shadow-sm">
      <div class="text-center text-white mb-4">
        <div class="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs uppercase tracking-[0.2em] font-semibold">Material 3</div>
        <h1 class="text-3xl font-bold mt-3">Daftar Anggota</h1>
        <p class="text-gray-600 mt-1">Daftar cepat lewat Google atau form.</p>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <button @click="registerWithGoogle" class="flex items-center gap-2 rounded-sm border border-slate-600 bg-gray-100 border border-gray-200 px-3 py-2 text-left text-gray-900 hover:bg-gray-200"><span>🟢</span><div><div class="font-semibold">Daftar dengan Google</div><div class="text-xs text-gray-500">Tanpa password</div></div></button>
        <div class="rounded-sm border border-gray-200 bg-gray-100 border border-gray-200 p-3 text-gray-800"><div class="text-xs uppercase tracking-[0.15em] text-gray-500">Keuntungan</div><ul class="mt-2 space-y-1 text-sm"><li>• Kartu digital</li><li>• Akses event</li><li>• Info komunitas</li></ul></div>
      </div>
      <div class="mt-4 border-t border-gray-200 pt-4">
        <form @submit.prevent="submitRegistration" class="space-y-3">
          <div class="grid gap-2 md:grid-cols-2"><input v-model="form.fullName" required placeholder="Nama lengkap" class="rounded-sm border border-slate-600 bg-gray-100 border border-gray-200 px-3 py-2 text-gray-900" /><input v-model="form.email" required type="email" placeholder="Email" class="rounded-sm border border-slate-600 bg-gray-100 border border-gray-200 px-3 py-2 text-gray-900" /></div>
          <div class="grid gap-2 md:grid-cols-2"><input v-model="form.password" required type="password" placeholder="Password" class="rounded-sm border border-slate-600 bg-gray-100 border border-gray-200 px-3 py-2 text-gray-900" /><input v-model="form.confirmPassword" required type="password" placeholder="Ulangi password" class="rounded-sm border border-slate-600 bg-gray-100 border border-gray-200 px-3 py-2 text-gray-900" /></div>
          <div class="flex items-center gap-2"><input id="agree" v-model="form.agreeTerms" type="checkbox" class="h-4 w-4 rounded border-slate-500 bg-gray-100 border border-gray-200 text-blue-600" /><label for="agree" class="text-gray-600 text-sm">Setuju syarat & kebijakan</label></div>
          <div v-if="error" class="rounded-sm border border-red-400/30 bg-red-500/10 p-2 text-xs text-red-200">{{ error }}</div>
          <div v-if="successMessage" class="rounded-sm border border-emerald-400/30 bg-emerald-500/10 p-2 text-xs text-green-600">{{ successMessage }}</div>
          <button type="submit" :disabled="isSubmitting" class="w-full rounded-sm bg-blue-600 py-2 text-slate-900 font-semibold">{{ isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang' }}</button>
        </form>
        <p class="mt-3 text-center text-gray-600 text-sm">Sudah punya akun? <NuxtLink to="/member/login" class="text-blue-600 hover:text-blue-600 font-semibold">Masuk</NuxtLink></p>
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