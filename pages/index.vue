<template>
  <div class="text-slate-900">
    <PageLoader />
    <!-- HERO SECTION -->
    <section class="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden">
      <!-- Animated Background Effects -->
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-slate-50 to-sky-100"></div>
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-300/40 to-cyan-300/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-purple-300/40 to-sky-300/40 rounded-full blur-[100px] mix-blend-multiply opacity-60 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 text-center lg:text-left">
            <div class="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md mb-8 hover:bg-white/80 transition cursor-default">
              <span class="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></span>
              <span class="text-xs font-bold text-indigo-700 uppercase tracking-widest">Pelestari Budaya Nusantara</span>
            </div>
            
            <h1 class="reveal delay-1 text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-800 leading-[1.1] tracking-tight mb-6 relative">
              Napak Tilas <br class="hidden sm:block"/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Tradisi</span>, <br class="hidden sm:block"/>
              Merajut <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Masa Depan</span>
            </h1>
            
            <p class="reveal delay-2 text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Sastro Jendro hadir menyatukan kearifan lokal, seni klasik, dan kolaborasi modern agar budaya luhur Jawa terus hidup, relevan, dan dicintai lintas generasi.
            </p>
            
            <div class="reveal delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink to="/register" class="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all text-center">
                Gabung Komunitas
              </NuxtLink>
              <NuxtLink to="/yayasan" class="rounded-full bg-white/60 backdrop-blur-md border border-white/80 px-8 py-4 font-bold text-slate-700 shadow-lg shadow-slate-200/50 hover:bg-white/80 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2">
                Program Yayasan
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </NuxtLink>
            </div>
          </div>
          
          <div class="reveal-right delay-2 lg:col-span-5 relative hidden lg:block">
            <!-- Hero Visual Glass Component -->
            <div class="relative w-full aspect-[4/5] rounded-[3rem] bg-gradient-to-tr from-white/40 to-white/10 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-indigo-200/50 overflow-hidden flex flex-col items-center justify-center p-8 group">
              <!-- Inner Ambient -->
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/10 z-0"></div>
              
              <div class="relative z-10 w-full">
                <!-- Stat Card 1 -->
                <div class="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 mb-6 transform -rotate-3 transition hover:rotate-0 hover:scale-105 duration-300">
                  <div class="flex items-center gap-5">
                    <div class="w-16 h-16 rounded-[1.2rem] bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl shadow-inner border border-white">🎭</div>
                    <div>
                      <h4 class="text-4xl font-extrabold text-slate-800">{{ stats.totalArticles }}+</h4>
                      <p class="text-sm font-bold text-indigo-500 uppercase tracking-widest mt-1">Konten Budaya</p>
                    </div>
                  </div>
                </div>
                
                <!-- Stat Card 2 -->
                <div class="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 transform translate-x-10 rotate-2 transition hover:rotate-0 hover:scale-105 duration-300">
                  <div class="flex items-center gap-5">
                    <div class="w-16 h-16 rounded-[1.2rem] bg-cyan-100 text-cyan-600 flex items-center justify-center text-3xl shadow-inner border border-white">👥</div>
                    <div>
                      <h4 class="text-4xl font-extrabold text-slate-800">{{ stats.totalMembers }}+</h4>
                      <p class="text-sm font-bold text-cyan-600 uppercase tracking-widest mt-1">Anggota Aktif</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Decorative element inside -->
              <div class="absolute -bottom-10 -right-10 w-64 h-64 border-[30px] border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PILAR PROGRAM -->
    <section class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="reveal text-center mb-16 max-w-3xl mx-auto">
          <h2 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 border border-indigo-200 bg-indigo-50/50 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full">Fokus Utama</h2>
          <h3 class="text-3xl sm:text-5xl font-extrabold text-slate-800 mb-6">Dedikasi Untuk Budaya & Masyarakat</h3>
          <p class="text-lg text-slate-600">Terbuka untuk pelestarian yang bermakna dan berdampak positif bagi semua.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="reveal delay-1 group relative bg-white/50 backdrop-blur-xl border border-white/80 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            <div class="w-20 h-20 rounded-[1.8rem] bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl mb-8 shadow-inner border border-white relative z-10">🎨</div>
            <h4 class="text-2xl font-bold text-slate-800 mb-4 relative z-10">Seni Klasik</h4>
            <p class="text-slate-600 leading-relaxed relative z-10 font-medium">Pengadaan workshop reguler, mulai dari menabuh gamelan, memahat wayang kulit, hingga berlatih tari klasik bersama para seniman dan maestro lokal berkelanjutan.</p>
          </div>
          
          <div class="reveal delay-2 group relative bg-white/50 backdrop-blur-xl border border-white/80 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden mt-0 md:mt-12">
            <div class="w-20 h-20 rounded-[1.8rem] bg-sky-100 text-sky-600 flex items-center justify-center text-4xl mb-8 shadow-inner border border-white relative z-10">🎓</div>
            <h4 class="text-2xl font-bold text-slate-800 mb-4 relative z-10">Pendidikan</h4>
            <p class="text-slate-600 leading-relaxed relative z-10 font-medium">Program pembelajaran untuk menyiapkan generasi muda. Lebih dari sekadar kesenian, kita juga mempelajari nilai budi pekerti esensial dari literatur ajaran Jawa.</p>
          </div>
          
          <div class="reveal delay-3 group relative bg-white/50 backdrop-blur-xl border border-white/80 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden mt-0 md:mt-24">
            <div class="w-20 h-20 rounded-[1.8rem] bg-purple-100 text-purple-600 flex items-center justify-center text-4xl mb-8 shadow-inner border border-white relative z-10">🤝</div>
            <h4 class="text-2xl font-bold text-slate-800 mb-4 relative z-10">Manfaat Sosial</h4>
            <p class="text-slate-600 leading-relaxed relative z-10 font-medium">Selain berkesenian, kami saling mendukung melalui wadah Koperasi Sastro Jendro (S.H.U, Simpan Pinjam) untuk menjaga jaring pengaman sosial tiap anggota.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VIDEO HIGHLIGHT -->
    <section class="py-24 relative bg-slate-900 overflow-hidden">
      <!-- Ambient Glow Behind Video -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="reveal text-center mb-14">
          <div class="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">Pementasan Legenda</div>
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Sastra Jendra Hayuningrat<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Pangruwating Diyu</span>
          </h2>
          <p class="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto font-medium">Saksikan pementasan epik yang mengajarkan peleburan sifat buruk dan merajut kembali keharmonisan alam semesta lewat kebijaksanaan kuno tercinta kita.</p>
        </div>
        
        <!-- Premium Glass Frame for Embed -->
        <div class="reveal-scale delay-2 rounded-[3rem] p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)]">
          <div class="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-black shadow-inner border border-white/5 group">
            <iframe 
              class="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YsSth8kints?autoplay=0&rel=0&showinfo=0" 
              title="Sastra Jendra Hayuningrat Pangruwating Diyu" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- KABAR TERBARU -->
    <section class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-2xl">
            <h2 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 border border-indigo-200 bg-indigo-50/50 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full">Berita & Informasi</h2>
            <h3 class="text-3xl sm:text-5xl font-extrabold text-slate-800">Kegiatan Terkini Kami</h3>
          </div>
          <NuxtLink to="/berita" class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200 text-slate-800 font-bold shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group whitespace-nowrap">
            Lihat Semua Berita
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </NuxtLink>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <article v-for="(article, idx) in latestArticles" :key="article._id" :class="['reveal', `delay-${idx+1}`]" class="group flex flex-col bg-white/50 backdrop-blur-xl border border-white/80 rounded-[2.5rem] overflow-hidden shadow-lg shadow-indigo-100/40 hover:shadow-2xl hover:shadow-indigo-200/60 hover:-translate-y-2 transition-all duration-300">
            <div class="h-56 bg-gradient-to-br from-slate-100 via-white to-indigo-50 relative overflow-hidden flex items-center justify-center">
              <div class="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-1/2 justify-center w-full flex opacity-10 group-hover:opacity-20 transition-opacity duration-300 scale-150 text-indigo-900 pointer-events-none text-9xl font-bold tracking-tighter">
                {{ article.category.substring(0,2) }}
              </div>
              <span class="text-indigo-400 font-bold tracking-widest uppercase text-sm mix-blend-multiply opacity-50 relative z-10">{{ article.category }}</span>
            </div>
            <div class="p-8 flex-1 flex flex-col">
              <div class="flex items-center justify-between mb-4">
                <span class="px-4 py-1.5 bg-indigo-100/80 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-200/50">
                  {{ article.category }}
                </span>
                <span class="text-xs text-slate-500 font-bold">{{ formatDate(article.createdAt) }}</span>
              </div>
              <h4 class="text-xl font-bold text-slate-800 mb-4 leading-snug group-hover:text-indigo-600 transition-colors">
                {{ article.title }}
              </h4>
              <p class="text-slate-600 mb-8 line-clamp-3 text-sm flex-1 leading-relaxed font-medium">
                {{ article.excerpt }}
              </p>
              <NuxtLink
                :to="`/berita/${article.slug}`"
                class="inline-flex w-max items-center justify-center gap-2 rounded-2xl bg-indigo-50/50 text-indigo-600 text-sm font-bold px-6 py-3 hover:bg-indigo-100 transition-colors w-full border border-indigo-100"
              >
                Baca Artikel
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- HUGE CALL TO ACTION -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
      <div class="reveal-scale relative rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-12 sm:p-20 text-center overflow-hidden shadow-2xl shadow-indigo-500/30">
        <!-- Abstract Shapes -->
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div class="absolute -top-32 -right-32 w-[600px] h-[600px] border-[60px] border-white/10 rounded-full pointer-events-none blur-sm"></div>
        <div class="absolute -bottom-32 -left-32 w-[500px] h-[500px] border-[40px] border-white/10 rounded-full pointer-events-none blur-sm"></div>
        
        <div class="relative z-10 max-w-3xl mx-auto">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-8 shadow-inner shadow-white/50 animate-bounce">
            <span class="text-4xl text-white">✨</span>
          </div>
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">Siap Mengukir Sejarah Budaya Bersama?</h2>
          <p class="text-indigo-100 text-lg sm:text-xl leading-relaxed mb-12 font-medium">
            Jadilah bagian dari gerakan apresiasi dan konservasi Sastra Jendro. Ruang kreasi, pengetahuan, kerabat baru, serta sarana koperasi telah menanti Anda.
          </p>
          <div class="flex flex-col sm:flex-row gap-5 justify-center">
            <NuxtLink to="/register" class="rounded-full bg-white px-10 py-5 font-bold text-indigo-600 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all text-lg">
              Registrasi Sekarang
            </NuxtLink>
            <NuxtLink to="/kontak" class="rounded-full bg-indigo-900/30 backdrop-blur-xl border border-white/20 px-10 py-5 font-bold text-white shadow-xl hover:bg-indigo-900/50 hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2">
              Hubungi Pengurus
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'

useReveal()

useHead({
  title: 'Beranda - Sastro Jendro'
})

// Dynamic data from centralized store — synced with admin dashboard
const { latestArticles, stats, formatDate } = useAppData()
</script>
