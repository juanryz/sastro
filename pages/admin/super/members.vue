<template>
  <div>
    <!-- Header -->
    <header class="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold">Member Verification</h1>
        <p class="text-purple-200 mt-2">Verifikasi dan kelola pendaftar member baru</p>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-900 text-white min-h-screen p-6">
        <nav class="space-y-4">
          <NuxtLink
            to="/admin/super"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            📊 Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/super/members"
            class="block px-4 py-3 rounded-lg bg-purple-600"
          >
            ✅ Member Verification
          </NuxtLink>
          <NuxtLink
            to="/admin/super/admin-users"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            👥 Admin Users
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Tabs -->
        <div class="flex gap-4 mb-8 border-b border-gray-200">
          <button
            @click="filterTab = 'pending'"
            :class="[
              'px-6 py-3 font-semibold transition border-b-2',
              filterTab === 'pending'
                ? 'text-yellow-600 border-yellow-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            ⏳ Pending ({{ pendingMembers.length }})
          </button>
          <button
            @click="filterTab = 'verified'"
            :class="[
              'px-6 py-3 font-semibold transition border-b-2',
              filterTab === 'verified'
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            ✅ Verified ({{ verifiedMembers.length }})
          </button>
          <button
            @click="filterTab = 'rejected'"
            :class="[
              'px-6 py-3 font-semibold transition border-b-2',
              filterTab === 'rejected'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            ❌ Rejected ({{ rejectedMembers.length }})
          </button>
        </div>

        <!-- Pending Members -->
        <div v-if="filterTab === 'pending'" class="space-y-6">
          <div
            v-for="member in pendingMembers"
            :key="member.id"
            class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-400"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Member Info -->
              <div class="md:col-span-2">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ member.fullName }}</h3>

                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p class="text-gray-600 text-sm">Email</p>
                    <p class="text-gray-900 font-semibold">{{ member.email }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 text-sm">Telepon</p>
                    <p class="text-gray-900 font-semibold">{{ member.phone }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 text-sm">Lokasi</p>
                    <p class="text-gray-900 font-semibold">{{ member.city }}, {{ member.province }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 text-sm">Terdaftar</p>
                    <p class="text-gray-900 font-semibold">{{ formatDate(member.registeredAt) }}</p>
                  </div>
                </div>

                <div>
                  <p class="text-gray-600 text-sm mb-2 font-semibold">Minat</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="interest in member.interests"
                      :key="interest"
                      class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"
                    >
                      {{ interest }}
                    </span>
                  </div>
                </div>

                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p class="text-gray-600 text-sm font-semibold mb-1">Pengalaman & Keahlian</p>
                  <p class="text-gray-700">{{ member.experience || 'Tidak ada deskripsi' }}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-3">
                <button
                  @click="verifyMember(member.id)"
                  class="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  ✅ Verifikasi
                </button>
                <button
                  @click="rejectMember(member.id)"
                  class="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  ❌ Tolak
                </button>
                <button
                  @click="expandDetails = expandDetails === member.id ? null : member.id"
                  class="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  📋 Detail Lengkap
                </button>
              </div>
            </div>

            <!-- Expanded Details -->
            <div
              v-if="expandDetails === member.id"
              class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p class="text-gray-600 text-sm"><strong>Alamat:</strong> {{ member.address }}</p>
              <p class="text-gray-600 text-sm"><strong>Username:</strong> {{ member.username }}</p>
              <p class="text-gray-600 text-sm"><strong>Birth Date:</strong> {{ formatDate(member.birthDate) }}</p>
            </div>
          </div>

          <div v-if="pendingMembers.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">Tidak ada member yang menunggu verifikasi</p>
          </div>
        </div>

        <!-- Verified Members -->
        <div v-if="filterTab === 'verified'" class="space-y-4">
          <div
            v-for="member in verifiedMembers"
            :key="member.id"
            class="bg-white rounded-lg shadow p-6 border-l-4 border-green-400"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ member.fullName }}</h3>
                <p class="text-gray-600">{{ member.email }}</p>
                <p class="text-sm text-gray-500 mt-1">ID: {{ member.memberId }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">Verified</p>
                <p class="text-xs text-gray-500">{{ formatDate(member.verifiedAt) }}</p>
              </div>
            </div>
          </div>

          <div v-if="verifiedMembers.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">Tidak ada member yang terverifikasi</p>
          </div>
        </div>

        <!-- Rejected Members -->
        <div v-if="filterTab === 'rejected'" class="space-y-4">
          <div
            v-for="member in rejectedMembers"
            :key="member.id"
            class="bg-white rounded-lg shadow p-6 border-l-4 border-red-400"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ member.fullName }}</h3>
                <p class="text-gray-600">{{ member.email }}</p>
                <p class="text-red-600 text-sm mt-2"><strong>Alasan:</strong> {{ member.rejectionReason }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">Rejected</p>
                <p class="text-xs text-gray-500">{{ formatDate(member.rejectedAt) }}</p>
              </div>
            </div>
          </div>

          <div v-if="rejectedMembers.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">Tidak ada member yang ditolak</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'superadmin'
})

const filterTab = ref('pending')
const expandDetails = ref(null)

const pendingMembers = ref([
  {
    id: '1',
    fullName: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '+62 812 3456 7890',
    city: 'Yogyakarta',
    province: 'Jawa Tengah',
    address: 'Jl. Budaya No. 123',
    username: 'budisantoso',
    birthDate: new Date('1990-05-15'),
    interests: ['Wayang Kulit', 'Gamelan'],
    experience: 'Saya memiliki pengalaman 10 tahun di bidang seni wayang kulit.',
    registeredAt: new Date()
  }
])

const verifiedMembers = ref([
  {
    id: '2',
    fullName: 'Siti Nurhaliza',
    email: 'siti@example.com',
    memberId: 'SJ-2024-001',
    verifiedAt: new Date('2024-01-15')
  }
])

const rejectedMembers = ref([
  {
    id: '3',
    fullName: 'Ahmad Wijaya',
    email: 'ahmad@example.com',
    rejectionReason: 'Data tidak lengkap',
    rejectedAt: new Date('2024-01-10')
  }
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const verifyMember = (memberId) => {
  const member = pendingMembers.value.find(m => m.id === memberId)
  if (member && confirm(`Verifikasi member ${member.fullName}?`)) {
    const verified = pendingMembers.value.find(m => m.id === memberId)
    verifiedMembers.value.push({
      ...verified,
      memberId: `SJ-2024-${String(verifiedMembers.value.length + 1).padStart(3, '0')}`,
      verifiedAt: new Date()
    })
    pendingMembers.value = pendingMembers.value.filter(m => m.id !== memberId)
    alert('Member berhasil diverifikasi!')
  }
}

const rejectMember = (memberId) => {
  const reason = prompt('Alasan penolakan:')
  if (reason) {
    const member = pendingMembers.value.find(m => m.id === memberId)
    rejectedMembers.value.push({
      ...member,
      rejectionReason: reason,
      rejectedAt: new Date()
    })
    pendingMembers.value = pendingMembers.value.filter(m => m.id !== memberId)
    alert('Member ditolak!')
  }
}
</script>
