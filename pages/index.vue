<template>
  <div class="bg-gradient-to-br from-indigo-50 via-white to-sky-50 text-slate-900">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div class="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-indigo-600 text-xs font-semibold uppercase tracking-[0.2em]">Terbaru</p>
          <h1 class="mt-5 text-4xl sm:text-5xl font-bold leading-tight tracking-tight">Sastro Jendro — Melestarikan Budaya Jawa dengan Semangat Baru</h1>
          <p class="mt-4 text-slate-600 max-w-xl">Kami menggabungkan tradisi, seni, dan kegiatan komunitas agar budaya luhur tetap hidup, relevan, dan bisa dinikmati generasi sekarang.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/register" class="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-2.5 font-semibold text-white hover:opacity-90 transition">Gabung Sekarang</NuxtLink>
            <NuxtLink to="/member/login" class="rounded-3xl border border-indigo-200 bg-white/50 px-5 py-2.5 text-slate-900 hover:bg-white/70 shadow-sm backdrop-blur-sm transition">Masuk Anggota</NuxtLink>
          </div>
        </div>
        <div class="rounded-3xl border border-white/80 bg-white/50 shadow-2xl shadow-indigo-100/50 p-5 backdrop-blur-md">
          <div class="h-72 rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-600 flex items-center justify-center text-slate-600">
            <div class="text-center">
              <p class="text-sm uppercase tracking-[0.2em] text-indigo-500">Komunitas</p>
              <p class="mt-3 text-2xl font-bold text-white">Kesenian</p>
              <p class="mt-1 text-slate-600">Pelatihan & pertunjukan setiap bulan.</p>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div class="rounded-3xl bg-white/60 shadow-md shadow-slate-200/30 border border-white/60 p-3"><div class="font-semibold text-indigo-600">35+</div><div>Event Budaya</div></div>
            <div class="rounded-3xl bg-white/60 shadow-md shadow-slate-200/30 border border-white/60 p-3"><div class="font-semibold text-indigo-600">120+</div><div>Anggota Aktif</div></div>
            <div class="rounded-3xl bg-white/60 shadow-md shadow-slate-200/30 border border-white/60 p-3"><div class="font-semibold text-indigo-600">20+</div><div>Workshop & kelas</div></div>
            <div class="rounded-3xl bg-white/60 shadow-md shadow-slate-200/30 border border-white/60 p-3"><div class="font-semibold text-indigo-600">15+</div><div>Kolaborasi Sekolah</div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid gap-5 md:grid-cols-3">
        <article class="rounded-3xl border border-white/60 bg-white/60 shadow-xl shadow-slate-200/50 backdrop-blur-sm p-5">
          <div class="text-indigo-600 text-lg">🎭</div>
          <h3 class="mt-3 text-xl font-semibold">Seni & Budaya</h3>
          <p class="mt-2 text-slate-600 text-sm">Workshop wayang, gamelan, dan latihan tari klasik reguler untuk publik.</p>
        </article>
        <article class="rounded-3xl border border-white/60 bg-white/60 shadow-xl shadow-slate-200/50 backdrop-blur-sm p-5">
          <div class="text-blue-600 text-lg">📚</div>
          <h3 class="mt-3 text-xl font-semibold">Pendidikan</h3>
          <p class="mt-2 text-slate-600 text-sm">Program pelatihan generasi muda dengan guru budaya terlatih.</p>
        </article>
        <article class="rounded-3xl border border-white/60 bg-white/60 shadow-xl shadow-slate-200/50 backdrop-blur-sm p-5">
          <div class="text-emerald-600 text-lg">🤝</div>
          <h3 class="mt-3 text-xl font-semibold">Komunitas</h3>
          <p class="mt-2 text-slate-600 text-sm">Kolaborasi, event bersama, dan dukungan sosial untuk seluruh anggota.</p>
        </article>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-3xl font-bold">Berita Terbaru</h2>
          <p class="text-slate-600">Ikuti kabar acara dan kegiatan paling penting.</p>
        </div>
        <NuxtLink to="/berita" class="text-indigo-600 text-sm font-semibold hover:text-indigo-500">Lihat semua →</NuxtLink>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <article v-for="article in latestArticles" :key="article._id" class="rounded-3xl border border-white/60 bg-white/50 shadow-lg shadow-slate-200/40 backdrop-blur-sm p-4">
          <div class="h-32 rounded-3xl bg-gradient-to-r from-indigo-100 via-white to-sky-100 text-indigo-900 flex items-end p-3 font-bold">Berita</div>
          <div class="mt-3">
            <div class="text-xs text-slate-500">{{ formatDate(article.createdAt) }}</div>
            <h3 class="mt-2 font-semibold text-slate-900">{{ article.title }}</h3>
            <p class="mt-1 text-slate-600 text-sm line-clamp-3">{{ article.excerpt }}</p>
          </div>
          <NuxtLink :to="`/berita/${article.slug}`" class="mt-3 inline-block text-indigo-600 text-sm font-semibold hover:text-indigo-500">Baca selengkapnya →</NuxtLink>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
const latestArticles = ref([
  { _id: '1', title: 'Peluncuran Pusat Pembelajaran Wayang Kulit', excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit yang akan menjadi tempat belajar bagi generasi muda...', slug: 'peluncuran-pusat-pembelajaran', createdAt: new Date() },
  { _id: '2', title: 'Festival Kesenian Jawa 2026', excerpt: 'Festival tahunan menampilkan gamelan, tari, dan wayang dengan peserta dari berbagai desa.', slug: 'festival-kesenian-jawa-2026', createdAt: new Date(Date.now() - 86400000) },
  { _id: '3', title: 'Kelas Pemuda: Gamelan untuk Pemula', excerpt: 'Kelas intensif 4 minggu untuk pemuda yang ingin belajar gamelan tradisional secara praktis.', slug: 'kelas-pemuda-gamelan', createdAt: new Date(Date.now() - 2 * 86400000) }
])

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
</script>
