<template>
  <div class="bg-gradient-to-br from-amber-50 to-yellow-50">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Sastro Jendro Hayuningrat Pangruwating
          </h1>
          <p class="text-xl text-gray-700 mb-8">
            Organisasi yang berdedikasi untuk melestarikan, mengembangkan, dan mempromosikan budaya Jawa tradisional melalui seni, pendidikan, dan kegiatan komunitas.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/berita"
              class="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Baca Berita Terbaru
            </NuxtLink>
            <NuxtLink
              to="/struktur"
              class="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition"
            >
              Lihat Struktur Organisasi
            </NuxtLink>
          </div>
        </div>
        <div class="bg-amber-200 rounded-lg h-64 md:h-96 flex items-center justify-center">
          <span class="text-gray-500">Logo/Gambar Organisasi</span>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">Apa Yang Kami Lakukan</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
          <div class="w-12 h-12 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-2xl">🎭</span>
          </div>
          <h3 class="text-xl font-bold mb-4">Seni & Budaya</h3>
          <p class="text-gray-700">
            Kami mempromosikan seni tradisional Jawa seperti wayang kulit, gamelan, dan tari klasik.
          </p>
        </div>
        <div class="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
          <div class="w-12 h-12 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-2xl">📚</span>
          </div>
          <h3 class="text-xl font-bold mb-4">Pendidikan</h3>
          <p class="text-gray-700">
            Program pelatihan dan pembelajaran untuk generasi muda tentang warisan budaya Jawa.
          </p>
        </div>
        <div class="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
          <div class="w-12 h-12 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-2xl">🤝</span>
          </div>
          <h3 class="text-xl font-bold mb-4">Komunitas</h3>
          <p class="text-gray-700">
            Membangun jaringan pecinta budaya dan mendukung kegiatan komunitas lokal.
          </p>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">Berita Terbaru</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="article in latestArticles"
          :key="article._id"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <div class="bg-gray-200 h-48 flex items-center justify-center">
            <span class="text-gray-500">Gambar Berita</span>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-500 mb-2">{{ formatDate(article.createdAt) }}</p>
            <h3 class="text-xl font-bold mb-3 line-clamp-2">{{ article.title }}</h3>
            <p class="text-gray-700 mb-4 line-clamp-3">{{ article.excerpt }}</p>
            <NuxtLink
              :to="`/berita/${article.slug}`"
              class="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Baca Selengkapnya →
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <NuxtLink
          to="/berita"
          class="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition inline-block"
        >
          Lihat Semua Berita
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const latestArticles = ref([
  {
    _id: '1',
    title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
    excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit yang akan menjadi tempat belajar bagi generasi muda...',
    slug: 'peluncuran-pusat-pembelajaran',
    createdAt: new Date()
  }
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fetch latest articles from API
onMounted(async () => {
  try {
    // const response = await $fetch('/api/articles?limit=3')
    // latestArticles.value = response
  } catch (e) {
    console.error('Error fetching articles:', e)
  }
})
</script>
