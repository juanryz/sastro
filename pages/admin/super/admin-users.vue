<template>
  <div>
    <!-- Header -->
    <header class="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Admin Users Management</h1>
          <p class="text-purple-200 mt-2">Kelola admin dan akses mereka</p>
        </div>
        <button
          @click="showAddForm = true"
          class="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
        >
          ➕ Tambah Admin
        </button>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white/80 shadow-xl border border-white/60 text-white min-h-screen p-6">
        <nav class="space-y-4">
          <NuxtLink
            to="/admin/super"
            class="block px-4 py-3 rounded-xl hover:bg-slate-50 border-r border-slate-200 transition"
          >
            📊 Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/super/admin-users"
            class="block px-4 py-3 rounded-xl bg-purple-600"
          >
            👥 Admin Users
          </NuxtLink>
          <NuxtLink
            to="/admin/super/members"
            class="block px-4 py-3 rounded-xl hover:bg-slate-50 border-r border-slate-200 transition"
          >
            ✅ Member Verification
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- Add Admin Form -->
        <div v-if="showAddForm" class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Tambah Admin Baru</h2>

          <form @submit.prevent="addAdmin" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                v-model="newAdmin.name"
                type="text"
                placeholder="Nama Admin"
                required
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                v-model="newAdmin.email"
                type="email"
                placeholder="Email Admin"
                required
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                v-model="newAdmin.password"
                type="password"
                placeholder="Password"
                required
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                v-model="newAdmin.role"
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="admin">Admin Editor</option>
                <option value="moderator">Moderator</option>
                <option value="viewer">Viewer Only</option>
              </select>
            </div>

            <div class="flex gap-4">
              <button
                type="submit"
                class="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
              >
                Buat Admin
              </button>
              <button
                type="button"
                @click="showAddForm = false"
                class="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition font-semibold"
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        <!-- Admin List -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nama</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bergabung</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="admin in admins"
                :key="admin.id"
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-sm text-gray-900 font-semibold">{{ admin.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ admin.email }}</td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-white text-xs font-semibold',
                      admin.role === 'superadmin'
                        ? 'bg-purple-600'
                        : admin.role === 'admin'
                        ? 'bg-blue-600'
                        : 'bg-gray-600'
                    ]"
                  >
                    {{ admin.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-white text-xs font-semibold',
                      admin.active ? 'bg-green-600' : 'bg-red-600'
                    ]"
                  >
                    {{ admin.active ? '✓ Aktif' : '✗ Nonaktif' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(admin.joinedAt) }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <button
                    @click="editAdmin(admin)"
                    class="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    v-if="admin.role !== 'superadmin'"
                    @click="deleteAdmin(admin.id)"
                    class="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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

const showAddForm = ref(false)

const newAdmin = ref({
  name: '',
  email: '',
  password: '',
  role: 'admin'
})

const admins = ref([
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@sastrojendro.id',
    role: 'superadmin',
    active: true,
    joinedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    email: 'siti.admin@sastrojendro.id',
    role: 'admin',
    active: true,
    joinedAt: new Date('2024-02-15')
  },
  {
    id: 3,
    name: 'Ahmad Wijaya',
    email: 'ahmad.admin@sastrojendro.id',
    role: 'moderator',
    active: true,
    joinedAt: new Date('2024-02-20')
  }
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const addAdmin = () => {
  if (!newAdmin.value.name || !newAdmin.value.email || !newAdmin.value.password) {
    alert('Semua field harus diisi')
    return
  }

  admins.value.push({
    id: admins.value.length + 1,
    name: newAdmin.value.name,
    email: newAdmin.value.email,
    role: newAdmin.value.role,
    active: true,
    joinedAt: new Date()
  })

  // Reset form
  newAdmin.value = { name: '', email: '', password: '', role: 'admin' }
  showAddForm.value = false
  alert('Admin berhasil ditambahkan!')
}

const editAdmin = (admin) => {
  alert(`Edit admin: ${admin.name}`)
}

const deleteAdmin = (id) => {
  if (confirm('Hapus admin ini?')) {
    admins.value = admins.value.filter(a => a.id !== id)
    alert('Admin berhasil dihapus!')
  }
}
</script>
