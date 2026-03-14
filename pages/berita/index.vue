<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-900">
    <!-- Page Header -->
    <div class="mb-12 text-center max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Berita & Artikel</h1>
      <p class="text-lg text-slate-600">
        Tetap update dengan kabar terbaru, kegiatan komunitas, dan artikel menginspirasi seputar pelestarian budaya Jawa.
      </p>
    </div>

    <!-- Search and Filter -->
    <div class="mb-10 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari berita atau artikel..."
          class="w-full pl-5 pr-10 py-3 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm shadow-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-slate-800 placeholder-slate-400"
        />
        <svg class="absolute right-4 top-3.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <select
        v-model="selectedCategory"
        class="w-full sm:w-56 px-4 py-3 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm shadow-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-slate-800 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat"
      >
        <option value="">Semua Kategori</option>
        <option value="seni">Seni & Budaya</option>
        <option value="pendidikan">Pendidikan</option>
        <option value="acara">Event & Acara</option>
        <option value="komunitas">Komunitas</option>
      </select>
    </div>

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <article
        v-for="article in filteredArticles"
        :key="article._id"
        class="group flex flex-col bg-white/50 backdrop-blur-xl border border-white/80 rounded-[2rem] overflow-hidden shadow-lg shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/60 hover:-translate-y-1 transition-all duration-300"
      >
        <div class="h-48 bg-gradient-to-br from-indigo-100 via-white to-sky-100 relative overflow-hidden flex items-center justify-center">
          <div class="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="text-indigo-400 font-bold tracking-widest uppercase text-sm mix-blend-multiply opacity-50">{{ article.category }}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-3 py-1 bg-indigo-100/80 text-indigo-700 rounded-full text-[11px] font-bold uppercase tracking-[0.1em]">
              {{ article.category }}
            </span>
            <span class="text-xs text-slate-500 font-medium">{{ formatDate(article.createdAt) }}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
            {{ article.title }}
          </h3>
          <p class="text-slate-600 mb-5 line-clamp-3 text-sm flex-1 leading-relaxed">
            {{ article.excerpt }}
          </p>
          <NuxtLink
            :to="`/berita/${article.slug}`"
            class="inline-flex w-max items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Baca Selengkapnya
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-if="filteredArticles.length === 0" class="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/80 shadow-inner">
      <div class="text-indigo-300 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-slate-600 text-lg font-medium">Tidak ada artikel yang sesuai dengan pencarian Anda.</p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-12">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all',
          currentPage === page
            ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30'
            : 'bg-white/60 backdrop-blur-md text-slate-600 hover:bg-white border border-white/80 shadow-sm'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const articles = ref([
  {
    _id: '1',
    title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
    excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit, menjadi tempat belajar khusus bagi generasi muda yang tertarik dengan kesenian ini. Program ini mencakup dasar-dasar dalang, musik iringan, dan pembuatan wayang.',
    slug: 'peluncuran-pusat-pembelajaran',
    category: 'pendidikan',
    createdAt: new Date('2026-03-10')
  },
  {
    _id: '2',
    title: 'Festival Seni Jawa Sastro Jendro 2026',
    excerpt: 'Bergabunglah dengan kami dalam merayakan seni dan budaya Jawa di festival tahunan kami! Acara ini akan dimeriahkan oleh pentas tari tradisional, pameran kerajinan tangan lokal, dan kompetisi gamelan antar pemuda.',
    slug: 'festival-seni-tahunan-2026',
    category: 'acara',
    createdAt: new Date('2026-03-05')
  },
  {
    _id: '3',
    title: 'Kelas Pemuda: Gamelan Tingkat Dasar',
    excerpt: 'Pendaftaran untuk kelas musik gamelan gelombang kedua telah dibuka. Kelas ini dirancang khusus bagi pemula dengan instruktur profesional. Mari bersama lestarikan alunan nada Nusantara!',
    slug: 'kelas-pemuda-gamelan-dasar',
    category: 'seni',
    createdAt: new Date('2026-02-28')
  },
  {
    _id: '4',
    title: 'Gotong Royong Rehabilitasi Sanggar Komunitas',
    excerpt: 'Sabtu lalu, warga dan anggota Yayasan bahu-membahu memperbaiki atap dan panggung sanggar seni agar dapat digunakan dengan nyaman untuk persiapan pentas bulan depan. Terima kasih kepada semua relawan.',
    slug: 'gotong-royong-rehabilitasi-sanggar',
    category: 'komunitas',
    createdAt: new Date('2026-02-15')
  },
  {
    _id: '5',
    title: 'Mengenal Filosofi Sastra Jendra Hayuningrat',
    excerpt: 'Sastra Jendra bukan sekadar kisah lakon pewayangan, melainkan sebuah ajaran luhur tentang keselamatan, peleburan angkara murka, dan bagaimana mencapai kedamaian sejati sebagai manusia.',
    slug: 'mengenal-filosofi-sastra-jendra',
    category: 'pendidikan',
    createdAt: new Date('2026-02-01')
  },
  {
    _id: '6',
    title: 'Rapat Tahunan Koperasi Anggota 2026',
    excerpt: 'Pemberitahuan kepada seluruh anggota koperasi, rapat tahunan (RAT) akan diselenggarakan untuk membagikan Sisa Hasil Usaha (SHU) dan menyusun program kerja komunitas setahun ke depan.',
    slug: 'rapat-tahunan-koperasi-2026',
    category: 'komunitas',
    createdAt: new Date('2026-01-20')
  }
])

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

const filteredArticles = computed(() => {
  let filtered = articles.value

  if (searchQuery.value) {
    const term = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(term) ||
      a.excerpt.toLowerCase().includes(term)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  // Sorting descending by date
  filtered.sort((a, b) => b.createdAt - a.createdAt)

  return filtered.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
})

const totalPages = computed(() => {
  let filtered = articles.value

  if (searchQuery.value) {
    const term = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(term)
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
</script>
