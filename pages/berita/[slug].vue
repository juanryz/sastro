<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Back Button -->
    <NuxtLink to="/berita" class="text-amber-600 hover:text-amber-700 mb-6 inline-flex items-center">
      ← Kembali ke Berita
    </NuxtLink>

    <!-- Article Header -->
    <article v-if="article">
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
            {{ article.category }}
          </span>
          <p class="text-gray-500">{{ formatDate(article.createdAt) }}</p>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
        <p class="text-xl text-gray-700 mb-6">{{ article.excerpt }}</p>
      </div>

      <!-- Article Image -->
      <div class="bg-blue-600 h-96 rounded-sm mb-8 flex items-center justify-center">
        <span class="text-gray-600">Gambar Artikel</span>
      </div>

      <!-- Article Content -->
      <div class="prose max-w-none mb-12">
        <div v-html="article.content" />
      </div>

      <!-- Share Section -->
      <div class="border-t border-b border-gray-200 py-8 mb-12">
        <p class="mb-4 text-gray-700">Bagikan artikel ini:</p>
        <div class="flex gap-4">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
            Facebook
          </button>
          <button class="px-4 py-2 bg-blue-400 text-white rounded-sm hover:bg-blue-500">
            Twitter
          </button>
          <button class="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700">
            WhatsApp
          </button>
        </div>
      </div>

      <!-- Related Articles -->
      <section v-if="relatedArticles.length > 0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Artikel Terkait</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle._id"
            class="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <div class="bg-gray-200 h-40 flex items-center justify-center">
              <span class="text-gray-500">Gambar</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold mb-2 line-clamp-2">{{ relatedArticle.title }}</h3>
              <NuxtLink
                :to="`/berita/${relatedArticle.slug}`"
                class="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Baca →
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </article>

    <!-- Loading State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500">Memuat artikel...</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const article = ref(null)
const relatedArticles = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    // const response = await $fetch(`/api/articles/${route.params.slug}`)
    // article.value = response

    // Mock data
    article.value = {
      _id: '1',
      title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
      excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit...',
      slug: 'peluncuran-pusat-pembelajaran',
      category: 'pendidikan',
      createdAt: new Date('2024-01-15'),
      content: `
        <p>Dalam upaya pelestarian seni tradisional Jawa, Sastro Jendro Hayuningrat Pangruwating dengan bangga mengumumkan pendirian Pusat Pembelajaran Wayang Kulit.</p>
        <h2>Tujuan Pusat Pembelajaran</h2>
        <p>Pusat ini dibuka dengan tujuan untuk:</p>
        <ul>
          <li>Mempromosikan seni wayang kulit kepada generasi muda</li>
          <li>Memberikan pelatihan intensif tentang seni wayang</li>
          <li>Melestarikan warisan budaya Jawa yang kaya</li>
          <li>Membangun komunitas pecinta seni tradisional</li>
        </ul>
        <p>Kami mengundang semua yang tertarik untuk bergabung dengan program pelatihan kami yang dirancang oleh para ahli wayang kulit berpengalaman.</p>
      `
    }

    relatedArticles.value = [
      {
        _id: '2',
        title: 'Festival Seni Tradisional Tahunan',
        slug: 'festival-seni-tahunan'
      }
    ]
  } catch (e) {
    console.error('Error fetching article:', e)
  }
})
</script>
