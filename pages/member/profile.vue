<template>
  <div>
    <!-- Member Header -->
    <header class="bg-blue-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold mb-2">Profil Member</h1>
            <p class="text-amber-100">Selamat datang, {{ member.fullName }}!</p>
          </div>
          <button
            @click="logout"
            class="px-6 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Tabs -->
      <div class="flex gap-4 mb-8 border-b border-gray-200">
        <button
          @click="activeTab = 'card'"
          :class="[
            'px-6 py-3 font-semibold transition border-b-2',
            activeTab === 'card'
              ? 'text-amber-600 border-amber-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          ]"
        >
          🎟️ Kartu Anggota
        </button>
        <button
          @click="activeTab = 'profile'"
          :class="[
            'px-6 py-3 font-semibold transition border-b-2',
            activeTab === 'profile'
              ? 'text-amber-600 border-amber-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          ]"
        >
          👤 Profil
        </button>
        <button
          @click="activeTab = 'activity'"
          :class="[
            'px-6 py-3 font-semibold transition border-b-2',
            activeTab === 'activity'
              ? 'text-amber-600 border-amber-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          ]"
        >
          📅 Aktivitas
        </button>
      </div>

      <!-- Tab Content -->
      <!-- Card Tab -->
      <div v-if="activeTab === 'card'" class="space-y-6">
        <MemberCard :member="member" />
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Profile Info -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Personal Information -->
            <div class="bg-white rounded-sm shadow p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Informasi Pribadi</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p class="text-gray-600 text-sm font-semibold mb-1">Nama Lengkap</p>
                  <p class="text-gray-900 font-semibold">{{ member.fullName }}</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm font-semibold mb-1">Tanggal Lahir</p>
                  <p class="text-gray-900 font-semibold">{{ formatDate(member.birthDate) }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p class="text-gray-600 text-sm font-semibold mb-1">Email</p>
                  <p class="text-gray-900 font-semibold">{{ member.email }}</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm font-semibold mb-1">Telepon</p>
                  <p class="text-gray-900 font-semibold">{{ member.phone }}</p>
                </div>
              </div>

              <div>
                <p class="text-gray-600 text-sm font-semibold mb-1">Alamat</p>
                <p class="text-gray-900 font-semibold">{{ member.address }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <p class="text-gray-600 text-sm font-semibold mb-1">Kota</p>
                  <p class="text-gray-900 font-semibold">{{ member.city }}</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm font-semibold mb-1">Provinsi</p>
                  <p class="text-gray-900 font-semibold">{{ member.province }}</p>
                </div>
              </div>

              <button
                @click="editingProfile = !editingProfile"
                class="mt-6 px-6 py-2 bg-amber-600 text-white rounded-sm hover:bg-amber-700 transition"
              >
                ✏️ Edit Profil
              </button>
            </div>

            <!-- Minat & Keahlian -->
            <div class="bg-white rounded-sm shadow p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Minat & Keahlian</h2>

              <div class="mb-6">
                <p class="text-gray-600 text-sm font-semibold mb-3">Bidang Minat</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="interest in member.interests"
                    :key="interest"
                    class="px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-semibold text-sm"
                  >
                    {{ interest }}
                  </span>
                </div>
              </div>

              <div>
                <p class="text-gray-600 text-sm font-semibold mb-2">Pengalaman & Keahlian</p>
                <p class="text-gray-900">{{ member.experience || 'Belum ada deskripsi' }}</p>
              </div>
            </div>

            <!-- Account Security -->
            <div class="bg-white rounded-sm shadow p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Keamanan Akun</h2>

              <div class="space-y-4">
                <div class="flex justify-between items-center p-4 border border-gray-200 rounded-sm">
                  <div>
                    <p class="font-semibold text-gray-900">Ubah Password</p>
                    <p class="text-sm text-gray-600">Perbarui password akun Anda secara berkala</p>
                  </div>
                  <button class="px-4 py-2 bg-gray-600 text-white rounded-sm hover:bg-gray-700 transition">
                    Ubah
                  </button>
                </div>

                <div class="flex justify-between items-center p-4 border border-gray-200 rounded-sm">
                  <div>
                    <p class="font-semibold text-gray-900">Two-Factor Authentication</p>
                    <p class="text-sm text-gray-600">Aktifkan untuk keamanan lebih</p>
                  </div>
                  <button class="px-4 py-2 bg-gray-600 text-white rounded-sm hover:bg-gray-700 transition">
                    Aktifkan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Member Status -->
            <div class="bg-white rounded-sm shadow p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Status Membership</h3>

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Status</span>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-white font-semibold text-sm',
                      member.status === 'verified'
                        ? 'bg-green-600'
                        : 'bg-yellow-600'
                    ]"
                  >
                    {{ member.status === 'verified' ? '✓ Verified' : '⏳ Pending' }}
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Member ID</span>
                  <span class="text-gray-900 font-mono font-semibold">{{ member.memberId }}</span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Tipe Member</span>
                  <span class="text-gray-900 font-semibold">{{ member.membershipType }}</span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Bergabung</span>
                  <span class="text-gray-900 font-semibold">{{ shortDate(member.joinedAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-amber-50 rounded-sm shadow p-6 border border-amber-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Statistik</h3>

              <div class="space-y-3">
                <div class="text-center">
                  <p class="text-3xl font-bold text-amber-600">5</p>
                  <p class="text-sm text-gray-600">Event Dihadiri</p>
                </div>
                <div class="text-center border-t border-amber-200 pt-3">
                  <p class="text-3xl font-bold text-amber-600">12</p>
                  <p class="text-sm text-gray-600">Points Terkumpul</p>
                </div>
              </div>
            </div>

            <!-- Helpful Links -->
            <div class="bg-white rounded-sm shadow p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Bantuan</h3>

              <div class="space-y-2">
                <a href="#" class="block text-amber-600 hover:text-amber-700 font-semibold">
                  📖 Panduan Member
                </a>
                <a href="#" class="block text-amber-600 hover:text-amber-700 font-semibold">
                  ❓ FAQ
                </a>
                <a href="/kontak" class="block text-amber-600 hover:text-amber-700 font-semibold">
                  📞 Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Tab -->
      <div v-if="activeTab === 'activity'" class="space-y-6">
        <div class="bg-white rounded-sm shadow p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Aktivitas Anda</h2>

          <div class="space-y-4">
            <div
              v-for="activity in memberActivities"
              :key="activity.id"
              class="flex gap-4 p-4 border border-gray-200 rounded-sm hover:border-amber-300 transition"
            >
              <div class="w-12 h-12 bg-amber-100 rounded-sm flex items-center justify-center flex-shrink-0">
                <span class="text-xl">{{ activity.icon }}</span>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-600">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.date }}</p>
              </div>
            </div>
          </div>

          <div class="text-center mt-8">
            <p class="text-gray-500">Tidak ada aktivitas lain</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'member'
})

const activeTab = ref('card')
const editingProfile = ref(false)

const member = ref({
  memberId: 'SJ-2024-001',
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '+62 812 3456 7890',
  birthDate: new Date('1990-05-15'),
  address: 'Jl. Budaya No. 123',
  city: 'Yogyakarta',
  province: 'Jawa Tengah',
  interests: ['Wayang Kulit', 'Gamelan', 'Tari Tradisional'],
  experience: 'Saya memiliki pengalaman 10 tahun di bidang seni wayang kulit.',
  joinedAt: new Date('2023-06-01'),
  status: 'verified',
  membershipType: 'REGULAR'
})

const memberActivities = [
  {
    id: 1,
    icon: '🎭',
    title: 'Hadir di Workshop Wayang',
    description: 'Mengikuti workshop intensif tentang teknik wayang kulit',
    date: '15 Februari 2024'
  },
  {
    id: 2,
    icon: '🎫',
    title: 'Registrasi Berhasil',
    description: 'Anda berhasil terdaftar sebagai member',
    date: '1 Juni 2023'
  }
]

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shortDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const logout = async () => {
  // await $fetch('/api/auth/member-logout', { method: 'POST' })
  navigateTo('/member/login')
}
</script>
