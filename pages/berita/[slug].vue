<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-900">
    <!-- Back Button -->
    <div class="mb-10">
      <NuxtLink to="/berita" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all group font-bold text-sm">
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Berita
      </NuxtLink>
    </div>

    <article v-if="article" class="relative">
      <!-- Ambient Background Glow -->
      <div class="absolute top-0 right-0 -translate-y-20 translate-x-20 w-[400px] h-[400px] bg-indigo-300/30 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div class="absolute top-40 left-0 -translate-x-20 w-[300px] h-[300px] bg-sky-300/30 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      <!-- Article Header -->
      <div class="mb-10 lg:mb-14 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <span class="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-200">
            {{ article.category }}
          </span>
          <span class="text-sm font-semibold text-slate-500 whitespace-nowrap">{{ formatDate(article.createdAt) }}</span>
        </div>
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight mb-6">
          {{ article.title }}
        </h1>
        
        <p class="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
          {{ article.excerpt }}
        </p>
      </div>

      <!-- Article Hero Image -->
      <div class="relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl shadow-indigo-200/50 mb-12 border border-white/40">
        <!-- Placeholder Glassmorphism Image Component -->
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-sky-400/20 to-purple-500/20 backdrop-blur-sm"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-inner text-4xl transform -rotate-6">📷</div>
        </div>
        
        <!-- Bottom inset gradient for depth -->
        <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      </div>

      <!-- Main Content Block -->
      <div class="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 sm:p-12 mb-16">
        <div class="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-3xl prose-img:shadow-xl">
          <div v-html="article.content"></div>
        </div>
        
        <!-- Custom Callout injected dynamically if needed -->
        <div class="mt-12 bg-gradient-to-r from-indigo-50 to-sky-50 rounded-[1.5rem] p-6 border border-indigo-100 flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1">💡</div>
          <p class="text-sm font-medium text-slate-700 leading-relaxed m-0">
            Dukung pelestarian budaya kita. Bergabunglah menjadi anggota sastro jendro untuk terlibat langsung dalam program-program bermakna ini. <NuxtLink to="/register" class="text-indigo-600 font-bold hover:underline">Daftar sekarang</NuxtLink>.
          </p>
        </div>
      </div>

      <!-- Share & Tools Matrix -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-y border-slate-200/60 mb-16">
        <div class="flex items-center gap-3">
          <span class="font-bold text-slate-800 text-sm uppercase tracking-wider">Bagikan:</span>
          <div class="flex gap-2">
            <button class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition shadow-sm" aria-label="Share on Facebook">
              f
            </button>
            <button class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition shadow-sm" aria-label="Share on Twitter">
              𝕏
            </button>
            <button class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition shadow-sm" aria-label="Share on WhatsApp">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.172c-1.527-.008-3.05-.386-4.444-1.107L3.102 21.05l1.01-4.32a9.695 9.695 0 01-1.282-4.707c-.01-5.352 4.354-9.696 9.71-9.696 5.356 0 9.71 4.344 9.71 9.696 0 5.352-4.354 9.696-9.71 9.696zm-4.755-2.656a7.712 7.712 0 004.756 1.62c4.256 0 7.71-3.454 7.71-7.71 0-4.256-3.455-7.712-7.712-7.712-4.255 0-7.71 3.456-7.71 7.712 0 1.673.535 3.237 1.493 4.54l-.62 2.651 2.763-.585c.046-.01.092-.016.138-.016h.182z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
            </button>
          </div>
        </div>
        
        <div class="flex gap-4">
          <button class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
            Simpan Artikel
          </button>
        </div>
      </div>

      <!-- Related Articles Section -->
      <section v-if="relatedArticles.length > 0" class="mb-10">
        <h3 class="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <span class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">📚</span>
          Bacaan Terkait
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle._id"
            class="group flex flex-col bg-white/50 backdrop-blur-xl border border-white/80 rounded-[2rem] overflow-hidden shadow-lg shadow-indigo-100/30 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="h-40 bg-gradient-to-br from-slate-100 via-white to-sky-50 relative overflow-hidden flex items-center justify-center">
               <div class="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <span class="text-4xl opacity-20 transform group-hover:scale-110 transition duration-300">🗞️</span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-center">
              <h4 class="font-bold text-slate-800 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition">
                {{ relatedArticle.title }}
              </h4>
              <NuxtLink
                :to="`/berita/${relatedArticle.slug}`"
                class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-500 mt-auto w-max"
              >
                Baca Artikel
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>
    </article>

    <!-- Loading State -->
    <div v-else class="text-center py-32 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60">
      <div class="inline-block animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
      <p class="text-slate-500 font-bold tracking-wide">Memuat rincian berita...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const { publishedArticles, formatDate } = useAppData()

// Find article by slug from centralized database
const article = computed(() => {
  const slug = route.params.slug
  const found = publishedArticles.value.find(a => a.slug === slug)
  if (found) {
    return {
      ...found,
      content: found.content || `
        <p>${found.excerpt}</p>
        <h3>Detail Lengkap</h3>
        <p>Konten detail untuk artikel ini sedang dalam proses penulisan. Silakan periksa kembali dalam beberapa waktu untuk membaca artikel selengkapnya.</p>
        <p>Yayasan Sastro Jendro berkomitmen untuk terus menyediakan konten berkualitas seputar pelestarian budaya Jawa dan kegiatan komunitas kami.</p>
      `
    }
  }
  return null
})

// Related articles: same category, different slug
const relatedArticles = computed(() => {
  if (!article.value) return []
  return publishedArticles.value
    .filter(a => a.category === article.value.category && a.slug !== article.value.slug)
    .slice(0, 2)
})

onMounted(() => {
  if (article.value) {
    useHead({ title: `${article.value.title} - Sastro Jendro Berita` })
  }
})
</script>
