<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-900">
    <!-- Page Header -->
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Struktur Organisasi</h1>
      <p class="text-lg text-slate-600 leading-relaxed">
        Di balik setiap kegiatan luhur, terdapat sinergi tim yang berdedikasi tinggi. Kenali susunan pengurus Yayasan Sastro Jendro.
      </p>
    </div>

    <!-- Organization Chart -->
    <div v-if="organizationStructure" class="relative">
      <!-- Background Decorative Elements -->
      <div class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl opacity-30" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>

      <!-- Dewan Pembina & Ketua -->
      <div class="flex flex-col items-center gap-10">
        <!-- Dewan Pembina -->
        <div class="bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl shadow-indigo-100/50 rounded-3xl p-6 px-10 text-center min-w-[20rem] transition hover:-translate-y-1 hover:shadow-2xl">
          <p class="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">{{ organizationStructure.pembina.title }}</p>
          <h2 class="text-2xl font-extrabold text-slate-800">{{ organizationStructure.pembina.name }}</h2>
          <p class="text-sm text-slate-500 mt-1">{{ organizationStructure.pembina.description }}</p>
        </div>

        <div class="w-1 h-10 bg-gradient-to-b from-indigo-200 to-indigo-400 rounded-full"></div>

        <!-- Ketua -->
        <div class="bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-2xl shadow-indigo-500/30 rounded-3xl p-6 px-12 text-center min-w-[22rem] transform scale-105">
          <p class="text-xs font-bold text-indigo-100 uppercase tracking-widest mb-2">{{ organizationStructure.ketua.title }}</p>
          <h2 class="text-3xl font-extrabold mb-1">{{ organizationStructure.ketua.name }}</h2>
          <p class="text-sm font-medium text-indigo-100">{{ organizationStructure.ketua.email }}</p>
        </div>

        <div class="w-1 h-10 bg-gradient-to-b from-blue-400 to-sky-300 rounded-full"></div>
      </div>

      <!-- Vice Leaders Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto mt-10">
        <div
          v-for="wakil in organizationStructure.wakil"
          :key="wakil._id"
          class="bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg shadow-sky-100/50 rounded-3xl p-6 text-center transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="inline-flex w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <p class="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">{{ wakil.title }}</p>
          <h3 class="text-xl font-bold text-slate-800">{{ wakil.name }}</h3>
          <p class="text-sm text-slate-500 mt-1">{{ wakil.email }}</p>
        </div>
      </div>

      <!-- Departemen Section -->
      <div v-if="organizationStructure.departments.length > 0" class="mt-20">
        <div class="text-center mb-10">
          <h3 class="inline-block px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 text-indigo-700 text-sm font-bold uppercase tracking-widest backdrop-blur-md mb-2">Bidang & Divisi</h3>
          <h2 class="text-3xl font-bold text-slate-800">Departemen Operasional</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="department in organizationStructure.departments"
            :key="department._id"
            class="bg-white/50 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-200/40 rounded-[2rem] p-8 transition hover:bg-white/70"
          >
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl" v-html="department.icon"></div>
              <h3 class="text-xl font-bold text-slate-800 leading-tight">{{ department.name }}</h3>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="(member, idx) in department.members"
                :key="member._id"
                class="relative pl-6"
              >
                <!-- Bullet point -->
                <div class="absolute left-0 top-1.5 w-2 h-2 rounded-full" :class="idx === 0 ? 'bg-indigo-500' : 'bg-slate-300'"></div>
                <p class="font-bold text-slate-800 text-base">{{ member.name }}</p>
                <p class="text-sm font-medium text-slate-500">{{ member.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60">
      <div class="inline-block animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
      <p class="text-slate-500 font-medium">Memuat struktur organisasi...</p>
    </div>

    <!-- CTA Section -->
    <div class="mt-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl shadow-indigo-200/50 relative overflow-hidden">
      <!-- Decorative rings -->
      <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 border-[40px] border-white/10 rounded-full"></div>
      <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 border-[30px] border-white/10 rounded-full"></div>
      
      <div class="relative z-10 max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4">Tertarik Turut Merawat Budaya?</h2>
        <p class="text-indigo-50 text-lg mb-8">
          Kami terbuka untuk relawan, anggota, dan mitra yang memiliki visi menyelaraskan keluhuran tradisi dengan dinamika masa kini.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/kontak" class="rounded-full bg-white px-8 py-3.5 text-indigo-600 font-bold hover:bg-slate-50 hover:scale-105 transition shadow-lg">
            Hubungi Kami
          </NuxtLink>
          <NuxtLink to="/register" class="rounded-full bg-indigo-700/40 border border-indigo-400/50 backdrop-blur-sm px-8 py-3.5 text-white font-bold hover:bg-indigo-700/60 transition">
            Daftar Anggota
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

useHead({
  title: 'Struktur Organisasi - Sastro Jendro'
})

const organizationStructure = ref(null)

onMounted(() => {
  // Simulated data fetching
  setTimeout(() => {
    organizationStructure.value = {
      pembina: {
        name: 'K.R.T. Joyodiningrat',
        title: 'Dewan Pembina',
        description: 'Pelindung dan Penasihat Utama Yayasan'
      },
      ketua: {
        name: 'Dr. Budi Santoso, M.Sn',
        title: 'Ketua Umum Yayasan',
        email: 'budi.santoso@sastrojendro.id'
      },
      wakil: [
        {
          _id: '1',
          name: 'Siti Nurhaliza, M.Pd',
          title: 'Wakil Ketua Bidang Edukasi',
          email: 'siti.nurhaliza@sastrojendro.id'
        },
        {
          _id: '2',
          name: 'Ahmad Wijaya, S.E',
          title: 'Wakil Ketua Bidang Operasional',
          email: 'ahmad.wijaya@sastrojendro.id'
        }
      ],
      departments: [
        {
          _id: '1',
          name: 'Departemen Kesenian & Budaya',
          icon: '🎭',
          members: [
            { _id: '1', name: 'Dewi Lestari', position: 'Ketua Departemen' },
            { _id: '2', name: 'Ki Roni Hermawan', position: 'Koordinator Pelatihan Wayang' },
            { _id: '3', name: 'Nyi Eka Putri', position: 'Koreografer & Tari' },
            { _id: '8', name: 'Bambang Pamungkas', position: 'Instruktur Gamelan' }
          ]
        },
        {
          _id: '2',
          name: 'Departemen Pendidikan Masyarakat',
          icon: '📚',
          members: [
            { _id: '4', name: 'Prof. Darmawan', position: 'Ketua Departemen' },
            { _id: '5', name: 'Lisda Suryani', position: 'Program Pelatihan Pemuda' },
            { _id: '9', name: 'Hadi Sudarso', position: 'Dokumentasi & Literatur' }
          ]
        },
        {
          _id: '3',
          name: 'Dpt. Sosial & Kemitraan',
          icon: '🤝',
          members: [
            { _id: '6', name: 'Hendra Gunawan', position: 'Ketua Departemen' },
            { _id: '7', name: 'Maya Kusuma', position: 'Humas & Event Organizer' },
            { _id: '10', name: 'Andi Pratama', position: 'Keuangan & Sponsorship' }
          ]
        }
      ]
    }
  }, 500)
})
</script>
