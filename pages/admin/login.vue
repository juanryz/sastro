<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">SJ</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p class="text-gray-600 mt-2">Sastro Jendro Hayuningrat Pangruwating</p>
        </div>

        <!-- Login Type Tabs -->
        <div class="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            @click="loginType = 'admin'"
            :class="[
              'flex-1 py-2 rounded transition font-semibold',
              loginType === 'admin'
                ? 'bg-amber-600 text-white'
                : 'bg-transparent text-gray-700 hover:text-gray-900'
            ]"
          >
            Admin
          </button>
          <button
            @click="loginType = 'superadmin'"
            :class="[
              'flex-1 py-2 rounded transition font-semibold',
              loginType === 'superadmin'
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-gray-700 hover:text-gray-900'
            ]"
          >
            Super Admin
          </button>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              required
              autofocus
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="admin@sastrojendro.id"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="••••••••"
            />
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="credentials.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-amber-600 focus:ring-amber-600 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              Ingat saya di perangkat ini
            </label>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="p-4 bg-red-100 text-red-800 rounded-lg text-sm"
          >
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            :class="[
              'w-full px-4 py-2 text-white rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold',
              loginType === 'admin'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-purple-600 hover:bg-purple-700'
            ]"
          >
            {{ loginType === 'admin' ? (isLoading ? 'Sedang login...' : 'Login Admin') : (isLoading ? 'Sedang login...' : 'Login Super Admin') }}
          </button>
        </form>

        <!-- OAuth Options -->
        <div class="mt-6">
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Atau</span>
            </div>
          </div>

          <!-- Google OAuth -->
          <button
            type="button"
            @click="loginWithGoogle"
            :disabled="isLoading"
            class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>🔐</span>
            Login dengan Google
          </button>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center text-sm text-gray-600">
          <p class="font-semibold mb-2">Demo Akun:</p>
          <p class="mb-1"><span class="font-semibold text-amber-600">Admin:</span> admin@demo.com / demo123</p>
          <p><span class="font-semibold text-purple-600">Super Admin:</span> superadmin@demo.com / demo123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const credentials = ref({
  email: '',
  password: '',
  rememberMe: false
})

const loginType = ref('admin')
const isLoading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  isLoading.value = true

  try {
    if (loginType.value === 'superadmin') {
      // Super Admin Login
      // const response = await $fetch('/api/auth/superadmin-login', {
      //   method: 'POST',
      //   body: credentials.value
      // })
      
      // Mock super admin login
      if (credentials.value.email && credentials.value.password) {
        // Set admin-token and admin-role cookie
        navigateTo('/admin/super')
      } else {
        error.value = 'Email dan password harus diisi'
      }
    } else {
      // Regular Admin Login
      // const response = await $fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: credentials.value
      // })
      
      // Mock admin login
      if (credentials.value.email && credentials.value.password) {
        // Set admin-token and admin-role cookie
        navigateTo('/admin')
      } else {
        error.value = 'Email dan password harus diisi'
      }
    }
  } catch (e) {
    error.value = 'Email atau password salah'
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    // Implement Google OAuth login
    // window.location.href = '/api/auth/google'
  } catch (e) {
    error.value = 'Login dengan Google gagal'
  }
}
</script>
