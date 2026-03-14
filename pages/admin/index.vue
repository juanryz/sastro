<template>
  <div class="min-h-screen bg-slate-50 flex overflow-hidden font-sans relative selection:bg-amber-200">
    <!-- Premium Blur Blobs Background -->
    <div class="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-400/20 blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[120px] pointer-events-none"></div>
    <div class="fixed top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-rose-400/10 blur-[100px] pointer-events-none"></div>

    <!-- Admin Sidebar (Glassmorphism) -->
    <aside class="relative z-20 w-72 flex-shrink-0 bg-white/40 backdrop-blur-2xl border-r border-white/60 shadow-[8px_0_32px_0_rgba(31,38,135,0.05)] flex flex-col h-screen">
      <div class="p-8 border-b border-white/40 flex items-center justify-center flex-col mt-4">
        <div class="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-rose-500 shadow-xl shadow-amber-500/30 flex items-center justify-center p-3 mb-4 shrink-0 transition-transform hover:scale-105">
          <img src="/logo.png" alt="Sastra Jendra" class="w-full h-full object-contain filter brightness-0 invert" />
        </div>
        <div class="text-center">
          <h2 class="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Sastro Jendro</h2>
          <div class="inline-flex mt-2 items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 shadow-sm">
            <span class="flex h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse"></span>
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">Administrator</span>
          </div>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto p-5 space-y-2.5 custom-scrollbar">
        <!-- Dashboard -->
        <NuxtLink to="/admin" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 bg-white shadow-md border border-amber-100 text-amber-700 scale-[1.02]">
          <span class="text-xl">📊</span>
          <span>Dashboard Utama</span>
        </NuxtLink>

        <!-- Content -->
        <NuxtLink to="/admin/berita" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/60 text-slate-600 hover:text-amber-700 font-bold transition-all duration-300">
          <span class="text-xl">📝</span>
          <span>Berita & Artikel</span>
        </NuxtLink>

        <!-- Organization -->
        <NuxtLink to="/admin/struktur" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/60 text-slate-600 hover:text-amber-700 font-bold transition-all duration-300">
          <span class="text-xl">🏢</span>
          <span>Struktur Organisasi</span>
        </NuxtLink>

        <!-- Members -->
        <NuxtLink to="/admin/anggota" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/60 text-slate-600 hover:text-amber-700 font-bold transition-all duration-300">
          <span class="text-xl">👥</span>
          <span>Daftar Anggota</span>
        </NuxtLink>

        <!-- Profile Settings -->
        <NuxtLink to="/admin/profil" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/60 text-slate-600 hover:text-amber-700 font-bold transition-all duration-300">
          <span class="text-xl">⚙️</span>
          <span>Setelan Profil</span>
        </NuxtLink>
      </nav>
      
      <!-- Logout Area -->
      <div class="p-5 border-t border-white/40 mt-auto bg-white/20">
        <button @click="logout" class="w-full flex justify-center items-center gap-2 px-4 py-3.5 rounded-2xl bg-white/50 border border-red-100/50 text-red-600 font-bold hover:bg-red-50 hover:text-red-700 hover:shadow-sm hover:border-red-200 transition-all shadow-inner">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Keluar Sistem
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 relative z-10 h-screen overflow-y-auto">
      <!-- Top Header -->
      <header class="sticky top-0 z-30 bg-white/40 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] px-8 py-5 flex justify-between items-center">
        <div class="reveal">
          <h1 class="text-2xl font-black text-slate-800 tracking-tight">Admin Dashboard</h1>
          <p class="text-sm text-slate-500 font-medium">Kelola konten, berita, dan struktur organisasi.</p>
        </div>
        <div class="flex items-center gap-5">
          <!-- Notification Bell -->
          <div class="relative group cursor-pointer reveal delay-100">
            <div class="w-12 h-12 rounded-[1.2rem] bg-white/80 border border-white shadow-sm flex items-center justify-center hover:bg-white hover:shadow-md transition-all text-slate-500 group-hover:text-amber-600">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
          </div>
          <!-- User Profile Brief -->
          <div class="flex items-center gap-3 pl-5 border-l border-white/60 reveal delay-200">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-bold text-slate-800">Admin Staf</div>
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pengelola Konten</div>
            </div>
            <div class="w-12 h-12 rounded-[1.2rem] bg-amber-100 border-2 border-white shadow-sm overflow-hidden shrink-0">
              <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-8 max-w-7xl mx-auto space-y-10 pb-20">
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="reveal rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-amber-100 to-white rounded-full opacity-60 group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10 flex items-center justify-between">
              <div>
                <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Artikel</p>
                <p class="text-4xl font-black text-slate-800">{{ stats.totalArticles }}</p>
              </div>
              <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl text-amber-500 shadow-inner">
                 📝
              </div>
            </div>
          </div>

          <div class="reveal delay-100 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-indigo-100 to-white rounded-full opacity-60 group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10 flex items-center justify-between">
               <div>
                <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Anggota</p>
                <p class="text-4xl font-black text-indigo-600">{{ stats.totalMembers }}</p>
              </div>
              <div class="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-500 shadow-inner">
                 👥
              </div>
            </div>
          </div>

          <div class="reveal delay-200 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-emerald-100 to-white rounded-full opacity-60 group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10 flex items-center justify-between">
               <div>
                <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Departemen</p>
                <p class="text-4xl font-black text-emerald-600">{{ stats.totalDepartments }}</p>
              </div>
              <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl text-emerald-500 shadow-inner">
                 🏢
              </div>
            </div>
          </div>

          <div class="reveal delay-300 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-rose-100 to-white rounded-full opacity-60 group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10 flex items-center justify-between">
               <div>
                <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Pesan Kontak</p>
                <p class="text-4xl font-black text-rose-600">{{ stats.totalMessages }}</p>
              </div>
              <div class="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl text-rose-500 shadow-inner">
                 📬
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Panel -->
        <h3 class="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center gap-3 reveal mt-12 mb-6">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span> Tindakan Cepat
        </h3>

        <div class="reveal rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/80 p-8 shadow-sm group">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NuxtLink to="/admin/berita/baru" class="group/btn relative overflow-hidden flex flex-col items-center gap-4 py-8 px-4 rounded-3xl bg-white/60 hover:bg-white border border-white hover:border-amber-200 hover:shadow-md transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-b from-amber-50 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div class="relative z-10 w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-2xl group-hover/btn:scale-110 transition-transform shadow-inner">
                ✍️
              </div>
              <span class="relative z-10 font-bold text-slate-700 group-hover/btn:text-amber-700">Tulis Artikel Baru</span>
            </NuxtLink>

            <NuxtLink to="/admin/anggota/baru" class="group/btn relative overflow-hidden flex flex-col items-center gap-4 py-8 px-4 rounded-3xl bg-white/60 hover:bg-white border border-white hover:border-indigo-200 hover:shadow-md transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div class="relative z-10 w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl group-hover/btn:scale-110 transition-transform shadow-inner">
                ➕
              </div>
              <span class="relative z-10 font-bold text-slate-700 group-hover/btn:text-indigo-700">Tambah Anggota</span>
            </NuxtLink>

            <NuxtLink to="/admin/struktur" class="group/btn relative overflow-hidden flex flex-col items-center gap-4 py-8 px-4 rounded-3xl bg-white/60 hover:bg-white border border-white hover:border-emerald-200 hover:shadow-md transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-b from-emerald-50 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div class="relative z-10 w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover/btn:scale-110 transition-transform shadow-inner">
                👔
              </div>
              <span class="relative z-10 font-bold text-slate-700 group-hover/btn:text-emerald-700">Kelola Struktur</span>
            </NuxtLink>

            <NuxtLink to="/admin/profil" class="group/btn relative overflow-hidden flex flex-col items-center gap-4 py-8 px-4 rounded-3xl bg-white/60 hover:bg-white border border-white hover:border-purple-200 hover:shadow-md transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div class="relative z-10 w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl group-hover/btn:scale-110 transition-transform shadow-inner">
                🏢
              </div>
              <span class="relative z-10 font-bold text-slate-700 group-hover/btn:text-purple-700">Profil Yayasan</span>
            </NuxtLink>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'

definePageMeta({
  layout: false,
  middleware: 'admin'
})

useReveal()

// Centralized data — synced with super admin
const { stats } = useAppData()

const logout = () => {
  const adminToken = useCookie('admin-token')
  const adminRole = useCookie('admin-role')
  adminToken.value = null
  adminRole.value = null
  navigateTo('/member/login')
}

useHead({
  title: 'Admin Dashboard - Sastro Jendro'
})
</script>

<style scoped>
/* Custom subtle scrollbar for sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.2);
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.4);
}
</style>
