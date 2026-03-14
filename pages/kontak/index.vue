<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-900">
    <PageLoader />
    <div class="reveal text-center mb-16 max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-800">Hubungi Kami</h1>
      <p class="text-lg text-slate-600">
        Punya pertanyaan seputar keanggotaan, kerja sama, atau ingin berkunjung ke sanggar kami? Jangan ragu untuk menghubungi.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
      
      <!-- Info Box (Left) -->
      <div class="reveal-left lg:col-span-5 space-y-6">
        <div class="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 h-full flex flex-col justify-center">
          <h3 class="text-2xl font-bold text-slate-800 mb-8">Informasi Kontak</h3>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">📍</div>
              <div>
                <h4 class="font-bold text-slate-800">Alamat Basecamp</h4>
                <p class="text-slate-600 mt-1 text-sm leading-relaxed">
                  Gedung Yayasan Sastro Jendro<br />
                  Jl. Budaya Nusantara No. 12<br />
                  Yogyakarta, Indonesia 55000
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">✉️</div>
              <div>
                <h4 class="font-bold text-slate-800">Email</h4>
                <a href="mailto:info@sastrojendro.id" class="text-indigo-600 hover:text-indigo-500 mt-1 text-sm font-medium block">info@sastrojendro.id</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">📞</div>
              <div>
                <h4 class="font-bold text-slate-800">Telepon / WhatsApp</h4>
                <a href="tel:+62274123456" class="text-indigo-600 hover:text-indigo-500 mt-1 text-sm font-medium block">+62 813-1234-5678</a>
              </div>
            </div>
          </div>
          
          <hr class="border-slate-200/60 my-8" />
          
          <div>
            <h4 class="font-bold text-slate-800 mb-3">Ikuti Medsos Kami</h4>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition shadow-sm">IG</a>
              <a href="#" class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition shadow-sm">FB</a>
              <a href="#" class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-300 transition shadow-sm">TW</a>
              <a href="#" class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-300 transition shadow-sm">YT</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Form (Right) -->
      <div class="reveal-right delay-1 lg:col-span-7">
        <div class="bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] p-8 md:p-10">
          <form @submit.prevent="submitForm">
            <h3 class="text-2xl font-bold text-slate-800 mb-6">Kirim Pesan Langsung</h3>
            
            <div class="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label for="name" class="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                  placeholder="Budi Santoso"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                  placeholder="budi@email.com"
                />
              </div>
            </div>

            <div class="mb-5">
              <label for="subject" class="block text-sm font-bold text-slate-700 mb-2">Subjek Pesan</label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="">Pilih Kepentingan</option>
                <option value="informasi">Informasi Umum</option>
                <option value="kemitraan">Kerja Sama & Kemitraan</option>
                <option value="donasi">Sponsor & Donasi</option>
                <option value="kunjungan">Permohonan Kunjungan Sanggar</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div class="mb-6">
              <label for="message" class="block text-sm font-bold text-slate-700 mb-2">Pesan Anda</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm resize-none"
                placeholder="Tuliskan pesan Anda secara rinci..."
              ></textarea>
            </div>

            <!-- Status Alert -->
            <div
              v-if="submitStatus.message"
              class="mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold"
              :class="submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'"
            >
              <span>{{ submitStatus.message }}</span>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-4 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isSubmitting ? 'Mengirim Pesan...' : 'Kirim Sekarang' }}
            </button>
          </form>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '~/composables/useReveal'

useReveal()

useHead({
  title: 'Kontak - Sastro Jendro'
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref({ message: '', type: '' })

const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = { message: '', type: '' }

  // Simulate network request
  setTimeout(() => {
    isSubmitting.value = false
    submitStatus.value = {
      message: 'Pesan Anda berhasil dikirim! Tim kami akan segera merespons.',
      type: 'success'
    }
    form.value = { name: '', email: '', subject: '', message: '' }
    
    setTimeout(() => {
      submitStatus.value = { message: '', type: '' }
    }, 5000)
  }, 1500)
}
</script>
