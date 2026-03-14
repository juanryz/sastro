<template>
  <div class="w-full max-w-md mx-auto">
    <div
      class="relative h-64 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300 rounded-3xl shadow-2xl overflow-hidden card-3d"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=%2220%27 height=%2720%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 0l20 20M20 0L0 20%27 stroke=%27%23000%27 stroke-width=%271%27/%3E%3C/svg%3E'); background-size: 20px 20px;"></div>
      </div>

      <!-- Header Section -->
      <div class="absolute top-0 left-0 right-0 p-6 border-b-2 border-amber-600 border-opacity-30">
        <div class="flex justify-between items-start">
          <!-- Logo -->
          <div class="w-24 h-auto flex items-center justify-center">
            <img src="/logo.png" alt="Sastra Jendra" class="w-full h-auto object-contain drop-shadow-sm" />
          </div>
          <!-- Member Since -->
          <div class="text-right">
            <p class="text-xs text-white text-opacity-80">MEMBER SEJAK</p>
            <p class="text-sm font-bold text-white">{{ formatDate(member.joinedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Middle Section - Member Info -->
      <div class="absolute top-24 left-0 right-0 px-6">
        <!-- Member Name -->
        <h2 class="text-2xl font-bold text-white mb-1 truncate">{{ member.fullName }}</h2>

        <!-- Member ID -->
        <p class="text-sm text-white text-opacity-90 mb-3 font-mono">
          ID: {{ member.memberId }}
        </p>

        <!-- Status Badge -->
        <div class="flex gap-2 mb-3">
          <span
            class="px-3 py-1 bg-white bg-opacity-25 text-white text-xs font-bold rounded-full"
          >
            {{ member.status === 'verified' ? '✓ VERIFIED' : '⏳ PENDING' }}
          </span>
          <span class="px-3 py-1 bg-white bg-opacity-25 text-white text-xs font-bold rounded-full">
            {{ member.membershipType || 'REGULAR' }}
          </span>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black from-40% to-transparent">
        <!-- Interests -->
        <div class="mb-2">
          <p class="text-xs text-white text-opacity-80 mb-1">MINAT</p>
          <p class="text-sm text-white font-semibold truncate">
            {{ member.interests.join(', ') }}
          </p>
        </div>

        <!-- QR Code placeholder -->
        <div class="absolute bottom-4 right-4">
          <div class="w-16 h-16 bg-white rounded-xl p-1 shadow-lg flex items-center justify-center">
            <div class="w-full h-full bg-gray-100 rounded flex items-center justify-center">
              <span class="text-xs text-gray-500">QR</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Hologram Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 card-shine"></div>
    </div>

    <!-- Card Actions -->
    <div class="mt-6 space-y-2">
      <button
        class="w-full px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition font-semibold"
        @click="downloadCard"
      >
        📥 Download Kartu (PDF)
      </button>
      <button
        class="w-full px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-slate-50 border-r border-slate-200 transition font-semibold"
        @click="shareCard"
      >
        🔗 Bagikan Kartu
      </button>
    </div>

    <!-- Card Info -->
    <div class="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
      <p class="text-sm text-gray-700">
        <strong>📌 Informasi:</strong> Kartu anggota digital ini dapat digunakan untuk akses ke berbagai acara
        eksklusif dan fasilitas member. Simpan kartu Anda dengan baik.
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: {
    type: Object,
    default: () => ({
      memberId: 'SJ-2024-001',
      fullName: 'Nama Anggota',
      email: 'member@sastrojendro.id',
      interests: ['Wayang Kulit', 'Gamelan'],
      joinedAt: new Date(),
      status: 'verified',
      membershipType: 'REGULAR'
    })
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const downloadCard = () => {
  alert('Fitur download kartu akan segera tersedia!')
  // Implement PDF generation dengan html2pdf atau similar
}

const shareCard = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Kartu Anggota Sastro Jendro',
      text: `Saya adalah anggota Sastro Jendro! ${props.member.memberId}`,
      url: window.location.href
    })
  } else {
    alert('Kartu Anda: ' + props.member.memberId)
  }
}
</script>

<style scoped>
.card-3d {
  perspective: 1000px;
  transition: transform 0.6s;
}

.card-3d:hover {
  transform: rotateY(5deg) rotateX(-5deg);
}

.card-shine {
  animation: shine 2s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
