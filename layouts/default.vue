<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 pb-32 relative overflow-x-hidden">
    <!-- Floating Bottom Navbar (Dock) -->
    <header class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl">
      <div class="rounded-full backdrop-blur-2xl bg-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/60 p-2 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 pl-2 group">
          <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-sm font-black text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">SJ</div>
          <div class="hidden lg:block">
            <p class="text-sm font-extrabold tracking-wide text-slate-800">Sastro Jendro</p>
          </div>
        </NuxtLink>

        <!-- Navigation Menus -->
        <nav class="hidden md:flex items-center bg-white/50 rounded-full px-2 py-1 shadow-inner border border-white/50">
          <NuxtLink to="/" class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-300">Beranda</NuxtLink>
          <NuxtLink to="/berita" class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-300">Berita</NuxtLink>
          <NuxtLink to="/struktur" class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-300">Struktur</NuxtLink>
          <NuxtLink to="/yayasan" class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-300">Yayasan</NuxtLink>
          <NuxtLink to="/koperasi" class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-300">Koperasi</NuxtLink>
          <NuxtLink to="/kontak" class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-300">Kontak</NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center gap-2 pr-1">
          <NuxtLink to="/member/login" class="rounded-full border border-white/80 bg-white/60 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300">Masuk</NuxtLink>
          <NuxtLink to="/register" class="rounded-full bg-slate-900 border border-slate-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">Daftar</NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-grow pt-8">
      <slot />
    </main>

    <footer class="bg-white/80 backdrop-blur-lg shadow-xl shadow-slate-200/50 border-t border-white/60 text-slate-600">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 class="text-lg font-semibold text-indigo-900">Sastro Jendro</h3>
          <p class="mt-2 text-sm text-slate-600">Menyatukan generasi dalam seni, tradisi, dan kolaborasi komunitas.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Menu Cepat</h4>
          <ul class="mt-2 space-y-1 text-sm">
            <li><NuxtLink to="/" class="hover:text-indigo-600">Beranda</NuxtLink></li>
            <li><NuxtLink to="/berita" class="hover:text-indigo-600">Berita</NuxtLink></li>
            <li><NuxtLink to="/struktur" class="hover:text-indigo-600">Struktur</NuxtLink></li>
            <li><NuxtLink to="/yayasan" class="hover:text-indigo-600">Yayasan</NuxtLink></li>
            <li><NuxtLink to="/koperasi" class="hover:text-indigo-600">Koperasi</NuxtLink></li>
            <li><NuxtLink to="/kontak" class="hover:text-indigo-600">Kontak</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Kontak</h4>
          <p class="mt-2 text-sm text-slate-600">info@sastrojendro.id</p>
          <p class="text-sm text-slate-600">+62 813 xxxx xxxx</p>
        </div>
      </div>
      <div class="border-t border-white/60 text-center text-xs text-slate-500 py-3">© 2026 Sastro Jendro. All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup>


</script>
