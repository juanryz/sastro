<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Tim Anggota</h1>
      <p class="text-xl text-gray-700">
        Ketahui lebih banyak tentang anggota organisasi kami
      </p>
    </div>

    <!-- Search -->
    <div class="mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari anggota..."
        class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
      />
    </div>

    <!-- Members Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div
        v-for="member in filteredMembers"
        :key="member._id"
        class="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <div class="bg-blue-600 h-48 flex items-center justify-center">
          <span class="text-gray-600">Foto</span>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
          <p class="text-amber-600 font-semibold mb-2">{{ member.position }}</p>
          <p class="text-gray-600 text-sm mb-4">{{ member.bio }}</p>
          <div class="space-y-2 text-sm text-gray-700">
            <p v-if="member.email">📧 {{ member.email }}</p>
            <p v-if="member.phone">📱 {{ member.phone }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredMembers.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada anggota yang ditemukan</p>
    </div>
  </div>
</template>

<script setup>
const members = ref([
  {
    _id: '1',
    name: 'Budi Santoso',
    position: 'Ketua',
    bio: 'Pendiri dan ketua organisasi dengan 20+ tahun pengalaman di seni tradisional',
    email: 'budi@sastrojendro.id',
    phone: '+62 812 3456 7890'
  },
  {
    _id: '2',
    name: 'Siti Nurhaliza',
    position: 'Wakil Ketua I',
    bio: 'Ahli tari tradisional Jawa dan instruktur bersertifikat',
    email: 'siti@sastrojendro.id',
    phone: '+62 812 3456 7891'
  },
  {
    _id: '3',
    name: 'Ahmad Wijaya',
    position: 'Wakil Ketua II',
    bio: 'Spesialis wayang kulit dengan pengalaman pertunjukan internasional',
    email: 'ahmad@sastrojendro.id',
    phone: '+62 812 3456 7892'
  }
])

const searchQuery = ref('')

const filteredMembers = computed(() => {
  if (!searchQuery.value) {
    return members.value
  }

  return members.value.filter(member =>
    member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    // const response = await $fetch('/api/members')
    // members.value = response
  } catch (e) {
    console.error('Error fetching members:', e)
  }
})
</script>
