<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'id'
  },
  title: 'Sastro Jendro Hayuningrat Pangruwating',
  meta: [
    {
      name: 'description',
      content: 'Website resmi Sastro Jendro Hayuningrat Pangruwating - Organisasi pelestarian budaya Jawa tradisional'
    },
    {
      property: 'og:title',
      content: 'Sastro Jendro Hayuningrat Pangruwating'
    },
    {
      property: 'og:description',
      content: 'Organisasi pelestarian budaya Jawa tradisional'
    }
  ]
})
</script>

<style>
/* ===== PAGE TRANSITION ===== */
.liquid-page-enter-active {
  transition: all 0.6s ease-out;
}
.liquid-page-leave-active {
  transition: all 0.4s ease-in;
}
.liquid-page-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  filter: blur(6px);
}
.liquid-page-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.02);
  filter: blur(6px);
}
</style>
