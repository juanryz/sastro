<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm border-b border-white/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-3xl bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 flex items-center justify-center text-sm font-extrabold text-white">SJ</div>
            <div>
              <p class="text-sm font-semibold tracking-wide">Sastro Jendro</p>
              <p class="text-xs text-slate-600">Budaya | Kesenian | Komunitas</p>
            </div>
          </NuxtLink>

          <div class="hidden md:flex items-center gap-4 text-sm font-medium text-slate-800">
            <NuxtLink to="/" class="hover:text-indigo-600 transition">Beranda</NuxtLink>
            <NuxtLink to="/berita" class="hover:text-indigo-600 transition">Berita</NuxtLink>
            <NuxtLink to="/struktur" class="hover:text-indigo-600 transition">Struktur</NuxtLink>
            <NuxtLink to="/kontak" class="hover:text-indigo-600 transition">Kontak</NuxtLink>
          </div>

          <div class="flex items-center gap-2">
            
            <NuxtLink to="/member/login" class="rounded-xl border border-indigo-400 px-3 py-1.5 text-indigo-600 hover:bg-indigo-100 text-indigo-800 transition">Masuk</NuxtLink>
            <NuxtLink to="/register" class="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-3 py-1.5 text-white font-semibold hover:opacity-90 transition">Daftar</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
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
