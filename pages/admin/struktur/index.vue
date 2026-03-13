<template>
  <div>
    <!-- Admin Header -->
    <header class="bg-white shadow-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Manajemen Struktur Organisasi</h1>
        <button
          @click="showForm = !showForm"
          class="px-4 py-2 bg-amber-600 text-white rounded-sm hover:bg-amber-700 transition"
        >
          {{ showForm ? '✕ Tutup' : '➕ Edit Struktur' }}
        </button>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white min-h-screen p-6">
        <nav class="space-y-4">
          <NuxtLink
            to="/admin"
            class="block px-4 py-2 rounded-sm hover:bg-gray-700 transition"
          >
            📊 Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/berita"
            class="block px-4 py-2 rounded-sm hover:bg-gray-700 transition"
          >
            📝 Berita & Blog
          </NuxtLink>
          <NuxtLink
            to="/admin/struktur"
            class="block px-4 py-2 rounded-sm bg-amber-600"
          >
            🏢 Struktur Organisasi
          </NuxtLink>
          <NuxtLink
            to="/admin/anggota"
            class="block px-4 py-2 rounded-sm hover:bg-gray-700 transition"
          >
            👥 Anggota
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Form Section -->
        <div v-if="showForm" class="bg-white rounded-sm shadow p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit Struktur Organisasi</h2>

          <!-- Ketua Section -->
          <div class="mb-8 p-6 border border-gray-200 rounded-sm">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Ketua</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Nama</label>
                <input
                  v-model="structure.ketua.name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  v-model="structure.ketua.email"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>
          </div>

          <!-- Wakil Section -->
          <div class="mb-8 p-6 border border-gray-200 rounded-sm">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Wakil Ketua</h3>
            <div
              v-for="(wakil, index) in structure.wakil"
              :key="index"
              class="mb-6 p-4 border border-gray-100 rounded-sm"
            >
              <div class="flex justify-between items-center mb-4">
                <p class="font-semibold">Wakil Ketua {{ index + 1 }}</p>
                <button
                  @click="removeWakil(index)"
                  class="text-red-600 hover:text-red-700 font-semibold"
                >
                  Hapus
                </button>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Nama</label>
                  <input
                    v-model="wakil.name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    v-model="wakil.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>
            </div>
            <button
              @click="addWakil"
              class="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition"
            >
              ➕ Tambah Wakil Ketua
            </button>
          </div>

          <!-- Save Button -->
          <div class="flex gap-4 pt-6 border-t border-gray-200">
            <button
              @click="saveStructure"
              :disabled="isSaving"
              class="px-6 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {{ isSaving ? 'Menyimpan...' : '💾 Simpan Perubahan' }}
            </button>
            <button
              @click="showForm = false"
              class="px-6 py-2 bg-gray-500 text-white rounded-sm hover:bg-gray-600 transition"
            >
              Batal
            </button>
          </div>
        </div>

        <!-- Current Structure Display -->
        <div class="bg-white rounded-sm shadow p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Struktur Saat Ini</h2>

          <div class="text-center mb-8">
            <div class="inline-block bg-amber-100 text-amber-900 rounded-sm p-6">
              <p class="text-sm font-semibold mb-1">Ketua</p>
              <p class="text-xl font-bold">{{ structure.ketua.name }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(wakil, index) in structure.wakil"
              :key="index"
              class="bg-amber-50 border border-amber-200 rounded-sm p-4"
            >
              <p class="text-sm font-semibold text-amber-900 mb-2">Wakil Ketua {{ index + 1 }}</p>
              <p class="text-lg font-bold text-gray-900">{{ wakil.name }}</p>
            </div>
          </div>
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

const showForm = ref(false)
const isSaving = ref(false)
const structure = ref({
  ketua: {
    name: 'Budi Santoso',
    title: 'Ketua',
    email: 'ketua@sastrojendro.id'
  },
  wakil: [
    {
      name: 'Siti Nurhaliza',
      title: 'Wakil Ketua I',
      email: 'wakil1@sastrojendro.id'
    },
    {
      name: 'Ahmad Wijaya',
      title: 'Wakil Ketua II',
      email: 'wakil2@sastrojendro.id'
    }
  ]
})

const addWakil = () => {
  structure.value.wakil.push({
    name: '',
    title: `Wakil Ketua ${structure.value.wakil.length + 1}`,
    email: ''
  })
}

const removeWakil = (index) => {
  structure.value.wakil.splice(index, 1)
}

const saveStructure = async () => {
  isSaving.value = true
  try {
    // const response = await $fetch('/api/organization-structure', {
    //   method: 'PUT',
    //   body: structure.value
    // })
    alert('Struktur organisasi berhasil diperbarui!')
    showForm.value = false
  } catch (e) {
    alert('Gagal menyimpan struktur organisasi')
  } finally {
    isSaving.value = false
  }
}
</script>
