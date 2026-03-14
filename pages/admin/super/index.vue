<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
    <PageLoader />
    
    <!-- Top Navigation -->
    <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-8 h-8 object-contain" />
        <span class="font-black tracking-tight text-slate-800 uppercase text-sm">Admin Console</span>
      </div>
      <div class="flex items-center gap-6">
        <div class="hidden md:flex flex-col text-right">
           <span class="text-xs font-black text-slate-900 leading-none">SUPER ADMIN</span>
           <span class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Master Otoritas</span>
        </div>
        <div class="h-8 w-px bg-slate-100 mx-2"></div>
        <button @click="logout" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Keluar Sesi
        </button>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-6 py-12 relative min-h-[calc(100vh-80px)]">
      <div class="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200/20 blur-[100px] -z-10 rounded-full"></div>

      <!-- Welcome Header -->
      <div class="mb-12 admin-fade-in" style="animation-delay: 0.1s;">
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2 italic">Otoritas Pusat: {{ viewTitle }}</h1>
        <p class="text-slate-500 font-medium italic max-w-2xl">Dashboard manajemen terpusat — data ini sinkron dengan seluruh halaman publik website.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        <!-- SIDEBAR -->
        <div class="space-y-6 admin-slide-left" style="animation-delay: 0.2s;">
          <!-- Master Card with Live Stats -->
          <div class="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
             <div class="absolute top-0 right-0 p-8 opacity-10 text-8xl -rotate-12 transition-transform group-hover:scale-110">🔑</div>
             <div class="relative z-10">
                <div class="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center backdrop-blur-md border border-white/10">
                   <img src="/logo.png" class="w-6 h-6 object-contain filter brightness-0 invert" />
                </div>
                <h3 class="font-black text-xl mb-1 tracking-tighter uppercase italic">Master Console</h3>
                <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-[0.2em] leading-none mb-8">Sinkronisasi Aktif</p>
                
                <div class="space-y-3 pt-6 border-t border-white/10">
                   <div class="flex justify-between items-center opacity-90">
                      <span class="text-[9px] font-black uppercase tracking-widest">Member</span>
                      <span class="text-[11px] font-black">{{ stats.totalMembers }}</span>
                   </div>
                   <div class="flex justify-between items-center opacity-90">
                      <span class="text-[9px] font-black uppercase tracking-widest">Artikel</span>
                      <span class="text-[11px] font-black">{{ stats.publishedArticles }}/{{ stats.totalArticles }}</span>
                   </div>
                   <div class="flex justify-between items-center opacity-90">
                      <span class="text-[9px] font-black uppercase tracking-widest">Admin</span>
                      <span class="text-[11px] font-black">{{ stats.activeAdmins }}</span>
                   </div>
                   <div class="flex justify-between items-center opacity-90">
                      <span class="text-[9px] font-black uppercase tracking-widest">Roles</span>
                      <span class="text-[11px] font-black">{{ stats.totalRoles }}</span>
                   </div>
                </div>
             </div>
          </div>

          <!-- Navigation Links -->
          <div class="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
             <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 pl-2">Menu Utama</h4>
             <div class="space-y-1">
                <button v-for="item in menuItems" :key="item.id" 
                  @click="currentView = item.id"
                  :class="[
                    'w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all',
                    currentView === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                  ]"
                >
                  <span>{{ item.label }}</span>
                  <span v-if="currentView === item.id" class="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                </button>
             </div>
          </div>
        </div>

        <!-- MAIN VIEW ENGINE -->
        <div class="lg:col-span-3 space-y-8 admin-slide-right" style="animation-delay: 0.3s;">
           
           <!-- ==================== DASHBOARD ==================== -->
           <div v-if="currentView === 'dashboard'" class="space-y-8">
              <div class="bg-white rounded-[3rem] border border-slate-200 p-10 md:p-14 shadow-sm">
                 <h2 class="text-3xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">Ringkasan Global</h2>
                 <p class="text-base text-slate-500 max-w-xl leading-relaxed font-medium mb-14">Semua angka di bawah ini bersumber langsung dari database pusat dan tersinkronisasi dengan halaman publik.</p>
                 <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                       <p class="text-3xl font-black text-indigo-600 tracking-tighter">{{ stats.totalMembers }}</p>
                       <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Anggota</p>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                       <p class="text-3xl font-black text-indigo-600 tracking-tighter">{{ stats.totalArticles }}</p>
                       <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Artikel</p>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                       <p class="text-3xl font-black text-indigo-600 tracking-tighter">{{ stats.activeAdmins }}</p>
                       <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Admin Aktif</p>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                       <p class="text-3xl font-black text-indigo-600 tracking-tighter">{{ stats.totalRoles }}</p>
                       <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Role</p>
                    </div>
                 </div>
              </div>
              <!-- Quick Actions -->
              <div class="bg-white rounded-[3rem] border border-slate-200 p-10 md:p-12 shadow-sm">
                 <h3 class="text-xl font-black text-slate-900 tracking-tight uppercase mb-8 italic">Pintasan Manajemen</h3>
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button @click="currentView = 'members'" class="p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
                       <div class="text-3xl mb-4">👥</div>
                       <p class="text-sm font-black uppercase tracking-widest text-slate-900 mb-1">Database Member</p>
                       <p class="text-xs text-slate-400 font-medium italic">{{ stats.totalMembers }} terdaftar</p>
                    </button>
                    <button @click="currentView = 'articles'" class="p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
                       <div class="text-3xl mb-4">📝</div>
                       <p class="text-sm font-black uppercase tracking-widest text-slate-900 mb-1">Konten Berita</p>
                       <p class="text-xs text-slate-400 font-medium italic">{{ stats.publishedArticles }} published, {{ stats.draftArticles }} draft</p>
                    </button>
                    <button @click="currentView = 'admin-users'" class="p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
                       <div class="text-3xl mb-4">⚙️</div>
                       <p class="text-sm font-black uppercase tracking-widest text-slate-900 mb-1">Otoritas Tim</p>
                       <p class="text-xs text-slate-400 font-medium italic">{{ stats.activeAdmins }} admin, {{ stats.totalRoles }} roles</p>
                    </button>
                 </div>
              </div>
           </div>

           <!-- ==================== MEMBERS ==================== -->
           <div v-else-if="currentView === 'members'" class="space-y-6">
              <div class="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
                 <div class="p-10 md:p-14">
                    <div class="flex justify-between items-center mb-12">
                       <div>
                          <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Database Anggota</h2>
                          <p class="text-xs text-slate-400 mt-2 italic">Data tersinkronisasi dengan halaman publik ({{ stats.totalMembers }} anggota aktif)</p>
                       </div>
                       <button @click="openMemberModal()" class="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all">+ Tambah</button>
                    </div>

                    <div v-if="members.length === 0" class="py-20 text-center opacity-40">
                       <p class="text-sm font-bold text-slate-500">Belum ada anggota terdaftar.</p>
                    </div>
                    <div v-else class="space-y-4">
                       <div v-for="m in members" :key="m.id" class="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-indigo-400 transition-all group flex items-center justify-between">
                          <div class="flex items-center gap-6">
                             <div class="w-14 h-14 bg-white rounded-3xl border border-slate-200 flex items-center justify-center text-xl italic font-black text-indigo-600 shadow-sm">{{ m.fullName.charAt(0) }}</div>
                             <div>
                                <p class="text-lg font-black text-slate-900 tracking-tight">{{ m.fullName }}</p>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{{ m.memberId }} • {{ m.city }} • {{ m.position }}</p>
                             </div>
                          </div>
                          <div class="flex gap-3">
                             <button @click="openIdCard(m)" class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm" title="Lihat ID Card">🪪</button>
                             <button @click="handleDeleteMember(m.id)" class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm" title="Hapus">🗑️</button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- ==================== ARTICLES ==================== -->
           <div v-else-if="currentView === 'articles'" class="space-y-6">
              <div class="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
                 <div class="p-10 md:p-14">
                    <div class="flex justify-between items-center mb-12">
                       <div>
                          <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Manajemen Konten</h2>
                          <p class="text-xs text-slate-400 mt-2 italic">Artikel yang dipublikasi akan muncul di halaman Beranda dan /berita</p>
                       </div>
                       <button @click="openArticleModal()" class="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all">+ Artikel Baru</button>
                    </div>

                    <div v-if="articles.length === 0" class="py-20 text-center opacity-40">
                       <p class="text-sm font-bold text-slate-500">Belum ada artikel.</p>
                    </div>
                    <div v-else class="space-y-4">
                       <div v-for="a in articles" :key="a._id" class="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-indigo-400 transition-all group flex items-center justify-between">
                          <div class="flex items-center gap-6 flex-1 min-w-0">
                             <div class="w-14 h-14 bg-white rounded-3xl border border-slate-200 flex items-center justify-center text-xl shadow-sm shrink-0">📝</div>
                             <div class="min-w-0">
                                <p class="text-base font-black text-slate-900 tracking-tight truncate">{{ a.title }}</p>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{{ a.category }} • {{ formatDate(a.createdAt) }}</p>
                             </div>
                          </div>
                          <div class="flex gap-3 items-center shrink-0 ml-4">
                             <button @click="handleToggleArticle(a._id)" :class="['px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all', a.status === 'published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100']">
                                {{ a.status === 'published' ? 'Published' : 'Draft' }}
                             </button>
                             <button @click="handleDeleteArticle(a._id)" class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm">🗑️</button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- ==================== ADMIN USERS ==================== -->
           <div v-else-if="currentView === 'admin-users'" class="space-y-6">
              <div class="bg-white rounded-[3rem] border border-slate-200 p-10 md:p-14 shadow-sm">
                 <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-12 italic">Otoritas Internal</h2>
                 <div class="grid grid-cols-1 gap-6">
                    <div v-for="admin in admins" :key="admin.id" class="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-indigo-300 transition-all flex items-center justify-between group">
                       <div class="flex items-center gap-6">
                          <div class="w-16 h-16 bg-white rounded-[2rem] border border-slate-200 flex items-center justify-center text-3xl shadow-sm">💼</div>
                          <div>
                             <p class="text-lg font-black text-slate-900 uppercase tracking-tight">{{ admin.name }}</p>
                             <p class="text-xs font-bold text-slate-400 italic mt-0.5">{{ admin.email }} • Role: {{ getRoleName(admin.role) }}</p>
                          </div>
                       </div>
                       <div class="flex items-center gap-4">
                          <select :value="admin.role" @change="handleRoleChange(admin.id, Number($event.target.value))" class="bg-white border border-slate-200 rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-600 shadow-sm transition-all">
                             <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                          </select>
                          <button @click="handleToggleAdmin(admin.id)" :class="['w-5 h-5 rounded-full shadow-sm ring-4 ring-offset-2 transition-all', admin.active ? 'bg-emerald-500 ring-emerald-500/20' : 'bg-red-500 ring-red-500/20']" :title="admin.active ? 'Aktif — klik untuk nonaktifkan' : 'Nonaktif — klik untuk aktifkan'"></button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- ==================== ROLES (RBAC) ==================== -->
           <div v-else-if="currentView === 'roles'" class="space-y-6">
              <div class="bg-white rounded-[3rem] border border-slate-200 p-10 md:p-14 shadow-sm">
                 <div class="flex justify-between items-center mb-12">
                    <div>
                       <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Politik RBAC</h2>
                       <p class="text-xs text-slate-400 mt-2 italic">Setiap role menentukan hak akses admin di seluruh sistem</p>
                    </div>
                    <button @click="openRoleModal()" class="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all">+ Role Baru</button>
                 </div>
                 <div class="grid grid-cols-1 gap-6">
                    <div v-for="role in roles" :key="role.id" class="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-indigo-300 transition-all">
                       <div class="flex justify-between items-start mb-4">
                          <div>
                             <h4 class="font-black text-slate-900 uppercase tracking-tight text-xl italic">{{ role.name }}</h4>
                             <p class="text-sm text-slate-500 font-medium leading-relaxed mt-2">{{ role.description }}</p>
                          </div>
                          <div class="flex gap-2">
                             <span v-if="role.isSystem" class="px-3 py-1 bg-indigo-50 text-indigo-500 rounded-lg text-[9px] font-black uppercase tracking-widest">System</span>
                             <button v-if="!role.isSystem" @click="handleDeleteRole(role.id)" class="px-3 py-1 bg-red-50 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-all">Hapus</button>
                          </div>
                       </div>
                       <div class="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200/50">
                          <span v-for="perm in role.permissions" :key="perm" class="px-3 py-1.5 bg-white text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm">{{ perm }}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </main>

    <!-- ==================== MODALS ==================== -->
    
    <!-- Member Add Modal -->
    <div v-if="showMemberModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" @click.self="showMemberModal = false">
       <div class="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-3xl admin-zoom-in border border-slate-100">
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic uppercase">Registrasi Anggota</h3>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-10 italic">Data akan tersinkronisasi ke homepage</p>
          <form @submit.prevent="saveMember" class="space-y-5">
             <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Nama Lengkap</label>
                   <input v-model="memberForm.fullName" type="text" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
                </div>
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">ID Anggota</label>
                   <input v-model="memberForm.memberId" type="text" required placeholder="SJ-XXXX" class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black uppercase border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
                </div>
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Domisili</label>
                   <input v-model="memberForm.city" type="text" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
                </div>
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Email</label>
                   <input v-model="memberForm.email" type="email" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
                </div>
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Telepon</label>
                   <input v-model="memberForm.phone" type="tel" class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
                </div>
             </div>
             <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Simpan ke Database</button>
                <button type="button" @click="showMemberModal = false" class="px-6 py-5 text-slate-400 text-[10px] font-black uppercase tracking-widest">Batal</button>
             </div>
          </form>
       </div>
    </div>

    <!-- Article Add Modal -->
    <div v-if="showArticleModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" @click.self="showArticleModal = false">
       <div class="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-3xl admin-zoom-in border border-slate-100">
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic uppercase">Tulis Artikel</h3>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-10 italic">Langsung tampil di /berita saat dipublish</p>
          <form @submit.prevent="saveArticle" class="space-y-5">
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Judul Artikel</label>
                <input v-model="articleForm.title" type="text" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Ringkasan</label>
                <textarea v-model="articleForm.excerpt" rows="3" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border border-slate-200 outline-none focus:border-indigo-600 transition-all resize-none"></textarea>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Kategori</label>
                   <select v-model="articleForm.category" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all">
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Seni">Seni</option>
                      <option value="Acara">Acara</option>
                      <option value="Komunitas">Komunitas</option>
                   </select>
                </div>
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Slug URL</label>
                   <input v-model="articleForm.slug" type="text" required placeholder="judul-singkat" class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
                </div>
             </div>
             <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Publish Artikel</button>
                <button type="button" @click="showArticleModal = false" class="px-6 py-5 text-slate-400 text-[10px] font-black uppercase tracking-widest">Batal</button>
             </div>
          </form>
       </div>
    </div>

    <!-- Role Add Modal -->
    <div v-if="showRoleModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" @click.self="showRoleModal = false">
       <div class="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-3xl admin-zoom-in border border-slate-100">
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic uppercase">Definisi Role</h3>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-10 italic">Tentukan akses terstruktur</p>
          <form @submit.prevent="saveRole" class="space-y-5">
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Nama Role</label>
                <input v-model="roleForm.name" type="text" required placeholder="contoh: moderator" class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-600 transition-all" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 pl-2">Deskripsi</label>
                <textarea v-model="roleForm.description" rows="2" required class="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border border-slate-200 outline-none focus:border-indigo-600 transition-all resize-none"></textarea>
             </div>
             <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Simpan Role</button>
                <button type="button" @click="showRoleModal = false" class="px-6 py-5 text-slate-400 text-[10px] font-black uppercase tracking-widest">Batal</button>
             </div>
          </form>
       </div>
    </div>

    <!-- ID CARD PREVIEW -->
    <div v-if="selectedMemberForCard" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" @click.self="selectedMemberForCard = null">
       <div class="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] admin-zoom-in border border-slate-200">
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
                   <img :src="'https://i.pravatar.cc/150?u=' + selectedMemberForCard.fullName" class="w-full h-full object-cover" />
                </div>
                <div class="overflow-hidden">
                   <h4 class="font-black text-2xl tracking-tighter leading-tight uppercase truncate italic">{{ selectedMemberForCard.fullName }}</h4>
                   <p class="text-[10px] font-black tracking-widest opacity-50 uppercase mt-1">{{ selectedMemberForCard.memberId }}</p>
                </div>
             </div>
          </div>
          <div class="p-10 space-y-6 bg-white">
             <div class="grid grid-cols-2 gap-6 border-b border-slate-50 pb-6">
                <div>
                   <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">Wilayah</span>
                   <span class="text-sm font-bold text-slate-800">{{ selectedMemberForCard.city }}</span>
                </div>
                <div>
                   <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">Posisi</span>
                   <span class="text-sm font-bold text-indigo-600 italic">{{ selectedMemberForCard.position }}</span>
                </div>
             </div>
             <div class="pt-2 flex justify-between items-center text-emerald-500">
                <p class="text-[10px] font-black uppercase flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Identity Verified</p>
                <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SJ-' + selectedMemberForCard.memberId" class="w-14 h-14 opacity-80 border border-slate-100 rounded-lg p-1" />
             </div>
             <button @click="selectedMemberForCard = null" class="w-full mt-4 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Tutup Pratinjau</button>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: false,
  middleware: 'superadmin'
})

// USE CENTRALIZED DATA — no hardcoded data here!
const { 
  articles, members, admins, roles,
  stats, formatDate, getRoleName,
  addArticle, deleteArticle, toggleArticleStatus,
  addMember, deleteMember: removeMember,
  updateAdminRole, toggleAdminStatus,
  addRole, deleteRole,
} = useAppData()

const currentView = ref('dashboard')
const showMemberModal = ref(false)
const showArticleModal = ref(false)
const showRoleModal = ref(false)
const selectedMemberForCard = ref(null)

const menuItems = [
  { id: 'dashboard', label: 'Monitor' },
  { id: 'members', label: 'Database User' },
  { id: 'articles', label: 'Konten Berita' },
  { id: 'admin-users', label: 'Otoritas Admin' },
  { id: 'roles', label: 'Politik RBAC' },
]

const viewTitle = computed(() => {
  const titles = {
    dashboard: 'Status Pusat',
    members: 'Data Anggota',
    articles: 'Manajemen Berita',
    'admin-users': 'Akses Admin',
    roles: 'Konfigurasi Role',
  }
  return titles[currentView.value] || 'Console'
})

// --- FORM STATES ---
const memberForm = ref({ fullName: '', memberId: '', city: '', email: '', phone: '' })
const articleForm = ref({ title: '', excerpt: '', category: 'Pendidikan', slug: '' })
const roleForm = ref({ name: '', description: '' })

// --- MODAL OPENERS ---
const openMemberModal = () => { memberForm.value = { fullName: '', memberId: '', city: '', email: '', phone: '' }; showMemberModal.value = true }
const openArticleModal = () => { articleForm.value = { title: '', excerpt: '', category: 'Pendidikan', slug: '' }; showArticleModal.value = true }
const openRoleModal = () => { roleForm.value = { name: '', description: '' }; showRoleModal.value = true }
const openIdCard = (m) => selectedMemberForCard.value = m

// --- ACTIONS (delegates to composable) ---
const saveMember = () => { addMember(memberForm.value); showMemberModal.value = false }
const saveArticle = () => { addArticle({ ...articleForm.value, status: 'published' }); showArticleModal.value = false }
const saveRole = () => { addRole(roleForm.value); showRoleModal.value = false }

const handleDeleteMember = (id) => { if (confirm('Hapus data member secara permanen? Perubahan berlaku di seluruh situs.')) removeMember(id) }
const handleDeleteArticle = (id) => { if (confirm('Hapus artikel ini? Tidak akan lagi tampil di halaman publik.')) deleteArticle(id) }
const handleDeleteRole = (id) => { if (confirm('Hapus role ini?')) deleteRole(id) }
const handleToggleArticle = (id) => toggleArticleStatus(id)
const handleRoleChange = (adminId, roleId) => updateAdminRole(adminId, roleId)
const handleToggleAdmin = (adminId) => toggleAdminStatus(adminId)

const logout = () => {
  useCookie('admin-token').value = null
  navigateTo('/member/login')
}

useHead({ title: 'Master Console - Sastro Jendro' })
</script>

<style scoped>
@keyframes adminFadeIn { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
@keyframes adminSlideLeft { from { opacity: 0; transform: translateX(-2rem); } to { opacity: 1; transform: translateX(0); } }
@keyframes adminSlideRight { from { opacity: 0; transform: translateX(2rem); } to { opacity: 1; transform: translateX(0); } }
@keyframes adminZoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.admin-fade-in { animation: adminFadeIn 0.7s ease-out both; }
.admin-slide-left { animation: adminSlideLeft 0.7s ease-out both; }
.admin-slide-right { animation: adminSlideRight 0.7s ease-out both; }
.admin-zoom-in { animation: adminZoomIn 0.4s ease-out both; }
</style>
