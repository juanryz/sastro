<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Daftar Menjadi Anggota</h1>
      <p class="text-xl text-gray-700">
        Bergabunglah dengan komunitas Sastro Jendro dan dapatkan akses ke berbagai keuntungan eksklusif
      </p>
    </div>

    <!-- Benefits -->
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Keuntungan Menjadi Anggota:</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎟️</span>
          <div>
            <p class="font-semibold text-gray-900">Kartu Anggota Digital</p>
            <p class="text-sm text-gray-700">Kartu anggota yang dapat diakses kapan saja</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-2xl">📧</span>
          <div>
            <p class="font-semibold text-gray-900">Update Eksklusif</p>
            <p class="text-sm text-gray-700">Berita dan acara terbaru langsung ke email</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎭</span>
          <div>
            <p class="font-semibold text-gray-900">Akses Event</p>
            <p class="text-sm text-gray-700">Akses prioritas ke acara dan workshop eksklusif</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-2xl">👥</span>
          <div>
            <p class="font-semibold text-gray-900">Komunitas</p>
            <p class="text-sm text-gray-700">Networking dengan sesama pecinta budaya Jawa</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Form -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <form @submit.prevent="submitRegistration" class="space-y-6">
        <!-- Personal Information Section -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">
            Informasi Pribadi
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Full Name -->
            <div>
              <label for="fullName" class="block text-gray-700 font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Nama lengkap Anda"
              />
            </div>

            <!-- Birth Date -->
            <div>
              <label for="birthDate" class="block text-gray-700 font-semibold mb-2">
                Tanggal Lahir
              </label>
              <input
                id="birthDate"
                v-model="form.birthDate"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="email@example.com"
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-gray-700 font-semibold mb-2">
                Nomor Telepon
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="+62 812 3456 7890"
              />
            </div>
          </div>

          <!-- Address -->
          <div class="mb-6">
            <label for="address" class="block text-gray-700 font-semibold mb-2">Alamat</label>
            <textarea
              id="address"
              v-model="form.address"
              required
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Alamat lengkap Anda"
            />
          </div>

          <!-- City & Province -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="city" class="block text-gray-700 font-semibold mb-2">Kota</label>
              <input
                id="city"
                v-model="form.city"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Kota"
              />
            </div>
            <div>
              <label for="province" class="block text-gray-700 font-semibold mb-2">
                Provinsi
              </label>
              <input
                id="province"
                v-model="form.province"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Provinsi"
              />
            </div>
          </div>
        </div>

        <!-- Interest Section -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">
            Minat & Keahlian
          </h3>

          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-3">Bidang Minat (Pilih 1 atau lebih)</label>
            <div class="space-y-2">
              <div
                v-for="interest in interests"
                :key="interest"
                class="flex items-center"
              >
                <input
                  :id="`interest-${interest}`"
                  type="checkbox"
                  :value="interest"
                  v-model="form.interests"
                  class="h-4 w-4 text-amber-600 focus:ring-amber-600 border-gray-300 rounded"
                />
                <label :for="`interest-${interest}`" class="ml-3 text-gray-700">
                  {{ interest }}
                </label>
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div>
            <label for="experience" class="block text-gray-700 font-semibold mb-2">
              Pengalaman / Keahlian
            </label>
            <textarea
              id="experience"
              v-model="form.experience"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Tuliskan pengalaman atau keahlian Anda di bidang budaya Jawa..."
            />
          </div>
        </div>

        <!-- Account Section -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">
            Akun Anda
          </h3>

          <div class="mb-6">
            <label for="username" class="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Username untuk login"
            />
            <p class="text-sm text-gray-600 mt-1">Username hanya huruf, angka, dan underscore</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Password -->
            <div>
              <label for="password" class="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Minimal 8 karakter"
              />
              <p class="text-sm text-gray-600 mt-1">Minimal 8 karakter, kombinasi huruf dan angka</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Masukkan ulang password"
              />
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div>
          <div class="flex items-start">
            <input
              id="terms"
              v-model="form.agreeTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-amber-600 focus:ring-amber-600 border-gray-300 rounded mt-1"
            />
            <label for="terms" class="ml-3 text-gray-700">
              Saya setuju dengan
              <a href="#" class="text-amber-600 hover:text-amber-700 font-semibold">
                Syarat dan Ketentuan
              </a>
              dan
              <a href="#" class="text-amber-600 hover:text-amber-700 font-semibold">
                Kebijakan Privasi
              </a>
            </label>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="p-4 bg-red-100 text-red-800 rounded-lg">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="p-4 bg-green-100 text-green-800 rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {{ isSubmitting ? '⏳ Mendaftar...' : '✅ Daftar Sekarang' }}
          </button>
          <NuxtLink
            to="/"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Batal
          </NuxtLink>
        </div>

        <!-- Login Link -->
        <div class="text-center pt-4">
          <p class="text-gray-700">
            Sudah punya akun?
            <NuxtLink to="/member/login" class="text-amber-600 hover:text-amber-700 font-semibold">
              Login di sini
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  fullName: '',
  birthDate: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  interests: [],
  experience: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')

const interests = [
  'Wayang Kulit',
  'Tari Tradisional',
  'Gamelan',
  'Batik',
  'Sastra Jawa',
  'Seni Rupa',
  'Lainnya'
]

const submitRegistration = async () => {
  error.value = ''
  successMessage.value = ''

  // Validation
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Password tidak cocok'
    return
  }

  if (form.value.password.length < 8) {
    error.value = 'Password minimal 8 karakter'
    return
  }

  if (form.value.interests.length === 0) {
    error.value = 'Pilih minimal satu bidang minat'
    return
  }

  isSubmitting.value = true

  try {
    // await $fetch('/api/auth/register-member', {
    //   method: 'POST',
    //   body: form.value
    // })

    successMessage.value = 'Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.'
    
    setTimeout(() => {
      navigateTo('/member/login')
    }, 2000)
  } catch (e) {
    error.value = 'Gagal mendaftar. Username mungkin sudah terdaftar.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
