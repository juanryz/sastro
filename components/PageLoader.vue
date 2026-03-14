<template>
  <Transition name="loader-fade">
    <div v-if="loading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <!-- Ambient glow -->
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-300/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div class="text-center relative z-10">
        <!-- Logo with pulse -->
        <div class="mb-8 flex items-center justify-center">
          <div class="h-20 w-auto animate-logo-breathe">
            <img src="/logo.png" alt="Sastro Jendro" class="h-full w-auto object-contain drop-shadow-lg" />
          </div>
        </div>
        
        <!-- Brand text -->
        <h2 class="text-xl font-extrabold text-slate-700 tracking-tight mb-2 animate-fade-up">
          Sastra Jendra Hayuningrat
        </h2>
        <p class="text-sm text-slate-400 font-medium tracking-widest uppercase mb-10 animate-fade-up-delay">
          Pangruwating Diyu
        </p>
        
        <!-- Progress bar -->
        <div class="w-48 h-1 mx-auto bg-slate-200/60 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full animate-progress-bar"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1400)
})
</script>

<style scoped>
/* Loader fade out */
.loader-fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.loader-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Logo breathing */
@keyframes logo-breathe {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.08); opacity: 1; }
}
.animate-logo-breathe {
  animation: logo-breathe 2s ease-in-out infinite;
}

/* Text fade up */
@keyframes fade-up {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 0.7s ease-out 0.2s both;
}
.animate-fade-up-delay {
  animation: fade-up 0.7s ease-out 0.5s both;
}

/* Progress bar */
@keyframes progress-bar {
  0% { width: 0%; }
  60% { width: 70%; }
  100% { width: 100%; }
}
.animate-progress-bar {
  animation: progress-bar 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>
