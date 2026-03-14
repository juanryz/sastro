<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 pb-28 relative overflow-x-hidden">


    <!-- ==================== DESKTOP DOCK ==================== -->
    <header class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:block w-max max-w-full px-4">
      <div class="rounded-[1.8rem] backdrop-blur-2xl bg-white/70 shadow-[0_8px_40px_-8px_rgba(100,116,139,0.25)] border border-white/80 px-2 py-1.5 flex items-center gap-0.5">
        
        <!-- Logo on left -->
        <NuxtLink to="/" class="flex items-center gap-2 group ml-2 mr-3 pointer-events-auto">
          <div class="w-8 h-8 rounded-[0.8rem] bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] font-black text-white shadow-md shadow-indigo-500/20 group-hover:shadow-lg transition">SJ</div>
          <p class="text-xs font-extrabold text-slate-800 tracking-wide hidden lg:block">Sastro Jendro</p>
        </NuxtLink>
        <div class="w-px h-5 bg-slate-200 mr-1.5 hidden lg:block"></div>

        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
          :class="isActive(item.to) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80'"
          class="group relative px-4 py-2.5 rounded-[1.2rem] text-[13px] font-semibold tracking-wide transition-all duration-300">
          {{ item.label }}
          <span v-if="isActive(item.to)" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_6px_2px_rgba(99,102,241,0.5)]"></span>
        </NuxtLink>
        <div class="w-px h-5 bg-slate-200 mx-1.5"></div>
        <NuxtLink to="/member/login" class="rounded-[1.2rem] px-4 py-2.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all duration-300">Masuk</NuxtLink>
        <NuxtLink to="/register" class="rounded-[1.2rem] bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">Daftar</NuxtLink>
      </div>
    </header>

    <!-- ==================== MOBILE BOTTOM SHEET ==================== -->
    <div class="fixed bottom-0 left-0 right-0 z-50 md:hidden" ref="mobileSheet">
      <div
        class="bg-white/70 backdrop-blur-2xl border-t border-white/80 shadow-[0_-8px_40px_-8px_rgba(100,116,139,0.2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="mobileExpanded ? 'rounded-t-[0] h-[100dvh]' : 'rounded-t-[1.8rem]'"
        :style="{ overflow: mobileExpanded ? 'auto' : 'hidden' }"
        @touchstart.passive="onSheetTouchStart"
        @touchmove.passive="onSheetTouchMove"
        @touchend.passive="onSheetTouchEnd"
      >
        <!-- Pull Handle -->
        <div class="flex justify-center pt-3 pb-2">
          <div class="w-10 h-1 rounded-full bg-slate-300/80 transition-all" :class="mobileExpanded ? 'w-14 bg-slate-400' : ''"></div>
        </div>

        <!-- Preview Mode (2 items + arrow) -->
        <div v-if="!mobileExpanded" class="px-4 pb-4">
          <div class="flex items-center gap-2 mb-3">
            <NuxtLink v-for="item in previewItems" :key="item.to" :to="item.to"
              :class="isActive(item.to) ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white'"
              class="flex-1 flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-sm font-bold border transition-all active:scale-[0.97]">
              <span class="w-4 h-4" v-html="item.svg"></span>
              {{ item.label }}
            </NuxtLink>
          </div>
          <!-- Expand Arrow + Auth -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <NuxtLink to="/" class="w-8 h-8 flex-shrink-0 rounded-[0.8rem] bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] font-black text-white shadow-md shadow-indigo-500/20 active:scale-95 transition-transform">SJ</NuxtLink>
              <button @click="mobileExpanded = true" class="flex flex-col items-start text-slate-500 active:scale-95 transition-transform">
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" /></svg>
                  <span class="text-[10px] font-bold tracking-wide uppercase">Menu</span>
                </div>
              </button>
            </div>
            <div class="flex items-center gap-2">
              <NuxtLink to="/member/login" class="rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-600 active:scale-95 transition-transform">Masuk</NuxtLink>
              <NuxtLink to="/register" class="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/25 active:scale-95 transition-transform">Daftar</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Expanded Full Menu -->
        <div v-if="mobileExpanded" class="px-5 pb-8 flex flex-col h-[calc(100dvh-3rem)]">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6 pt-1">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-sm font-black text-white shadow-lg shadow-indigo-500/25">SJ</div>
              <div>
                <p class="text-sm font-extrabold text-slate-800">Sastro Jendro</p>
                <p class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Menu Navigasi</p>
              </div>
            </div>
            <button @click="mobileExpanded = false" class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all active:scale-90">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Menu Grid -->
          <nav class="flex-1 flex flex-col gap-1.5 overflow-y-auto">
            <NuxtLink v-for="item in navItems" :key="item.to"
              @click="mobileExpanded = false"
              :to="item.to"
              :class="isActive(item.to) ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200'"
              class="flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-base transition-all duration-200 border active:scale-[0.98]">
              <span class="w-5 h-5 shrink-0" :class="isActive(item.to) ? 'text-indigo-500' : 'text-slate-400'" v-html="item.svg"></span>
              <div class="flex-1">
                <div :class="isActive(item.to) ? 'text-indigo-700' : 'text-slate-700'">{{ item.label }}</div>
                <div class="text-[11px] text-slate-400 font-medium mt-0.5">{{ item.desc }}</div>
              </div>
              <span v-if="isActive(item.to)" class="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_2px_rgba(99,102,241,0.4)]"></span>
              <svg v-else class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </NuxtLink>
          </nav>

          <!-- Bottom Auth -->
          <div class="flex gap-3 mt-5 pt-4 border-t border-slate-100">
            <NuxtLink @click="mobileExpanded = false" to="/member/login" class="flex-1 rounded-2xl border border-slate-200 bg-white py-4 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.98]">Masuk</NuxtLink>
            <NuxtLink @click="mobileExpanded = false" to="/register" class="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-4 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all active:scale-[0.98]">Daftar</NuxtLink>
          </div>
        </div>
      </div>
    </div>

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
const route = useRoute()
const mobileExpanded = ref(false)

const svgIcons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>',
  struktur: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="6" height="6" rx="1"/><rect x="16" y="7" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M12 8v8M5 13v2a2 2 0 0 0 2 2h3M19 13v2a2 2 0 0 1-2 2h-3"/></svg>',
  yayasan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
  koperasi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  kontak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
}

const navItems = [
  { to: '/', label: 'Beranda', desc: 'Halaman utama', svg: svgIcons.home },
  { to: '/berita', label: 'Berita', desc: 'Kabar terbaru', svg: svgIcons.news },
  { to: '/struktur', label: 'Struktur', desc: 'Organisasi', svg: svgIcons.struktur },
  { to: '/yayasan', label: 'Yayasan', desc: 'Info yayasan', svg: svgIcons.yayasan },
  { to: '/koperasi', label: 'Koperasi', desc: 'Layanan koperasi', svg: svgIcons.koperasi },
  { to: '/kontak', label: 'Kontak', desc: 'Hubungi kami', svg: svgIcons.kontak },
]

// Show first 2 items as preview
const previewItems = computed(() => navItems.slice(0, 2))

const isActive = (to) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

// Lock body scroll when expanded
watch(mobileExpanded, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${window.scrollY}px`
  } else {
    const scrollY = document.body.style.top
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
})

// Swipe gestures on sheet
let sheetStartY = 0
let sheetCurrentY = 0
const onSheetTouchStart = (e) => {
  sheetStartY = e.touches[0].clientY
  sheetCurrentY = sheetStartY
}
const onSheetTouchMove = (e) => {
  sheetCurrentY = e.touches[0].clientY
}
const onSheetTouchEnd = () => {
  const delta = sheetStartY - sheetCurrentY
  if (!mobileExpanded.value && delta > 40) mobileExpanded.value = true
  if (mobileExpanded.value && delta < -60) mobileExpanded.value = false
}

// Close on route change
watch(() => route.path, () => { mobileExpanded.value = false })
</script>
