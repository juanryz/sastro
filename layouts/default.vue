<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-sm font-extrabold text-slate-900">SJ</div>
            <div>
              <p class="text-sm font-semibold tracking-wide">Sastro Jendro</p>
              <p class="text-xs text-slate-300">Budaya | Kesenian | Komunitas</p>
            </div>
          </NuxtLink>

          <div class="hidden md:flex items-center gap-4 text-sm font-medium text-slate-200">
            <NuxtLink to="/" class="hover:text-cyan-300 transition">Beranda</NuxtLink>
            <NuxtLink to="/berita" class="hover:text-cyan-300 transition">Berita</NuxtLink>
            <NuxtLink to="/struktur" class="hover:text-cyan-300 transition">Struktur</NuxtLink>
            <NuxtLink to="/kontak" class="hover:text-cyan-300 transition">Kontak</NuxtLink>
          </div>

          <div class="flex items-center gap-2">
            <button @click="toggleTheme" class="rounded-lg border border-slate-700 px-2 py-1 text-slate-200 hover:border-cyan-300 hover:text-cyan-200 transition">{{ darkMode ? '☀️' : '🌙' }}</button>
            <NuxtLink to="/member/login" class="rounded-lg border border-cyan-500 px-3 py-1.5 text-cyan-300 hover:bg-cyan-500/20 transition">Masuk</NuxtLink>
            <NuxtLink to="/register" class="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1.5 text-slate-900 font-semibold hover:opacity-90 transition">Daftar</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 class="text-lg font-semibold text-white">Sastro Jendro</h3>
          <p class="mt-2 text-sm text-slate-300">Menyatukan generasi dalam seni, tradisi, dan kolaborasi komunitas.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Menu Cepat</h4>
          <ul class="mt-2 space-y-1 text-sm">
            <li><NuxtLink to="/" class="hover:text-white">Beranda</NuxtLink></li>
            <li><NuxtLink to="/berita" class="hover:text-white">Berita</NuxtLink></li>
            <li><NuxtLink to="/struktur" class="hover:text-white">Struktur</NuxtLink></li>
            <li><NuxtLink to="/kontak" class="hover:text-white">Kontak</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Kontak</h4>
          <p class="mt-2 text-sm text-slate-300">info@sastrojendro.id</p>
          <p class="text-sm text-slate-300">+62 813 xxxx xxxx</p>
        </div>
      </div>
      <div class="border-t border-slate-800 text-center text-xs text-slate-400 py-3">© 2026 Sastro Jendro. All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup>
const darkMode = ref(true)
const toggleTheme = () => { darkMode.value = !darkMode.value }
</script>
