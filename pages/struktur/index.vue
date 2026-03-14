<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Struktur Organisasi</h1>
      <p class="text-xl text-gray-700">
        Kenali tim kepemimpinan dan struktur organisasi kami
      </p>
    </div>

    <!-- Organization Chart -->
    <div v-if="organizationStructure" class="bg-white rounded-xl shadow-lg p-8 mb-12">
      <!-- Ketua -->
      <div class="text-center mb-12">
        <div class="inline-block bg-amber-600 text-white rounded-xl p-6 mb-4 min-w-64">
          <p class="text-sm font-semibold text-amber-100 mb-1">Posisi</p>
          <p class="text-2xl font-bold">{{ organizationStructure.ketua.name }}</p>
          <p class="text-amber-200 text-sm mt-2">{{ organizationStructure.ketua.title }}</p>
        </div>
      </div>

      <!-- Connecting Line -->
      <div class="flex justify-center mb-8">
        <div class="w-1 h-12 bg-amber-300"></div>
      </div>

      <!-- Vice Leaders -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div
          v-for="wakil in organizationStructure.wakil"
          :key="wakil._id"
          class="text-center"
        >
          <div class="bg-amber-100 text-amber-900 rounded-xl p-6 inline-block min-w-56">
            <p class="text-sm font-semibold mb-1">{{ wakil.title }}</p>
            <p class="text-xl font-bold">{{ wakil.name }}</p>
            <p class="text-sm text-amber-700 mt-2">{{ wakil.email }}</p>
          </div>
        </div>
      </div>

      <!-- Departments -->
      <div v-if="organizationStructure.departments.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Departemen</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="department in organizationStructure.departments"
            :key="department._id"
            class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-amber-200"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ department.name }}</h3>
            <div class="space-y-3">
              <div
                v-for="member in department.members"
                :key="member._id"
                class="bg-white rounded p-3 border border-gray-200"
              >
                <p class="font-semibold text-gray-800">{{ member.name }}</p>
                <p class="text-sm text-gray-600">{{ member.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500">Memuat struktur organisasi...</p>
    </div>

    <!-- Contact CTA -->
    <div class="bg-amber-50 rounded-xl p-8 text-center border border-amber-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Ingin Bergabung?</h2>
      <p class="text-gray-700 mb-6">
        Kami terbuka untuk anggota baru yang ingin berkontribusi dalam melestarikan budaya Jawa
      </p>
      <NuxtLink
        to="/kontak"
        class="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition inline-block"
      >
        Hubungi Kami
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const organizationStructure = ref(null)

onMounted(async () => {
  try {
    // const response = await $fetch('/api/organization-structure')
    // organizationStructure.value = response

    // Mock data
    organizationStructure.value = {
      ketua: {
        name: 'Budi Santoso',
        title: 'Ketua',
        email: 'ketua@sastrojendro.id'
      },
      wakil: [
        {
          _id: '1',
          name: 'Siti Nurhaliza',
          title: 'Wakil Ketua I',
          email: 'wakil1@sastrojendro.id'
        },
        {
          _id: '2',
          name: 'Ahmad Wijaya',
          title: 'Wakil Ketua II',
          email: 'wakil2@sastrojendro.id'
        }
      ],
      departments: [
        {
          _id: '1',
          name: 'Departemen Seni',
          members: [
            { _id: '1', name: 'Dewi Lestari', position: 'Ketua Departemen' },
            { _id: '2', name: 'Roni Hermawan', position: 'Koordinator Wayang' },
            { _id: '3', name: 'Eka Putri', position: 'Koordinator Tari' }
          ]
        },
        {
          _id: '2',
          name: 'Departemen Pendidikan',
          members: [
            { _id: '4', name: 'Prof. Darmawan', position: 'Ketua Departemen' },
            { _id: '5', name: 'Lisda Suryani', position: 'Program Pelatihan' }
          ]
        },
        {
          _id: '3',
          name: 'Departemen Acara & Kegiatan',
          members: [
            { _id: '6', name: 'Hendra Gunawan', position: 'Ketua Departemen' },
            { _id: '7', name: 'Maya Kusuma', position: 'Koordinator Event' }
          ]
        }
      ]
    }
  } catch (e) {
    console.error('Error fetching organization structure:', e)
  }
})
</script>
