<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-900">
    <PageLoader />
    <div class="reveal text-center mb-16 max-w-3xl mx-auto">
      <div class="inline-flex w-20 h-20 rounded-[2rem] bg-indigo-100 text-indigo-600 items-center justify-center text-4xl mb-6 shadow-inner border border-white">🤝</div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-800">Koperasi Anggota</h1>
      <p class="mt-4 text-lg text-slate-600 leading-relaxed">Sistem pemberdayaan ekonomi komunitas dengan azaz kekeluargaan, mengintegrasikan semangat gotong royong budaya untuk kesejahteraan riil.</p>
    </div>

    <!-- Layanan Utama Stats -->
    <div class="reveal delay-1 bg-white/40 backdrop-blur-xl border border-white/80 shadow-xl shadow-indigo-100/40 rounded-[2.5rem] p-8 md:p-12 mb-16">
      <div class="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
        <div class="p-4">
          <div class="text-4xl font-extrabold text-indigo-600 mb-2">Simpan Pinjam</div>
          <p class="text-slate-600 font-medium text-sm">Bunga transparan dan syariah</p>
        </div>
        <div class="p-4">
          <div class="text-4xl font-extrabold text-indigo-600 mb-2">Pasar UMKM</div>
          <p class="text-slate-600 font-medium text-sm">Dukungan produk karya anggota</p>
        </div>
        <div class="p-4">
          <div class="text-4xl font-extrabold text-indigo-600 mb-2">S.H.U</div>
          <p class="text-slate-600 font-medium text-sm">Sisa Hasil Usaha Tahunan</p>
        </div>
      </div>
    </div>

    <!-- Keuntungan Layout -->
    <div class="grid lg:grid-cols-12 gap-10 items-center mb-20">
      <div class="reveal-left lg:col-span-5 relative">
        <div class="aspect-square bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-[3rem] p-8 shadow-2xl text-white flex flex-col justify-center">
          <div class="text-6xl mb-6">📈</div>
          <h2 class="text-3xl font-bold mb-4">Membangun Ekonomi Bersama</h2>
          <p class="text-indigo-50 leading-relaxed">
            Menjadi seniman dan pelestari budaya sering dihadapkan pada ketidakpastian. Koperasi Sastro Jendro lahir sebagai solusi ekosistem agar setiap anggota punya jaring pengaman ekonomi yang kokoh dari dan untuk bersama.
          </p>
        </div>
        <!-- Decorative blob -->
        <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 -z-10"></div>
      </div>
      
      <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
        <div class="reveal delay-1 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-lg shadow-slate-200/50">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4">💳</div>
          <h3 class="font-bold text-lg mb-2 text-slate-800">Simpanan Pasti</h3>
          <p class="text-sm text-slate-600">Terdiri dari Simpanan Pokok dan Wajib yang aman, transparan, dan dapat dipantau langsung lewat dashboard anggota.</p>
        </div>
        
        <div class="reveal delay-2 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-lg shadow-slate-200/50">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4">🤝</div>
          <h3 class="font-bold text-lg mb-2 text-slate-800">Pinjaman Lunak</h3>
          <p class="text-sm text-slate-600">Bantuan pinjaman untuk kebutuhan pengembangan kreasi, alat seni, atau keperluan darurat anggota tanpa proses memberatkan.</p>
        </div>
        
        <div class="reveal delay-3 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-lg shadow-slate-200/50">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4">🛍️</div>
          <h3 class="font-bold text-lg mb-2 text-slate-800">Retail Komunitas</h3>
          <p class="text-sm text-slate-600">Toko fisik dan online yang memprioritaskan penjualan produk UKM anggota—dari batik hingga instrumen musik.</p>
        </div>
        
        <div class="reveal delay-4 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-lg shadow-slate-200/50">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4">🏆</div>
          <h3 class="font-bold text-lg mb-2 text-slate-800">S.H.U Transparan</h3>
          <p class="text-sm text-slate-600">Pembagian profit tahunan secara proporsional sesuai partisipasi simpanan dan transaksi keaktifan anggota.</p>
        </div>
      </div>
    </div>

    <!-- How to join -->
    <div class="reveal-scale bg-slate-800 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
      <!-- Glow effect inside -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/30 blur-[100px] rounded-[100%] pointer-events-none"></div>
      
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Syarat Bergabung Koperasi</h2>
        <p class="text-slate-300 mb-8">Hanya anggota terverifikasi Yayasan Sastro Jendro yang berhak untuk mengikuti program Koperasi. Daftar dan verifikasi akun Anda hari ini.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register" class="rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3.5 font-bold transition shadow-lg">Daftar Anggota Baru</NuxtLink>
          <NuxtLink to="/member/login" class="rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 px-8 py-3.5 font-bold transition">Login Dashboard</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'

useReveal()

useHead({
  title: 'Koperasi - Sastro Jendro'
})
</script>
