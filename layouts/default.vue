<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">SJ</span>
            </div>
            <span class="hidden sm:inline font-bold text-lg text-gray-800">Sastro Jendro</span>
          </NuxtLink>

          <!-- Menu Items -->
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-amber-600 transition">Home</NuxtLink>
            <NuxtLink to="/berita" class="text-gray-700 hover:text-amber-600 transition">Berita</NuxtLink>
            <NuxtLink to="/struktur" class="text-gray-700 hover:text-amber-600 transition">Struktur</NuxtLink>
            <NuxtLink to="/anggota" class="text-gray-700 hover:text-amber-600 transition">Anggota</NuxtLink>
            <NuxtLink to="/kontak" class="text-gray-700 hover:text-amber-600 transition">Kontak</NuxtLink>
          </div>

          <!-- Buttons & Admin Login Button -->
          <div class="flex items-center space-x-4">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-100 transition"
              :title="darkMode ? 'Light Mode' : 'Dark Mode'"
            >
              <Icon :icon="darkMode ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'" />
            </button>

            <!-- Member Login / Profile -->
            <div v-if="!isMemberLoggedIn" class="flex items-center space-x-2">
              <NuxtLink
                to="/member/login"
                class="px-4 py-2 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition font-semibold text-sm"
              >
                Member Login
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm"
              >
                Daftar
              </NuxtLink>
            </div>
            <div v-else class="relative">
              <button
                @click="showMemberMenu = !showMemberMenu"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm"
              >
                {{ memberName }}
              </button>
              <div
                v-if="showMemberMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
              >
                <NuxtLink to="/member/profile" class="block px-4 py-2 hover:bg-gray-100">Profil</NuxtLink>
                <button
                  @click="logoutMember"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>

            <!-- Admin Login Button -->
            <NuxtLink
              to="/admin/login"
              class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold text-sm"
            >
              Admin
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow bg-gray-50">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="font-bold text-lg mb-4">Sastro Jendro</h3>
            <p class="text-gray-400">Organisasi pelestarian budaya Jawa tradisional</p>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Navigasi</h3>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/" class="hover:text-white">Home</NuxtLink></li>
              <li><NuxtLink to="/berita" class="hover:text-white">Berita</NuxtLink></li>
              <li><NuxtLink to="/struktur" class="hover:text-white">Struktur</NuxtLink></li>
              <li><NuxtLink to="/kontak" class="hover:text-white">Kontak</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Kontak</h3>
            <p class="text-gray-400">Email: info@sastrojendro.id</p>
            <p class="text-gray-400">Phone: +62 xxx xxxx xxxx</p>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-8">
          <p class="text-center text-gray-400">
            &copy; 2024 Sastro Jendro Hayuningrat Pangruwating. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const darkMode = ref(false)
const isLoggedIn = ref(false)
const userName = ref('')
const showUserMenu = ref(false)

// Member login state
const isMemberLoggedIn = ref(false)
const memberName = ref('')
const showMemberMenu = ref(false)

const toggleTheme = () => {
  darkMode.value = !darkMode.value
}

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  isLoggedIn.value = false
  showUserMenu.value = false
  navigateTo('/admin/login')
}

const logoutMember = async () => {
  // await $fetch('/api/auth/member-logout', { method: 'POST' })
  isMemberLoggedIn.value = false
  showMemberMenu.value = false
  navigateTo('/')
}

onMounted(async () => {
  // Check if admin is logged in
  try {
    const response = await $fetch('/api/auth/me')
    if (response) {
      isLoggedIn.value = true
      userName.value = response.name || 'Admin'
    }
  } catch (e) {
    // Not logged in
  }

  // Check if member is logged in
  try {
    const memberResponse = await $fetch('/api/auth/member-me')
    if (memberResponse) {
      isMemberLoggedIn.value = true
      memberName.value = memberResponse.fullName || 'Member'
    }
  } catch (e) {
    // Member not logged in
  }
})
</script>

<style scoped>
</style>
