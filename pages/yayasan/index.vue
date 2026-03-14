<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-900">
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <div class="inline-flex w-20 h-20 rounded-[2rem] bg-indigo-100 text-indigo-600 items-center justify-center text-4xl mb-6 shadow-inner border border-white">🏛️</div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-800">Yayasan Sastro Jendro</h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">Wadah resmi untuk pelestarian, perlindungan, dan pengembangan seni budaya tradisional agar selaras dengan kehidupan modern tanpa kehilangan hakikatnya.</p>
    </div>

    <!-- Visi & Misi Section -->
    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <div class="rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-blue-600 p-10 text-white shadow-2xl shadow-indigo-200/50">
        <h2 class="text-3xl font-bold mb-4">Visi Kami</h2>
        <p class="text-indigo-100 text-lg leading-relaxed mb-8">
          Menjadi pusat kebudayaan terdepan yang menjaga kemurnian "Sastra Jendra" melalui pendidikan, pelestarian, dan pemberdayaan komunitas untuk menciptakan manusia yang harmonis dengan alam dan sesama.
        </p>
        <div class="w-16 h-1 bg-indigo-300/50 rounded-full"></div>
      </div>
      
      <div class="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/80 p-10 shadow-xl shadow-slate-200/50">
        <h2 class="text-3xl font-bold mb-6 text-slate-800">Misi Utama</h2>
        <ul class="space-y-4">
          <li class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><span class="font-bold text-sm">1</span></div>
            <p class="text-slate-700">Menyelenggarakan pelatihan seni dan budaya (gamelan, wayang, tari) untuk generasi muda secara inklusif.</p>
          </li>
          <li class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><span class="font-bold text-sm">2</span></div>
            <p class="text-slate-700">Memberikan ruang ekspresi dan panggung apresiasi karya seni melalui event lokal dan nasional.</p>
          </li>
          <li class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><span class="font-bold text-sm">3</span></div>
            <p class="text-slate-700">Berperan aktif dalam kegiatan sosial masyarakat sekitar basecamp operasional.</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Program Kerja Utama -->
    <div class="mb-20">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-slate-800">Pilar Program Yayasan</h2>
        <p class="text-slate-600 mt-2">Fokus kerja kami untuk masa depan yang berbudaya</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-lg shadow-slate-200/40 hover:-translate-y-1 transition duration-300 text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-4">🎓</div>
          <h3 class="font-bold text-xl text-slate-800 mb-3">Pendidikan & Literasi</h3>
          <p class="text-slate-600 text-sm leading-relaxed">Pengembangan kurikulum sastra Jawa, pengadaan modul pelatihan tari/gamelan, serta beasiswa untuk talenta muda yang berbakat namun kurang mampu.</p>
        </div>
        
        <div class="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-lg shadow-slate-200/40 hover:-translate-y-1 transition duration-300 text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4">❤️</div>
          <h3 class="font-bold text-xl text-slate-800 mb-3">Sosial Masyarakat</h3>
          <p class="text-slate-600 text-sm leading-relaxed">Penyaluran dana bantuan sosial, advokasi kesejahteraan untuk pelaku seni tradisional sepuh, dan peduli tanggap bencana daerah.</p>
        </div>

        <div class="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-lg shadow-slate-200/40 hover:-translate-y-1 transition duration-300 text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl mb-4">🎭</div>
          <h3 class="font-bold text-xl text-slate-800 mb-3">Produksi Kesenian</h3>
          <p class="text-slate-600 text-sm leading-relaxed">Melakukan inovasi pada pertunjukan kesenian klasik dan menyelenggarakan setidaknya 4 Pementasan Skala Besar setiap tahunnya untuk publik.</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
useHead({
  title: 'Yayasan - Sastro Jendro'
})
</script>
