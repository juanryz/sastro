<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Berita & Blog</h1>
      <p class="text-xl text-gray-700">
        Tetap update dengan berita terbaru dan artikel menarik tentang budaya Jawa
      </p>
    </div>

    <!-- Search and Filter -->
    <div class="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari berita..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
      />
      <select
        v-model="selectedCategory"
        class="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
      >
        <option value="">Semua Kategori</option>
        <option value="seni">Seni</option>
        <option value="pendidikan">Pendidikan</option>
        <option value="acara">Acara</option>
        <option value="komunitas">Komunitas</option>
      </select>
    </div>

    <!-- Articles List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <div
        v-for="article in filteredArticles"
        :key="article._id"
        class="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition"
      >
        <div class="bg-blue-600 h-48 flex items-center justify-center">
          <span class="text-gray-600">Gambar Berita</span>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
              {{ article.category }}
            </span>
            <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
          </div>
          <h3 class="text-xl font-bold mb-3 line-clamp-2 hover:text-amber-600">
            {{ article.title }}
          </h3>
          <p class="text-gray-700 mb-4 line-clamp-3">{{ article.excerpt }}</p>
          <NuxtLink
            :to="`/berita/${article.slug}`"
            class="inline-block px-4 py-2 bg-amber-600 text-white rounded-sm hover:bg-amber-700 transition"
          >
            Baca Selengkapnya
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredArticles.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada berita yang ditemukan</p>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-12">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-sm transition',
          currentPage === page
            ? 'bg-amber-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
const articles = ref([
  {
    _id: '1',
    title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
    excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit...',
    slug: 'peluncuran-pusat-pembelajaran',
    category: 'pendidikan',
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Festival Seni Tradisional Tahunan',
    excerpt: 'Bergabunglah dengan kami dalam merayakan seni dan budaya Jawa...',
    slug: 'festival-seni-tahunan',
    category: 'acara',
    createdAt: new Date('2024-01-10')
  }
])

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 9

const filteredArticles = computed(() => {
  let filtered = articles.value

  if (searchQuery.value) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  return filtered.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
})

const totalPages = computed(() => {
  let filtered = articles.value

  if (searchQuery.value) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  return Math.ceil(filtered.length / itemsPerPage)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fetch articles from API
onMounted(async () => {
  try {
    // const response = await $fetch('/api/articles')
    // articles.value = response
  } catch (e) {
    console.error('Error fetching articles:', e)
  }
})
</script>
