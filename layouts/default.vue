<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="sticky top-0 z-50  bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-sm bg-blue-600 flex items-center justify-center text-sm font-extrabold text-white">SJ</div>
            <div>
              <p class="text-sm font-semibold tracking-wide">Sastro Jendro</p>
              <p class="text-xs text-gray-600">Budaya | Kesenian | Komunitas</p>
            </div>
          </NuxtLink>

          <div class="hidden md:flex items-center gap-4 text-sm font-medium text-gray-800">
            <NuxtLink to="/" class="hover:text-blue-600 transition">Beranda</NuxtLink>
            <NuxtLink to="/berita" class="hover:text-blue-600 transition">Berita</NuxtLink>
            <NuxtLink to="/struktur" class="hover:text-blue-600 transition">Struktur</NuxtLink>
            <NuxtLink to="/kontak" class="hover:text-blue-600 transition">Kontak</NuxtLink>
          </div>

          <div class="flex items-center gap-2">
            
            <NuxtLink to="/member/login" class="rounded-sm border border-blue-200 px-3 py-1.5 text-blue-600 hover:bg-blue-100 text-blue-700 transition">Masuk</NuxtLink>
            <NuxtLink to="/register" class="rounded-sm bg-blue-600 px-3 py-1.5 text-white font-semibold hover:opacity-90 transition">Daftar</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 text-gray-600">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Sastro Jendro</h3>
          <p class="mt-2 text-sm text-gray-600">Menyatukan generasi dalam seni, tradisi, dan kolaborasi komunitas.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Menu Cepat</h4>
          <ul class="mt-2 space-y-1 text-sm">
            <li><NuxtLink to="/" class="hover:text-blue-600">Beranda</NuxtLink></li>
            <li><NuxtLink to="/berita" class="hover:text-blue-600">Berita</NuxtLink></li>
            <li><NuxtLink to="/struktur" class="hover:text-blue-600">Struktur</NuxtLink></li>
            <li><NuxtLink to="/kontak" class="hover:text-blue-600">Kontak</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Kontak</h4>
          <p class="mt-2 text-sm text-gray-600">info@sastrojendro.id</p>
          <p class="text-sm text-gray-600">+62 813 xxxx xxxx</p>
        </div>
      </div>
      <div class="border-t border-gray-200 text-center text-xs text-gray-500 py-3">© 2026 Sastro Jendro. All rights reserved.</div>
    </footer>
  </div>
</template>


