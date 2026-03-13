<template>
  <div>
    <!-- Super Admin Header -->
    <header class="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold mb-2">Super Admin Panel</h1>
            <p class="text-purple-200">Kelola semua aspek organisasi</p>
          </div>
          <button
            @click="logout"
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Super Admin Sidebar -->
      <aside class="w-64 bg-gray-900 text-white min-h-screen p-6">
        <div class="mb-8">
          <h2 class="text-lg font-bold">Super Admin</h2>
          <p class="text-purple-300 text-sm">Full System Access</p>
        </div>

        <nav class="space-y-4">
          <!-- Dashboard -->
          <NuxtLink
            to="/admin/super"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            :class="{ 'bg-purple-600': $route.path === '/admin/super' }"
          >
            📊 Dashboard
          </NuxtLink>

          <!-- User Management -->
          <div>
            <button
              @click="expandMenu = expandMenu === 'users' ? '' : 'users'"
              class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              👥 User Management {{ expandMenu === 'users' ? '▼' : '▶' }}
            </button>
            <div v-if="expandMenu === 'users'" class="ml-4 space-y-2 mt-2">
              <NuxtLink
                to="/admin/super/admin-users"
                class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
              >
                Admin Users
              </NuxtLink>
              <NuxtLink
                to="/admin/super/members"
                class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
              >
                Member Verification
              </NuxtLink>
            </div>
          </div>

          <!-- Content Management -->
          <NuxtLink
            to="/admin/super/content"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            :class="{ 'bg-purple-600': $route.path.includes('/super/content') }"
          >
            📝 Content Management
          </NuxtLink>

          <!-- Organization -->
          <NuxtLink
            to="/admin/super/organization"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            :class="{ 'bg-purple-600': $route.path.includes('/super/organization') }"
          >
            🏢 Organization Settings
          </NuxtLink>

          <!-- Analytics -->
          <NuxtLink
            to="/admin/super/analytics"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            :class="{ 'bg-purple-600': $route.path.includes('/super/analytics') }"
          >
            📊 Analytics & Reports
          </NuxtLink>

          <!-- System Settings -->
          <NuxtLink
            to="/admin/super/settings"
            class="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            :class="{ 'bg-purple-600': $route.path.includes('/super/settings') }"
          >
            ⚙️ System Settings
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Welcome Section -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Selamat datang, Admin!</h2>
          <p class="text-gray-600">Anda memiliki akses super admin ke semua fitur sistem</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Total Admin</p>
            <p class="text-4xl font-bold text-purple-600">{{ stats.totalAdmins }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Member Pending</p>
            <p class="text-4xl font-bold text-yellow-600">{{ stats.pendingMembers }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Total Member</p>
            <p class="text-4xl font-bold text-green-600">{{ stats.totalMembers }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm font-semibold mb-2">Total Konten</p>
            <p class="text-4xl font-bold text-blue-600">{{ stats.totalContent }}</p>
          </div>
        </div>

        <!-- Main Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- User Management Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">👥 Manajemen User</h3>
            <p class="text-gray-700 mb-6">
              Kelola admin dan verifikasi member baru yang mendaftar di sistem
            </p>
            <div class="space-y-2">
              <NuxtLink
                to="/admin/super/admin-users"
                class="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center font-semibold"
              >
                Kelola Admin
              </NuxtLink>
              <NuxtLink
                to="/admin/super/members"
                class="block w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-center font-semibold"
              >
                Verifikasi Member
              </NuxtLink>
            </div>
          </div>

          <!-- Content Management Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">📝 Manajemen Konten</h3>
            <p class="text-gray-700 mb-6">
              Kelola semua artikel, berita, dan konten di website organisasi
            </p>
            <div class="space-y-2">
              <NuxtLink
                to="/admin/berita"
                class="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-semibold"
              >
                Artikel & Berita
              </NuxtLink>
              <NuxtLink
                to="/admin/super/content"
                class="block w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center font-semibold"
              >
                Gallery & Media
              </NuxtLink>
            </div>
          </div>

          <!-- Organization Settings Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">🏢 Pengaturan Organisasi</h3>
            <p class="text-gray-700 mb-6">
              Kelola struktur organisasi, departemen, dan informasi umum
            </p>
            <NuxtLink
              to="/admin/super/organization"
              class="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center font-semibold"
            >
              Kelola Organisasi
            </NuxtLink>
          </div>

          <!-- System Settings Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">⚙️ Pengaturan Sistem</h3>
            <p class="text-gray-700 mb-6">
              Konfigurasi email, keamanan, dan pengaturan teknis lainnya
            </p>
            <NuxtLink
              to="/admin/super/settings"
              class="block w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-center font-semibold"
            >
              Pengaturan Teknis
            </NuxtLink>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="mt-8 bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-6">📋 Aktivitas Terbaru</h3>

          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-lg">{{ activity.icon }}</span>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-600">{{ activity.description }}</p>
              </div>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'superadmin'
})

const expandMenu = ref('')

const stats = ref({
  totalAdmins: 3,
  pendingMembers: 7,
  totalMembers: 145,
  totalContent: 32
})

const recentActivities = [
  {
    id: 1,
    icon: '✅',
    title: 'Member Verified',
    description: 'Budi Santoso telah diverifikasi sebagai member',
    time: '2 jam lalu'
  },
  {
    id: 2,
    icon: '📝',
    title: 'Article Published',
    description: 'Admin Siti mempublikasikan artikel baru',
    time: '5 jam lalu'
  },
  {
    id: 3,
    icon: '👤',
    title: 'New Member Registered',
    description: 'Ahmad Wijaya mendaftar sebagai member',
    time: '1 hari lalu'
  }
]

const logout = async () => {
  // await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>
