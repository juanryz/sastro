<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
    <PageLoader />
    
    <!-- Top Navigation -->
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
      <div class="mb-12 profile-fade-in" style="animation-delay: 0.1s;">
        <h1 class="text-4xl font-black text-slate-900 tracking-tighter mb-2">Selamat Datang, {{ member?.fullName || 'Anggota Baru' }}</h1>
        <p class="text-slate-500 font-medium">Kelola profil, akses kartu anggota digital, dan pantau aktivitas Anda di sini.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Sidebar -->
        <div class="space-y-6 profile-slide-left" style="animation-delay: 0.2s;">
          <!-- Member Card -->
          <div class="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
             <div class="absolute top-0 right-0 p-8 opacity-10 text-8xl -rotate-12 transition-transform group-hover:scale-110">🪪</div>
             <div class="relative z-10">
                <!-- Profile Photo with Upload -->
                <div class="relative w-20 h-20 mb-6">
                   <div class="w-20 h-20 bg-white/20 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10">
                      <img v-if="member?.profilePhoto" :src="member.profilePhoto" class="w-full h-full object-cover" />
                      <img v-else :src="'https://i.pravatar.cc/150?u=' + (member?.email || 'new')" class="w-full h-full object-cover" />
                   </div>
                   <label class="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                      <span class="text-sm">📷</span>
                      <input type="file" accept="image/*" class="hidden" @change="handlePhotoUpload" />
                   </label>
                </div>
                <h3 class="font-black text-xl mb-1 tracking-tighter uppercase">{{ member?.fullName || 'LENGKAPI NAMA' }}</h3>
                <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{{ member?.memberId || 'PENDING' }}</p>
                
                <div class="mt-10 pt-6 border-t border-white/20 flex justify-between items-center">
                   <div>
                     <p class="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Status</p>
                     <p class="text-xs font-bold uppercase tracking-tight">{{ member?.status === 'verified' ? '✓ Terverifikasi' : '⏳ Proses Validasi' }}</p>
                   </div>
                   <button @click="showFullCard = true" class="px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg">Lihat Card</button>
                </div>
             </div>
          </div>

          <!-- Quick Navigation -->
          <div class="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Navigasi Cepat</h4>
             <div class="space-y-2">
                <button v-for="tab in tabs" :key="tab.id" 
                  @click="activeTab = tab.id"
                  :class="[
                    'w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all',
                    activeTab === tab.id ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'text-slate-500 hover:bg-slate-50'
                  ]"
                >
                  <span>{{ tab.label }}</span>
                  <span v-if="activeTab === tab.id" class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                </button>
             </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-2 space-y-8 profile-slide-right" style="animation-delay: 0.3s;">
           
           <!-- PROFILE DATA TAB -->
           <div v-if="activeTab === 'profile'" class="space-y-8">
              <div class="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                 <div class="p-8 md:p-10">
                    <div class="flex justify-between items-start mb-10">
                       <h2 class="text-2xl font-black text-slate-900 tracking-tight">Informasi Dasar</h2>
                       <button @click="editing = !editing" class="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">{{ editing ? 'Batal' : 'Edit Profil' }}</button>
                    </div>

                    <form @submit.prevent="updateProfile" class="space-y-8">
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div class="space-y-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                             <div v-if="!editing" class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-transparent" :class="member?.fullName ? 'text-slate-800' : 'text-slate-400 italic'">
                                {{ member?.fullName || 'Belum diatur' }}
                             </div>
                             <input v-else v-model="form.fullName" type="text" class="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-500 transition-all" />
                          </div>

                          <div class="space-y-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Terdaftar</label>
                             <div class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-800 border border-transparent opacity-60">
                                {{ member?.email }}
                             </div>
                          </div>
                       </div>

                       <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div class="space-y-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Domisili / Kota</label>
                             <div v-if="!editing" class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-transparent" :class="member?.city ? 'text-slate-800' : 'text-slate-400 italic'">
                                {{ member?.city || 'Belum diatur' }}
                             </div>
                             <input v-else v-model="form.city" type="text" class="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-500 transition-all" />
                          </div>

                          <div class="space-y-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">No. Telepon</label>
                             <div v-if="!editing" class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-transparent" :class="member?.phone ? 'text-slate-800' : 'text-slate-400 italic'">
                                {{ member?.phone || 'Belum diatur' }}
                             </div>
                             <input v-else v-model="form.phone" type="tel" class="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-500 transition-all" />
                          </div>
                       </div>

                       <!-- Bio / Experience -->
                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tentang / Pengalaman</label>
                          <div v-if="!editing" class="px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium leading-relaxed border border-transparent" :class="member?.experience ? 'text-slate-600' : 'text-slate-400 italic'">
                             {{ member?.experience || 'Tambahkan deskripsi singkat tentang pengalaman atau minat Anda di sini.' }}
                          </div>
                          <textarea v-else v-model="form.experience" rows="4" class="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border border-slate-200 outline-none focus:border-indigo-500 transition-all"></textarea>
                       </div>

                       <!-- Interests -->
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bidang Minat</label>
                          <div class="flex flex-wrap gap-2">
                             <span v-for="interest in (member?.interests || [])" :key="interest" class="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 flex items-center gap-2">
                                {{ interest }}
                                <button v-if="editing" @click="removeInterest(interest)" class="hover:text-red-500">×</button>
                             </span>
                             <div v-if="editing" class="flex gap-2">
                                <input v-model="newInterest" type="text" placeholder="Tambah bidang..." class="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-400 w-40" @keydown.enter.prevent="addInterest" />
                                <button type="button" @click="addInterest" class="px-4 py-2 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-500 text-xs font-bold hover:bg-indigo-50 transition">+ Tambah</button>
                             </div>
                          </div>
                       </div>

                       <div v-if="editing" class="pt-6 border-t border-slate-100">
                          <button type="submit" class="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Simpan Perubahan</button>
                       </div>
                    </form>
                 </div>
              </div>
           </div>

           <!-- ACTIVITY TAB -->
           <div v-else-if="activeTab === 'activity'">
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-sm min-h-[400px]">
                 <h2 class="text-2xl font-black text-slate-900 tracking-tight mb-10">Jejak Aktivitas</h2>
                 <div class="flex flex-col items-center justify-center py-20 text-center opacity-40">
                    <div class="text-5xl mb-4 text-slate-300">🍃</div>
                    <p class="text-sm font-bold text-slate-500">Belum ada aktivitas terekam baru-baru ini.</p>
                    <p class="text-xs text-slate-400 mt-1 italic">Segera ikuti agenda yayasan untuk mulai beraksi.</p>
                 </div>
              </div>
           </div>

           <!-- SECURITY TAB -->
           <div v-else-if="activeTab === 'settings'" class="space-y-8">
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-sm">
                 <h2 class="text-2xl font-black text-slate-900 tracking-tight mb-8">Keamanan Akun</h2>
                 
                 <div class="space-y-6">
                    <!-- CHANGE PASSWORD -->
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all">
                       <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                             <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🔑</div>
                             <div>
                                <p class="text-sm font-black text-slate-800">Kata Sandi</p>
                                <p class="text-xs text-slate-400">Ubah kata sandi akun Anda</p>
                             </div>
                          </div>
                          <button @click="showPasswordModal = true" class="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">Ubah Sandi</button>
                       </div>
                    </div>

                    <!-- 2FA -->
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all">
                       <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                             <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">📱</div>
                             <div>
                                <p class="text-sm font-black text-slate-800">Autentikasi Dua Faktor</p>
                                <p class="text-xs font-bold" :class="twoFactorEnabled ? 'text-emerald-500' : 'text-red-400'">{{ twoFactorEnabled ? 'Aktif' : 'Belum Aktif' }}</p>
                             </div>
                          </div>
                          <button @click="toggle2FA" :class="['px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm', twoFactorEnabled ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700']">
                             {{ twoFactorEnabled ? 'Nonaktifkan' : 'Aktifkan 2FA' }}
                          </button>
                       </div>
                    </div>

                    <!-- DELETE ACCOUNT -->
                    <div class="p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                       <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                             <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">⚠️</div>
                             <div>
                                <p class="text-sm font-black text-rose-600">Hapus Akun</p>
                                <p class="text-xs text-rose-400">Tindakan ini tidak dapat dibatalkan</p>
                             </div>
                          </div>
                          <button @click="handleDeleteAccount" class="px-5 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all">Hapus Permanen</button>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Session History -->
              <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm">
                 <h3 class="text-lg font-black text-slate-900 tracking-tight uppercase mb-6">Riwayat Sesi</h3>
                 <div class="space-y-4">
                    <div class="flex justify-between items-center py-4 border-b border-slate-50">
                       <div class="flex items-center gap-3">
                          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <p class="text-xs font-bold text-slate-700">Perangkat Saat Ini (Browser / {{ userAgent }})</p>
                       </div>
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aktif Sekarang</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </main>

    <!-- ID CARD MODAL -->
    <div v-if="showFullCard" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" @click.self="showFullCard = false">
       <div class="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] profile-zoom-in border border-slate-200">
          <div class="p-10 bg-gradient-to-br from-slate-900 to-indigo-900 text-white relative h-80 flex flex-col justify-between">
             <div class="absolute top-0 right-0 p-10 opacity-5 text-[12rem] -rotate-12 italic font-black">SASTRO</div>
             <div class="flex justify-between items-start relative z-10">
                <div class="flex items-center gap-3">
                   <img src="/logo.png" class="w-10 h-10 object-contain filter brightness-0 invert" />
                   <div>
                      <div class="font-black text-lg tracking-tighter leading-none italic">SASTRO JENDRO</div>
                      <div class="text-[8px] font-bold opacity-50 tracking-[0.3em] uppercase mt-1">Digital Identity Card</div>
                   </div>
                </div>
                <div class="bg-indigo-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">Official</div>
             </div>
             <div class="flex items-center gap-6 relative z-10">
                <div class="w-24 h-24 rounded-3xl border-2 border-indigo-400/30 bg-slate-800 shadow-xl overflow-hidden shrink-0">
                   <img v-if="member?.profilePhoto" :src="member.profilePhoto" class="w-full h-full object-cover" />
                   <img v-else :src="'https://i.pravatar.cc/150?u=' + (member?.email || 'new')" class="w-full h-full object-cover" />
                </div>
                <div class="overflow-hidden">
                   <h4 class="font-black text-2xl tracking-tighter leading-tight uppercase truncate italic">{{ member?.fullName || 'NAMA LENGKAP' }}</h4>
                   <p class="text-[10px] font-black tracking-widest opacity-50 uppercase mt-1">{{ member?.memberId || 'SJ-PNDG' }}</p>
                </div>
             </div>
          </div>
          <div class="p-10 space-y-5 bg-white">
             <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1">
                   <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Wilayah</p>
                   <p class="text-sm font-bold text-slate-800">{{ member?.city || 'Belum diatur' }}</p>
                </div>
                <div class="space-y-1">
                   <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Posisi</p>
                   <p class="text-sm font-bold text-indigo-600 italic">{{ member?.position || 'Anggota' }}</p>
                </div>
             </div>
             <div class="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                   <p class="text-[9px] font-black text-slate-300 tracking-widest uppercase">Verified System</p>
                   <p class="text-[10px] font-bold uppercase flex items-center gap-1.5 mt-1" :class="member?.status === 'verified' ? 'text-emerald-500' : 'text-amber-500'">
                      <span class="w-1.5 h-1.5 rounded-full" :class="member?.status === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'"></span>
                      {{ member?.status === 'verified' ? 'Valid Digital Identity' : 'Pending Verification' }}
                   </p>
                </div>
                <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SASTRO-' + (member?.memberId || 'PENDING')" class="w-12 h-12 opacity-80 border border-slate-100 rounded-lg p-1" />
             </div>
             <button @click="showFullCard = false" class="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg">Tutup Pratinjau</button>
          </div>
       </div>
    </div>

    <!-- CHANGE PASSWORD MODAL -->
    <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" @click.self="showPasswordModal = false">
       <div class="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-3xl profile-zoom-in border border-slate-100">
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic uppercase">Ubah Kata Sandi</h3>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-10 italic">Masukkan sandi lama dan baru</p>
          <form @submit.prevent="handleChangePassword" class="space-y-5">
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Sandi Lama</label>
                <input v-model="passwordForm.oldPassword" type="password" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Sandi Baru</label>
                <input v-model="passwordForm.newPassword" type="password" required minlength="6" class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Konfirmasi Sandi Baru</label>
                <input v-model="passwordForm.confirmPassword" type="password" required minlength="6" class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
             </div>
             <div v-if="passwordError" class="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 text-center">{{ passwordError }}</div>
             <div v-if="passwordSuccess" class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-600 text-center">{{ passwordSuccess }}</div>
             <div class="flex gap-4 pt-4">
                <button type="submit" class="flex-1 bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Ubah Kata Sandi</button>
                <button type="button" @click="showPasswordModal = false" class="px-6 py-5 text-slate-400 text-[10px] font-black uppercase tracking-widest">Batal</button>
             </div>
          </form>
       </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

definePageMeta({
  layout: false,
  middleware: 'member'
})

const { getMemberByEmail, updateMember, updateMemberPassword, updateMemberPhoto, deleteMember: removeMember } = useAppData()

const activeTab = ref('profile')
const editing = ref(false)
const showFullCard = ref(false)
const showPasswordModal = ref(false)
const twoFactorEnabled = ref(false)
const newInterest = ref('')
const member = ref(null)
const form = ref({})
const passwordForm = ref({ oldPassword: '', newPassword: '', confirmPassword: '' })
const passwordError = ref('')
const passwordSuccess = ref('')

const tabs = [
  { id: 'profile', label: 'Data Pribadi' },
  { id: 'activity', label: 'Aktivitas Saya' },
  { id: 'settings', label: 'Keamanan Akun' },
]

const userAgent = computed(() => {
  if (process.client) {
    if (navigator.userAgent.includes('Mac')) return 'macOS'
    if (navigator.userAgent.includes('Windows')) return 'Windows'
    if (navigator.userAgent.includes('Linux')) return 'Linux'
    return 'Desktop'
  }
  return 'Desktop'
})

onMounted(() => {
  const emailCookie = useCookie('member-email')
  if (emailCookie.value) {
    const found = getMemberByEmail(emailCookie.value)
    if (found) {
      member.value = found
      form.value = { fullName: found.fullName, experience: found.experience || '', city: found.city || '', phone: found.phone || '' }
    }
  }
  if (!member.value) {
    // Fallback for mock sessions — use the first member
    const fallback = getMemberByEmail('budi@sastrojendro.id')
    if (fallback) {
      member.value = fallback
      form.value = { fullName: fallback.fullName, experience: fallback.experience || '', city: fallback.city || '', phone: fallback.phone || '' }
    }
  }
})

// --- PROFILE UPDATES ---
const updateProfile = () => {
  if (member.value) {
    updateMember(member.value.id, form.value)
    member.value = { ...member.value, ...form.value }
    editing.value = false
  }
}

const removeInterest = (interest) => {
  if (member.value) {
    const newInterests = member.value.interests.filter(i => i !== interest)
    updateMember(member.value.id, { interests: newInterests })
    member.value.interests = newInterests
  }
}

const addInterest = () => {
  if (newInterest.value.trim() && member.value) {
    const interests = [...(member.value.interests || []), newInterest.value.trim()]
    updateMember(member.value.id, { interests })
    member.value.interests = interests
    newInterest.value = ''
  }
}

// --- PHOTO UPLOAD ---
const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (!file || !member.value) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    const photoUrl = e.target.result
    updateMemberPhoto(member.value.id, photoUrl)
    member.value.profilePhoto = photoUrl
  }
  reader.readAsDataURL(file)
}

// --- PASSWORD CHANGE ---
const handleChangePassword = () => {
  passwordError.value = ''
  passwordSuccess.value = ''
  
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Konfirmasi sandi baru tidak cocok.'
    return
  }
  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = 'Kata sandi baru minimal 6 karakter.'
    return
  }
  
  const result = updateMemberPassword(member.value.id, passwordForm.value.oldPassword, passwordForm.value.newPassword)
  if (result.success) {
    passwordSuccess.value = 'Kata sandi berhasil diubah!'
    passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
    setTimeout(() => { showPasswordModal.value = false; passwordSuccess.value = '' }, 1500)
  } else {
    passwordError.value = result.error
  }
}

// --- 2FA TOGGLE ---
const toggle2FA = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  alert(twoFactorEnabled.value ? '2FA berhasil diaktifkan! (Simulasi)' : '2FA dinonaktifkan.')
}

// --- DELETE ACCOUNT ---
const handleDeleteAccount = () => {
  const confirmed = confirm('PERINGATAN: Akun Anda akan dihapus secara permanen dari database. Tindakan ini TIDAK DAPAT dibatalkan.\n\nApakah Anda benar-benar yakin?')
  if (confirmed && member.value) {
    removeMember(member.value.id)
    useCookie('member-token').value = null
    useCookie('member-email').value = null
    alert('Akun berhasil dihapus. Anda akan dialihkan ke halaman utama.')
    navigateTo('/')
  }
}

const logout = () => {
  useCookie('member-token').value = null
  useCookie('member-email').value = null
  navigateTo('/member/login')
}

useHead({ title: 'Member Hub - Sastro Jendro' })
</script>

<style scoped>
@keyframes profileFadeIn { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
@keyframes profileSlideLeft { from { opacity: 0; transform: translateX(-2rem); } to { opacity: 1; transform: translateX(0); } }
@keyframes profileSlideRight { from { opacity: 0; transform: translateX(2rem); } to { opacity: 1; transform: translateX(0); } }
@keyframes profileZoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.profile-fade-in { animation: profileFadeIn 0.7s ease-out both; }
.profile-slide-left { animation: profileSlideLeft 0.7s ease-out both; }
.profile-slide-right { animation: profileSlideRight 0.7s ease-out both; }
.profile-zoom-in { animation: profileZoomIn 0.4s ease-out both; }
</style>
