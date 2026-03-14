<template>
  <div>
    <!-- Admin Header -->
    <header class="bg-white shadow-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          @click="logout"
          class="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Sidebar + Content -->
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-50 border-r border-slate-200 text-white min-h-screen p-6">
        <div class="mb-8">
          <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm border border-slate-200">
            <img src="/logo.png" alt="Sastro Jendro" class="w-full h-full object-contain drop-shadow-sm p-0.5" />
          </div>
          <h2 class="text-lg font-bold">Menu</h2>
        </div>

        <nav class="space-y-4">
          <NuxtLink
            to="/admin"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            :class="{ 'bg-amber-600': $route.path === '/admin' }"
          >
            📊 Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/berita"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            :class="{ 'bg-amber-600': $route.path.includes('/admin/berita') }"
          >
            📝 Berita & Blog
          </NuxtLink>
          <NuxtLink
            to="/admin/struktur"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            :class="{ 'bg-amber-600': $route.path.includes('/admin/struktur') }"
          >
            🏢 Struktur Organisasi
          </NuxtLink>
          <NuxtLink
            to="/admin/anggota"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            :class="{ 'bg-amber-600': $route.path.includes('/admin/anggota') }"
          >
            👥 Anggota
          </NuxtLink>
          <NuxtLink
            to="/admin/profil"
            class="block px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            :class="{ 'bg-amber-600': $route.path.includes('/admin/profil') }"
          >
            ⚙️ Profil Organisasi
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Welcome -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Selamat datang!</h2>
          <p class="text-gray-600">Kelola konten dan struktur organisasi Sastro Jendro dari sini</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Total Berita</p>
            <p class="text-4xl font-bold text-amber-600">{{ stats.totalArticles }}</p>
          </div>
          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Total Anggota</p>
            <p class="text-4xl font-bold text-blue-600">{{ stats.totalMembers }}</p>
          </div>
          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Total Departemen</p>
            <p class="text-4xl font-bold text-green-600">{{ stats.totalDepartments }}</p>
          </div>
          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Pesan Kontak</p>
            <p class="text-4xl font-bold text-red-600">{{ stats.totalMessages }}</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <NuxtLink
              to="/admin/berita/baru"
              class="px-4 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition text-center font-semibold"
            >
              ➕ Tambah Berita
            </NuxtLink>
            <NuxtLink
              to="/admin/anggota/baru"
              class="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-center font-semibold"
            >
              ➕ Tambah Anggota
            </NuxtLink>
            <NuxtLink
              to="/admin/struktur"
              class="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-center font-semibold"
            >
              ✏️ Edit Struktur
            </NuxtLink>
            <NuxtLink
              to="/admin/profil"
              class="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition text-center font-semibold"
            >
              ⚙️ Pengaturan
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'admin'
})

const stats = ref({
  totalArticles: 8,
  totalMembers: 45,
  totalDepartments: 3,
  totalMessages: 5
})

const logout = async () => {
  await navigateTo('/admin/login')
}
</script>
