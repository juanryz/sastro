<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">SJ</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Member Login</h1>
          <p class="text-gray-600 mt-2">Sastro Jendro Hayuningrat Pangruwating</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="space-y-6">
          <!-- Email/Username -->
          <div>
            <label for="username" class="block text-gray-700 font-semibold mb-2">
              Email atau Username
            </label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              required
              autofocus
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Email atau username"
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
          <div v-if="error" class="p-4 bg-red-100 text-red-800 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {{ isLoading ? 'Sedang login...' : 'Login' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Atau</span>
            </div>
          </div>

          <!-- Links -->
          <div class="space-y-3">
            <NuxtLink
              to="/"
              class="block text-center px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition font-semibold"
            >
              Kembali ke Beranda
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="block text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Belum punya akun? Daftar
            </NuxtLink>
          </div>
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
  username: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  isLoading.value = true

  try {
    // const response = await $fetch('/api/auth/member-login', {
    //   method: 'POST',
    //   body: credentials.value
    // })

    // Mock login
    if (credentials.value.username && credentials.value.password) {
      navigateTo('/member/profile')
    } else {
      error.value = 'Username/email dan password harus diisi'
    }
  } catch (e) {
    error.value = 'Username/email atau password salah'
  } finally {
    isLoading.value = false
  }
}
</script>
