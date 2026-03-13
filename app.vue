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
