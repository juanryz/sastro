<template>
  <div>
    <!-- Admin Header -->
    <header class="bg-white shadow-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Manajemen Berita</h1>
        <NuxtLink
          to="/admin/berita/baru"
          class="px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition"
        >
          ➕ Tambah Berita
        </NuxtLink>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-50 border-r border-slate-200 text-white min-h-screen p-6">
        <nav class="space-y-4">
          <NuxtLink
            to="/admin"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            📊 Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/berita"
            class="block px-4 py-2 rounded-xl bg-amber-600"
          >
            📝 Berita & Blog
          </NuxtLink>
          <NuxtLink
            to="/admin/struktur"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            🏢 Struktur Organisasi
          </NuxtLink>
          <NuxtLink
            to="/admin/anggota"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            👥 Anggota
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Search and Filter -->
        <div class="bg-white rounded-xl shadow p-6 mb-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <select
              v-model="filterStatus"
              class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <option value="">Semua Status</option>
              <option value="published">Dipublikasikan</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <!-- Articles Table -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Judul</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kategori</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tanggal</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="article in articles"
                :key="article._id"
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-sm text-gray-900">{{ article.title }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ article.category }}</td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      article.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    {{ article.status === 'published' ? 'Dipublikasikan' : 'Draft' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(article.createdAt) }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <NuxtLink
                    :to="`/admin/berita/${article._id}/edit`"
                    class="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deleteArticle(article._id)"
                    class="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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

const articles = ref([
  {
    _id: '1',
    title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
    category: 'pendidikan',
    status: 'published',
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Festival Seni Tradisional Tahunan',
    category: 'acara',
    status: 'draft',
    createdAt: new Date('2024-01-10')
  }
])

const searchQuery = ref('')
const filterStatus = ref('')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const deleteArticle = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
    articles.value = articles.value.filter(a => a._id !== id)
  }
}
</script>
