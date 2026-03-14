<template>
  <div>
    <!-- Admin Header -->
    <header class="bg-white shadow-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Manajemen Anggota</h1>
        <NuxtLink
          to="/admin/anggota/baru"
          class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          ➕ Tambah Anggota
        </NuxtLink>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white min-h-screen p-6">
        <nav class="space-y-4">
          <NuxtLink
            to="/admin"
            class="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            📊 Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/berita"
            class="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            📝 Berita & Blog
          </NuxtLink>
          <NuxtLink
            to="/admin/struktur"
            class="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            🏢 Struktur Organisasi
          </NuxtLink>
          <NuxtLink
            to="/admin/anggota"
            class="block px-4 py-2 rounded-lg bg-amber-600"
          >
            👥 Anggota
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Search -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari anggota..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        <!-- Members Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nama</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Posisi</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telepon</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="member in filteredMembers"
                :key="member._id"
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-sm text-gray-900 font-semibold">{{ member.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ member.position }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ member.email }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ member.phone }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <NuxtLink
                    :to="`/admin/anggota/${member._id}/edit`"
                    class="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deleteMember(member._id)"
                    class="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMembers.length === 0" class="text-center py-12">
          <p class="text-gray-500">Tidak ada anggota yang ditemukan</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'admin'
})

const members = ref([
  {
    _id: '1',
    name: 'Budi Santoso',
    position: 'Ketua',
    email: 'budi@sastrojendro.id',
    phone: '+62 812 3456 7890'
  },
  {
    _id: '2',
    name: 'Siti Nurhaliza',
    position: 'Wakil Ketua I',
    email: 'siti@sastrojendro.id',
    phone: '+62 812 3456 7891'
  }
])

const searchQuery = ref('')

const filteredMembers = computed(() => {
  if (!searchQuery.value) {
    return members.value
  }

  return members.value.filter(member =>
    member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const deleteMember = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
    members.value = members.value.filter(m => m._id !== id)
  }
}
</script>
