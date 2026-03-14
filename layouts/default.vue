<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 text-slate-900 pb-28 relative overflow-x-hidden">


    <!-- ==================== DESKTOP DOCK ==================== -->
    <header class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:block w-max max-w-full px-4">
      <div class="rounded-[1.8rem] backdrop-blur-2xl bg-white/70 shadow-[0_8px_40px_-8px_rgba(100,116,139,0.25)] border border-white/80 px-2 py-1.5 flex items-center gap-0.5">
        
        <!-- Logo on left -->
        <NuxtLink to="/" class="flex items-center group ml-3 mr-4 pointer-events-auto pt-1 pb-1">
          <div class="h-14 w-auto flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.2] group-active:scale-90">
            <img src="/logo.png" alt="Sastra Jendra Hayuningrat" class="h-full w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md" />
          </div>
        </NuxtLink>
        <div class="w-px h-5 bg-slate-200 mr-1.5 hidden lg:block"></div>

        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
          :class="isActive(item.to) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80'"
          class="group relative px-4 py-2.5 rounded-[1.2rem] text-[13px] font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.15] active:scale-95 hover:shadow-sm">
          {{ item.label }}
          <span v-if="isActive(item.to)" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_6px_2px_rgba(99,102,241,0.5)]"></span>
        </NuxtLink>
        <div class="w-px h-5 bg-slate-200 mx-1.5"></div>
        <NuxtLink to="/member/login" class="rounded-[1.2rem] px-4 py-2.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all duration-300">Masuk</NuxtLink>
        <NuxtLink to="/register" class="rounded-[1.2rem] bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">Daftar</NuxtLink>
      </div>
    </header>

    <!-- ==================== MOBILE BOTTOM SHEET ==================== -->
    <div
      class="fixed inset-0 z-50 md:hidden pointer-events-none"
      :class="{'pointer-events-auto': mobileExpanded || isDragging}"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-500"
        :class="mobileExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
        @click="closeMenu"
      ></div>

      <!-- Sheet Container -->
      <div
        class="absolute left-0 right-0 bottom-0 bg-white/95 backdrop-blur-3xl border-t border-white/80 shadow-[0_-8px_40px_-8px_rgba(100,116,139,0.2)] flex flex-col pointer-events-auto rounded-t-[1.8rem] will-change-transform"
        :class="[!isDragging ? 'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]' : '']"
        :style="{
          height: '100dvh',
          transform: `translateY(${sheetTranslateY}px)`
        }"
      >
        <!-- Pull Handle Area -->
        <div 
          class="flex justify-center pt-3 pb-2 touch-none cursor-grab active:cursor-grabbing shrink-0"
          @touchstart.passive="onDragStart"
          @touchmove.passive="onDragMove"
          @touchend.passive="onDragEnd"
        >
          <div class="w-12 h-1.5 rounded-full bg-slate-300/80 transition-all duration-300" :class="mobileExpanded ? 'w-16 bg-slate-400' : ''"></div>
        </div>

        <!-- Sheet Content Wrap -->
        <div class="relative flex-1">
          <!-- Collapsed "Preview" Content -->
          <div
            ref="previewRef"
            class="absolute inset-x-0 top-0 px-4 pb-4 transition-all duration-300 pointer-events-auto"
            :class="mobileExpanded ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'"
          >
            <!-- Preview Items -->
            <div class="flex items-center gap-2 mb-3">
              <NuxtLink v-for="item in previewItems" :key="item.to" :to="item.to"
                :class="isActive(item.to) ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white'"
                class="flex-1 flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-sm font-bold border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] active:scale-95 hover:shadow-md">
                <span class="w-4 h-4 transition-transform duration-500 group-hover:scale-110" v-html="item.svg"></span>
                {{ item.label }}
              </NuxtLink>
            </div>
            <!-- Expand Arrow + Auth -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <NuxtLink to="/" class="h-12 w-auto flex-shrink-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.2] active:scale-90 group">
                  <img src="/logo.png" alt="Sastra Jendra Hayuningrat" class="h-full w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md" />
                </NuxtLink>
                <button @click="openMenu" class="flex flex-col items-start text-slate-500 active:scale-95 transition-transform">
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
          <div
            class="absolute inset-x-0 bottom-0 top-0 flex flex-col px-5 pb-8 transition-all duration-300 overflow-y-auto"
            :class="mobileExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'"
          >
            <!-- Header -->
            <div class="flex items-center justify-between mb-6 pt-1">
              <div class="flex items-center gap-3">
                <NuxtLink to="/" class="h-16 w-auto flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.15] active:scale-90 group">
                  <img src="/logo.png" alt="Sastra Jendra Hayuningrat" class="h-full w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md" />
                </NuxtLink>
              </div>
              <button @click="closeMenu" class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all active:scale-90">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <!-- Menu Grid -->
            <nav class="flex-1 flex flex-col gap-1.5">
              <NuxtLink v-for="item in navItems" :key="item.to"
                @click="closeMenu"
                :to="item.to"
                :class="isActive(item.to) ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200'"
                class="group flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border hover:scale-[1.03] active:scale-95 hover:shadow-md hover:z-10 relative">
                <span class="w-5 h-5 shrink-0 transition-transform duration-500 group-hover:scale-125" :class="isActive(item.to) ? 'text-indigo-500' : 'text-slate-400'" v-html="item.svg"></span>
                <div class="flex-1">
                  <div :class="isActive(item.to) ? 'text-indigo-700' : 'text-slate-700'" class="transition-colors duration-300">{{ item.label }}</div>
                  <div class="text-[11px] text-slate-400 font-medium mt-0.5">{{ item.desc }}</div>
                </div>
                <span v-if="isActive(item.to)" class="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_2px_rgba(99,102,241,0.4)]"></span>
                <svg v-else class="w-4 h-4 text-slate-300 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </NuxtLink>
            </nav>

            <!-- Bottom Auth -->
            <div class="flex gap-3 mt-5 pt-4 border-t border-slate-100 mt-auto shrink-0 pb-4">
              <NuxtLink @click="closeMenu" to="/member/login" class="flex-1 rounded-2xl border border-slate-200 bg-white py-4 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.98]">Masuk</NuxtLink>
              <NuxtLink @click="closeMenu" to="/register" class="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-4 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all active:scale-[0.98]">Daftar</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="relative mt-20 pt-32 pb-8 border-t border-white/40 bg-white/40 backdrop-blur-3xl shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
      <!-- Mega Glow effects -->
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 via-transparent to-white/20 pointer-events-none"></div>
      <div class="absolute -bottom-1/2 left-0 w-[1000px] h-[1000px] bg-indigo-500/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/2"></div>
      <div class="absolute -top-1/2 right-0 w-[800px] h-[800px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3"></div>

      <!-- Giant Background Typography -->
      <div class="absolute top-10 left-0 w-full flex justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <span class="text-[20vw] font-black tracking-tighter text-slate-900 whitespace-nowrap leading-none">SASTRO JENDRO</span>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <!-- Top Section: Newsletter & Branding CTA -->
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 pb-20 border-b border-slate-200/60">
          <div>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 border border-indigo-100 shadow-sm backdrop-blur-md mb-6">
              <span class="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></span>
              <span class="text-xs font-bold text-indigo-700 uppercase tracking-widest">Tetap Terhubung</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight leading-tight">
              Kabar Budaya,<br/>Langsung ke Kotak Masuk Anda.
            </h2>
            <p class="text-lg text-slate-600 font-medium">Bantu kami melestarikan karya adiluhung dengan mengikuti pembaruan program, beasiswa tari, pementasan, hingga artikel filosofi rutin.</p>
          </div>
          <div>
            <form class="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row gap-3 relative overflow-hidden group">
              <!-- Animated border on focus -->
              <div class="absolute inset-0 border-2 border-transparent group-focus-within:border-indigo-400/50 rounded-[2.5rem] transition-colors pointer-events-none"></div>
              
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <svg class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <input type="email" placeholder="Alamat email Anda..." class="w-full bg-transparent border-none focus:ring-0 py-5 pl-14 pr-4 text-slate-800 font-semibold placeholder-slate-400 outline-none" required />
              </div>
              <button type="submit" class="rounded-[1.8rem] bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-5 text-white font-bold tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-1 transition-all">Berlangganan</button>
            </form>
          </div>
        </div>

        <!-- Main Footer Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          <!-- Company Info -->
          <div class="lg:col-span-4 lg:pr-10">
            <div class="flex items-center gap-3 mb-8">
              <div class="h-20 w-auto flex items-center justify-center bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white/80 shadow-sm">
                <img src="/logo.png" alt="Sastra Jendra" class="h-full w-auto object-contain drop-shadow-md" />
              </div>
            </div>
            <p class="text-slate-600 font-medium leading-relaxed mb-10 text-lg">
              Sebuah inisiatif agung untuk menjaga hakikat Sastra Jendra Hayuningrat agar lestari dalam simfoni modernitas dan dedikasi lintas zaman.
            </p>
            <div class="flex gap-4">
              <a href="#" class="group w-14 h-14 rounded-[1.5rem] bg-white/70 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent hover:-translate-y-2 transition-all duration-300 font-bold text-xl">IG</a>
              <a href="#" class="group w-14 h-14 rounded-[1.5rem] bg-white/70 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#1877F2] hover:border-transparent hover:-translate-y-2 transition-all duration-300 font-bold text-xl">FB</a>
              <a href="#" class="group w-14 h-14 rounded-[1.5rem] bg-white/70 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#1DA1F2] hover:border-transparent hover:-translate-y-2 transition-all duration-300 font-bold text-xl">TW</a>
              <a href="#" class="group w-14 h-14 rounded-[1.5rem] bg-white/70 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#FF0000] hover:border-transparent hover:-translate-y-2 transition-all duration-300 font-bold text-xl">YT</a>
            </div>
          </div>

          <!-- Links Columns -->
          <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 class="text-sm font-extrabold uppercase tracking-[0.2em] text-indigo-900 mb-8 flex items-center gap-3">
                <div class="w-3 h-3 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 shadow-sm"></div>
                Eksplorasi
              </h4>
              <ul class="space-y-5">
                <li><NuxtLink to="/" class="text-slate-600 font-bold hover:text-indigo-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-indigo-500 group-hover:w-8 transition-all"></span> Beranda</NuxtLink></li>
                <li><NuxtLink to="/berita" class="text-slate-600 font-bold hover:text-indigo-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-indigo-500 group-hover:w-8 transition-all"></span> Berita Terbaru</NuxtLink></li>
                <li><NuxtLink to="/kontak" class="text-slate-600 font-bold hover:text-indigo-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-indigo-500 group-hover:w-8 transition-all"></span> Layanan Kontak</NuxtLink></li>
                <li><NuxtLink to="/register" class="text-slate-600 font-bold hover:text-indigo-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-indigo-500 group-hover:w-8 transition-all"></span> Menjadi Anggota</NuxtLink></li>
              </ul>
            </div>

            <div>
              <h4 class="text-sm font-extrabold uppercase tracking-[0.2em] text-indigo-900 mb-8 flex items-center gap-3">
                <div class="w-3 h-3 rounded-md bg-gradient-to-br from-cyan-400 to-sky-500 shadow-sm"></div>
                Tentang Kami
              </h4>
              <ul class="space-y-5">
                <li><NuxtLink to="/yayasan" class="text-slate-600 font-bold hover:text-cyan-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-cyan-500 group-hover:w-8 transition-all"></span> Program Yayasan</NuxtLink></li>
                <li><NuxtLink to="/struktur" class="text-slate-600 font-bold hover:text-cyan-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-cyan-500 group-hover:w-8 transition-all"></span> Susunan Pengurus</NuxtLink></li>
                <li><NuxtLink to="/koperasi" class="text-slate-600 font-bold hover:text-cyan-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-cyan-500 group-hover:w-8 transition-all"></span> Koperasi S.H.U</NuxtLink></li>
                <li><a href="#" class="text-slate-600 font-bold hover:text-cyan-600 transition flex items-center gap-3 group text-lg"><span class="w-6 h-px bg-slate-300 group-hover:bg-cyan-500 group-hover:w-8 transition-all"></span> Panduan Karir</a></li>
              </ul>
            </div>

            <div class="col-span-2 md:col-span-1">
              <h4 class="text-sm font-extrabold uppercase tracking-[0.2em] text-indigo-900 mb-8 flex items-center gap-3">
                <div class="w-3 h-3 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm"></div>
                Operasional
              </h4>
              <ul class="space-y-6">
                <li class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-[1.2rem] bg-white/70 border border-white/80 shadow-md flex items-center justify-center shrink-0 text-xl backdrop-blur-sm">🏢</div>
                  <div>
                    <span class="block text-slate-800 font-extrabold text-sm uppercase tracking-widest mb-1">Kantor Pusat</span>
                    <span class="text-slate-600 font-medium leading-relaxed block">Gedung Budaya, Jl. Nusantara No. 12, Yogyakarta.</span>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-[1.2rem] bg-white/70 border border-white/80 shadow-md flex items-center justify-center shrink-0 text-xl backdrop-blur-sm">📞</div>
                  <div>
                    <span class="block text-slate-800 font-extrabold text-sm uppercase tracking-widest mb-1">Hubungi Langsung</span>
                    <a href="mailto:halo@sastrojendro.id" class="text-indigo-600 hover:text-indigo-800 transition font-bold block mb-1">halo@sastrojendro.id</a>
                    <span class="text-slate-600 font-medium block">+62 813-1234-5678</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Bottom Bar with Full Width gradient line -->
      <div class="w-full h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 mb-6"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <p class="text-sm font-bold text-slate-500">
            © <span class="text-slate-800">2026 Yayasan Sastro Jendro</span>. Dilindungi oleh hukum.
          </p>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold">
            <a href="#" class="text-slate-500 hover:text-indigo-600 transition uppercase tracking-wider">Syarat & Ketentuan</a>
            <a href="#" class="text-slate-500 hover:text-indigo-600 transition uppercase tracking-wider">Kebijakan Privasi</a>
            <a href="#" class="text-slate-500 hover:text-indigo-600 transition uppercase tracking-wider">Bantuan & FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
const route = useRoute()
const mobileExpanded = ref(false)
const isDragging = ref(false)
const sheetTranslateY = ref(1000)
const previewHeight = ref(180)
const previewRef = ref(null)

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

// Logic to determine baseline sheet offset
const updateSheetPosition = () => {
  if (typeof window === 'undefined') return
  if (mobileExpanded.value) {
    sheetTranslateY.value = 0
  } else {
    // 28px is approximate handle area height
    const h = previewRef.value ? previewRef.value.offsetHeight + 28 : previewHeight.value
    sheetTranslateY.value = window.innerHeight - h
  }
}

onMounted(() => {
  setTimeout(() => {
    if (previewRef.value) {
      previewHeight.value = previewRef.value.offsetHeight + 28
    }
    updateSheetPosition()
  }, 100)
  window.addEventListener('resize', updateSheetPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSheetPosition)
})

watch(mobileExpanded, () => {
  updateSheetPosition()
  if (mobileExpanded.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const openMenu = () => {
  mobileExpanded.value = true
}

const closeMenu = () => {
  mobileExpanded.value = false
}

// Swipe gestures for flexible animations
let startY = 0
let currentY = 0

const onDragStart = (e) => {
  startY = e.touches[0].clientY
  currentY = startY
  isDragging.value = true
}

const onDragMove = (e) => {
  if (!isDragging.value) return
  currentY = e.touches[0].clientY
  const delta = currentY - startY
  
  if (mobileExpanded.value) {
    // Already open, drag down
    if (delta > 0) {
      sheetTranslateY.value = delta
    }
  } else {
    // Closed, drag up
    if (delta < 0) {
      const h = previewHeight.value
      sheetTranslateY.value = window.innerHeight - h + delta
    }
  }
}

const onDragEnd = () => {
  isDragging.value = false
  const delta = currentY - startY
  
  if (!mobileExpanded.value && delta < -50) {
    mobileExpanded.value = true
  } else if (mobileExpanded.value && delta > 50) {
    mobileExpanded.value = false
  } else {
    // Snap back
    updateSheetPosition()
  }
}

// Close on route change
watch(() => route.path, closeMenu)
</script>
