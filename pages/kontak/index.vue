<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
      <p class="text-xl text-gray-700">
        Kami ingin mendengar dari Anda. Silakan hubungi kami untuk pertanyaan atau saran
      </p>
    </div>

    <!-- Contact Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <!-- Contact Info -->
      <div class="lg:col-span-1">
        <div class="space-y-8">
          <!-- Address -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Alamat</h3>
            <p class="text-gray-700">
              Jl. Budaya No. 123<br />
              Yogyakarta, Jawa Tengah<br />
              Indonesia 55000
            </p>
          </div>

          <!-- Email -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Email</h3>
            <a href="mailto:info@sastrojendro.id" class="text-amber-600 hover:text-amber-700">
              info@sastrojendro.id
            </a>
          </div>

          <!-- Phone -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Telepon</h3>
            <a href="tel:+622743123456" class="text-amber-600 hover:text-amber-700">
              +62 (274) 312-3456
            </a>
          </div>

          <!-- Hours -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Jam Operasional</h3>
            <p class="text-gray-700">
              Senin - Jumat: 09:00 - 17:00<br />
              Sabtu: 10:00 - 14:00<br />
              Minggu & Hari Libur: Tutup
            </p>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Media Sosial</h3>
            <div class="flex gap-4">
              <a href="#" class="text-blue-600 hover:text-blue-700 text-2xl">f</a>
              <a href="#" class="text-blue-400 hover:text-blue-500 text-2xl">𝕏</a>
              <a href="#" class="text-pink-600 hover:text-pink-700 text-2xl">📷</a>
              <a href="#" class="text-red-600 hover:text-red-700 text-2xl">▶</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <form @submit.prevent="submitForm" class="bg-white rounded-sm shadow-lg p-8">
          <div class="mb-6">
            <label for="name" class="block text-gray-700 font-semibold mb-2">Nama</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Nama Anda"
            />
          </div>

          <div class="mb-6">
            <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Email Anda"
            />
          </div>

          <div class="mb-6">
            <label for="phone" class="block text-gray-700 font-semibold mb-2">Telepon (Opsional)</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Nomor telepon Anda"
            />
          </div>

          <div class="mb-6">
            <label for="subject" class="block text-gray-700 font-semibold mb-2">Subjek</label>
            <select
              id="subject"
              v-model="form.subject"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <option value="">Pilih Subjek</option>
              <option value="informasi">Permintaan Informasi</option>
              <option value="bergabung">Ingin Bergabung</option>
              <option value="acara">Informasi Acara</option>
              <option value="kolaborasi">Proposal Kolaborasi</option>
              <option value="feedback">Feedback/Saran</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <div class="mb-6">
            <label for="message" class="block text-gray-700 font-semibold mb-2">Pesan</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Pesan Anda..."
            />
          </div>

          <!-- Status Message -->
          <div
            v-if="submitStatus.message"
            :class="[
              'mb-6 p-4 rounded-sm',
              submitStatus.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            ]"
          >
            {{ submitStatus.message }}
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-6 py-3 bg-amber-600 text-white rounded-sm hover:bg-amber-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Map Section -->
    <div class="bg-white rounded-sm shadow-lg overflow-hidden">
      <div class="bg-gray-200 h-96 flex items-center justify-center">
        <span class="text-gray-500">Peta lokasi akan ditampilkan di sini</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref({ message: '', type: '' })

const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = { message: '', type: '' }

  try {
    // await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: form.value
    // })

    submitStatus.value = {
      message: 'Pesan Anda telah terkirim. Terima kasih!',
      type: 'success'
    }

    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }

    setTimeout(() => {
      submitStatus.value = { message: '', type: '' }
    }, 5000)
  } catch (error) {
    submitStatus.value = {
      message: 'Terjadi kesalahan. Silakan coba lagi.',
      type: 'error'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
