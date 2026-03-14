<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-900">
    <PageLoader />
    <!-- Page Header -->
    <div class="reveal text-center mb-16 max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Tim Anggota</h1>
      <p class="text-lg text-slate-600 leading-relaxed">
        Ketahui lebih banyak tentang anggota organisasi kami yang berdedikasi menjaga kelestarian budaya.
      </p>
    </div>

    <!-- Search -->
    <div class="reveal max-w-xl mx-auto mb-12">
      <div class="relative">
        <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari anggota..."
          class="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white transition-all shadow-sm"
        />
      </div>
    </div>

    <!-- Members Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <div
        v-for="m in filteredMembers"
        :key="m.id"
        class="reveal bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all group"
      >
        <div class="bg-gradient-to-br from-indigo-500 to-cyan-500 h-40 flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div class="w-20 h-20 rounded-[1.5rem] bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden shadow-xl">
            <img v-if="m.profilePhoto" :src="m.profilePhoto" class="w-full h-full object-cover" />
            <img v-else :src="'https://i.pravatar.cc/150?u=' + m.email" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-slate-800 mb-1">{{ m.fullName }}</h3>
          <p class="text-indigo-600 font-bold text-sm mb-3 uppercase tracking-wider">{{ m.position }}</p>
          <p v-if="m.experience" class="text-slate-600 text-sm mb-4 line-clamp-2">{{ m.experience }}</p>
          <div class="space-y-1.5 text-sm text-slate-500">
            <p v-if="m.email" class="flex items-center gap-2">📧 {{ m.email }}</p>
            <p v-if="m.city" class="flex items-center gap-2">📍 {{ m.city }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredMembers.length === 0" class="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60">
      <div class="text-4xl mb-4 opacity-30">🔍</div>
      <p class="text-slate-500 text-lg font-bold">Tidak ada anggota yang ditemukan</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useReveal } from '~/composables/useReveal'

useReveal()

useHead({ title: 'Tim Anggota - Sastro Jendro' })

// Use centralized data — synced with admin and homepage
const { verifiedMembers } = useAppData()

const searchQuery = ref('')

const filteredMembers = computed(() => {
  if (!searchQuery.value) return verifiedMembers.value

  const term = searchQuery.value.toLowerCase()
  return verifiedMembers.value.filter(m =>
    m.fullName.toLowerCase().includes(term) ||
    m.position.toLowerCase().includes(term)
  )
})
</script>
