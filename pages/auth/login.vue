<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold">
          <img src="/images/logo.svg" alt="Food Recipe" class="h-8 w-auto" />
          Food Recipe
        </NuxtLink>
        <h2 class="mt-6 text-2xl font-bold">Welcome back</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-medium text-primary hover:text-primary/90">
            Sign up
          </NuxtLink>
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium">Email</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium">Password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="show-password"
                v-model="showPassword"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="show-password" class="ml-2 block text-sm">
                Show password
              </label>
            </div>
            <NuxtLink
              to="/auth/forgot-password"
              class="text-sm font-medium text-primary hover:text-primary/90"
            >
              Forgot password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <!-- Social Login -->
        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @click="handleGoogleLogin"
          >
            <Icon name="lucide:chrome" class="h-4 w-4" />
            Google
          </button>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @click="handleGithubLogin"
          >
            <Icon name="lucide:github" class="h-4 w-4" />
            GitHub
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

// Methods
const handleLogin = async () => {
  if (!email.value || !password.value) return

  isLoading.value = true
  try {
    // TODO: Implement login functionality
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Show success message and redirect
    navigateTo('/')
  } catch (error) {
    // Show error message
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = async () => {
  // TODO: Implement Google login
  console.log('Google login')
}

const handleGithubLogin = async () => {
  // TODO: Implement GitHub login
  console.log('GitHub login')
}

// Page meta
useHead({
  title: 'Sign in',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your Food Recipe account to share and discover amazing recipes.'
    }
  ]
})
</script> 