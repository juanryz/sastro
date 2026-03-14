<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
    <PageLoader />
    
    <!-- Top Navigation (Professional & Simple) -->
    <nav class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-8 h-8 object-contain" />
        <span class="font-black tracking-tight text-slate-800 uppercase text-sm">Member Hub</span>
      </div>
      
      <div class="flex items-center gap-4">
        <button @click="logout" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Keluar Sesi
        </button>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto px-6 py-12">
      <!-- Welcome Header -->
      <div class="mb-12 reveal">
        <h1 class="text-4xl font-black text-slate-900 tracking-tighter mb-2">Selamat Datang, {{ member.fullName || 'Anggota Sastro Jendro' }}</h1>
        <p class="text-slate-500 font-medium">Kelola profil, akses kartu anggota digital, dan pantau aktivitas Anda di sini.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Private Sidebar (Info Ringkas) -->
        <div class="space-y-6">
          <!-- Member Card (Highlight) -->
          <div class="reveal delay-1">
             <div class="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-8 opacity-10 text-8xl -rotate-12 transition-transform group-hover:scale-110">🪪</div>
                <div class="relative z-10">
                   <div class="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center backdrop-blur-md">
                      <img src="/logo.png" class="w-6 h-6 object-contain filter brightness-0 invert" />
                   </div>
                   <h3 class="font-black text-xl mb-1 tracking-tighter uppercase">{{ member.fullName || 'LENGKAPI NAMA' }}</h3>
                   <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{{ member.memberId || 'PENDING ASSIGNMENT' }}</p>
                   
                   <div class="mt-10 pt-6 border-t border-white/20 flex justify-between items-center">
                      <div>
                        <p class="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Status Otoritas</p>
                        <p class="text-xs font-bold uppercase tracking-tight">{{ member.status === 'verified' ? '✓ Terverifikasi' : 'Proses Validasi' }}</p>
                      </div>
                      <button @click="showFullCard = true" class="px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg shadow-black/5">Lihat Card</button>
                   </div>
                </div>
             </div>
          </div>

          <!-- Quick Actions -->
          <div class="reveal delay-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Navigasi Cepat</h4>
             <div class="space-y-2">
                <button v-for="tab in ['profile', 'activity', 'settings']" :key="tab" 
                  @click="activeTab = tab"
                  :class="[
                    'w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all',
                    activeTab === tab ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'text-slate-500 hover:bg-slate-50'
                  ]"
                >
                  <span class="capitalize">{{ tab === 'profile' ? 'Data Pribadi' : tab === 'activity' ? 'Aktivitas Saya' : 'Keamanan Akun' }}</span>
                  <span v-if="activeTab === tab" class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                </button>
             </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-2 space-y-8">
           
           <!-- PROFILE DATA TAB -->
           <div v-if="activeTab === 'profile'" class="animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div class="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                 <div class="p-8 md:p-10">
                    <div class="flex justify-between items-start mb-10">
                       <h2 class="text-2xl font-black text-slate-900 tracking-tight">Informasi Dasar</h2>
                       <button @click="editing = !editing" class="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">{{ editing ? 'Batal' : 'Edit Profil' }}</button>
                    </div>

                    <form @submit.prevent="updateProfile" class="space-y-8">
                       <!-- Full Name -->
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div class="space-y-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                             <div v-if="!editing" class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-transparent italic text-slate-400" :class="{'text-slate-800 not-italic': member.fullName}">
                                {{ member.fullName || 'Belum diatur' }}
                             </div>
                             <input v-else v-model="form.fullName" type="text" class="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-500 transition-all shadow-inner" />
                          </div>

                          <div class="space-y-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Terdaftar</label>
                             <div class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-800 border border-transparent shadow-inner opacity-60">
                                {{ member.email }}
                             </div>
                          </div>
                       </div>

                       <!-- Bio / Experience -->
                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tentang / Pengalaman</label>
                          <div v-if="!editing" class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium leading-relaxed border border-transparent italic text-slate-400" :class="{'text-slate-600 not-italic': member.experience}">
                             {{ member.experience || 'Tambahkan deskripsi singkat tentang pengalaman atau minat Anda di sini.' }}
                          </div>
                          <textarea v-else v-model="form.experience" rows="4" class="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border border-slate-200 outline-none focus:border-indigo-500 transition-all shadow-inner"></textarea>
                       </div>

                       <!-- Skills/Interests -->
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bidang Minat Terpilih</label>
                          <div class="flex flex-wrap gap-2">
                             <span v-for="interest in member.interests" :key="interest" class="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 flex items-center gap-2">
                                {{ interest }}
                                <button v-if="editing" @click="removeInterest(interest)" class="hover:text-red-500">×</button>
                             </span>
                             <button v-if="editing" class="px-4 py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-indigo-300 hover:text-indigo-500Transition">
                               + Tambah Bidang
                             </button>
                          </div>
                       </div>

                       <div v-if="editing" class="pt-6 border-t border-slate-100">
                          <button type="submit" class="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Simpan Perubahan</button>
                       </div>
                    </form>
                 </div>
              </div>

              <!-- Achievement Card (Professional) -->
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm flex items-center justify-between">
                 <div>
                    <h3 class="text-xl font-black text-slate-900 tracking-tight mb-1">Capaian Akademik & Budaya</h3>
                    <p class="text-xs text-slate-500">Poin dan level kontribusi Anda di dalam ekosistem yayasan.</p>
                 </div>
                 <div class="flex items-center gap-6">
                    <div class="text-center">
                       <p class="text-3xl font-black text-indigo-600 tracking-tighter">0</p>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Poin</p>
                    </div>
                    <div class="w-px h-10 bg-slate-100"></div>
                    <div class="text-center">
                       <p class="text-3xl font-black text-indigo-600 tracking-tighter">0</p>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Acara</p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- ACTIVITY TAB -->
           <div v-else-if="activeTab === 'activity'" class="animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-sm min-h-[400px]">
                 <h2 class="text-2xl font-black text-slate-900 tracking-tight mb-10">Jejak Aktivitas</h2>
                 <div class="flex flex-col items-center justify-center py-20 text-center opacity-40">
                    <div class="text-5xl mb-4 text-slate-300">🍃</div>
                    <p class="text-sm font-bold text-slate-500">Belum ada aktivitas terekam baru-baru ini.</p>
                    <p class="text-xs text-slate-400 mt-1 italic">Segera ikuti agenda yayasan untuk mulai beraksi.</p>
                 </div>
              </div>
           </div>

           <!-- SECURITY / SETTINGS TAB -->
           <div v-else-if="activeTab === 'settings'" class="animate-in fade-in slide-in-from-bottom-3 duration-500 space-y-8">
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-sm">
                 <h2 class="text-2xl font-black text-slate-900 tracking-tight mb-8">Keamanan Akun</h2>
                 
                 <div class="space-y-6">
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center text-xl">🔑</div>
                          <div>
                             <p class="text-sm font-black text-slate-800">Kata Sandi</p>
                             <p class="text-xs text-slate-400">Terakhir diubah 3 bulan yang lalu</p>
                          </div>
                       </div>
                       <button @click="alert('Fitur ubah sandi segera hadir.')" class="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">Ubah Sandi</button>
                    </div>

                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center text-xl">📱</div>
                          <div>
                             <p class="text-sm font-black text-slate-800">Autentikasi Dua Faktor</p>
                             <p class="text-xs text-red-400 font-bold">Belum Aktif</p>
                          </div>
                       </div>
                       <button @click="alert('Layanan 2FA sedang dikonfigurasi.')" class="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Aktifkan 2FA</button>
                    </div>

                    <div class="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center justify-between group">
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center text-xl">⚠️</div>
                          <div>
                             <p class="text-sm font-black text-rose-600">Hapus Akun</p>
                             <p class="text-xs text-rose-400">Tindakan ini tidak dapat dibatalkan</p>
                          </div>
                       </div>
                       <button @click="alert('Permintaan penghapusan akun akan dikirim ke admin.')" class="px-5 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all">Hapus Permanen</button>
                    </div>
                 </div>
              </div>

              <!-- Session History -->
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm">
                 <h3 class="text-lg font-black text-slate-900 tracking-tight uppercase mb-6">Riwayat Sesi</h3>
                 <div class="space-y-4">
                    <div class="flex justify-between items-center py-4 border-b border-slate-50 last:border-0">
                       <div class="flex items-center gap-3">
                          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <p class="text-xs font-bold text-slate-700">Perangkat Saat Ini (Google Chrome / macOS)</p>
                       </div>
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aktif Sekarang</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </main>

    <!-- FULL ID CARD MODAL (Premium Design) -->
    <div v-if="showFullCard" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
       <div class="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
          <div class="p-10 bg-gradient-to-br from-slate-900 to-indigo-900 text-white relative h-80 flex flex-col justify-between">
             <div class="absolute top-0 right-0 p-10 opacity-5 text-[12rem] -rotate-12">SASTRO</div>
             <div class="flex justify-between items-start relative z-10">
                <div class="flex items-center gap-3">
                   <img src="/logo.png" class="w-10 h-10 object-contain filter brightness-0 invert" />
                   <div>
                      <div class="font-black text-lg tracking-tighter leading-none">SASTRO JENDRO</div>
                      <div class="text-[8px] font-bold opacity-50 tracking-[0.3em] uppercase mt-1">Master Member Profile</div>
                   </div>
                </div>
                <div class="bg-indigo-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">Official</div>
             </div>

             <div class="flex items-center gap-6 relative z-10">
                <div class="w-24 h-24 rounded-3xl border-2 border-indigo-400/30 bg-slate-800 shadow-xl overflow-hidden shrink-0">
                   <img :src="'https://i.pravatar.cc/150?u=' + (member.fullName || 'new-member')" class="w-full h-full object-cover" />
                </div>
                <div class="overflow-hidden">
                   <h4 class="font-black text-2xl tracking-tighter leading-tight uppercase truncate">{{ member.fullName || 'NAMA LENGKAP' }}</h4>
                   <p class="text-[10px] font-black tracking-widest opacity-50 uppercase mt-1">ID: {{ member.memberId || 'SJ-PNDG-000' }}</p>
                </div>
             </div>
          </div>
          
          <div class="p-10 space-y-5 bg-white">
             <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1">
                   <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Otoritas Wilayah</p>
                   <p class="text-sm font-bold text-slate-800">{{ member.city || 'Belum diatur' }}</p>
                </div>
                <div class="space-y-1">
                   <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Berlaku Hingga</p>
                   <p class="text-sm font-bold text-slate-800 italic">Unlimited Access</p>
                </div>
             </div>
             
             <div class="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                   <p class="text-[9px] font-black text-slate-300 tracking-widest uppercase">Verified System</p>
                   <p class="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1.5 mt-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Valid Digital Identity
                   </p>
                </div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SASTRO-MEMBER" class="w-12 h-12 opacity-80" />
             </div>
             
             <button @click="showFullCard = false" class="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-black/20">Tutup Pratinjau</button>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useReveal } from '~/composables/useReveal'

definePageMeta({
  layout: false,
  middleware: 'member'
})

useReveal()

const activeTab = ref('profile')
const editing = ref(false)
const showFullCard = ref(false)

// Initial reactive state from what would be a session
const member = ref({
  memberId: '',
  fullName: '',
  email: '',
  experience: '',
  interests: [],
  city: '',
  status: 'pending', // Default for new accounts
  joinedAt: new Date(),
})

const form = ref({ ...member.value })

onMounted(() => {
  // Simulate fetching data from a real session/cookie
  const token = useCookie('member-token')
  if (token.value) {
    // In a real app, we'd fetch actual data. 
    // Here we'll keep it empty if it's a completely new mock session.
    // If we want to simulate an existing account, we could check email.
    member.value.email = 'member@sastrojendro.id' 
    // Data lainnya biarkan kosong sesuai permintaan user agar tidak norak penuh dummy
    form.value = { ...member.value }
  }
})

const updateProfile = () => {
  member.value = { ...form.value }
  editing.value = false
  alert('Profil berhasil diperbarui secara lokal.')
}

const removeInterest = (interest) => {
  member.value.interests = member.value.interests.filter(i => i !== interest)
}

const logout = () => {
  useCookie('member-token').value = null
  navigateTo('/member/login')
}

useHead({
  title: 'Member Hub - Sastro Jendro'
})
</script>

<style scoped>
.animate-in { animation-duration: 0.3s; animation-fill-mode: forwards; }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-from-bottom-3 { from { transform: translateY(0.75rem); } to { transform: translateY(0); } }
@keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.fade-in { animation-name: fade-in; }
.slide-in-from-bottom-3 { animation-name: slide-in-from-bottom-3; }
.zoom-in { animation-name: zoom-in; }
</style>
