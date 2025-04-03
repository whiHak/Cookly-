<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold">
          <img src="/images/logo.svg" alt="Food Recipe" class="h-8 w-auto" />
          Food Recipe
        </NuxtLink>
        <h2 class="mt-6 text-2xl font-bold">Reset your password</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Please enter your new password below.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium">New password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your new password"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium">Confirm new password</label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Confirm your new password"
              />
            </div>
          </div>

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
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
              Updating password...
            </span>
            <span v-else>Update password</span>
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/auth/login"
            class="text-sm font-medium text-primary hover:text-primary/90"
          >
            Back to sign in
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// State
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

// Methods
const handleSubmit = async () => {
  if (!password.value || !confirmPassword.value) return
  if (password.value !== confirmPassword.value) {
    // TODO: Show error message
    return
  }

  const token = route.query.token as string
  if (!token) {
    // TODO: Show error message
    return
  }

  isLoading.value = true
  try {
    // TODO: Implement password update functionality
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Show success message and redirect
    navigateTo('/auth/login')
  } catch (error) {
    // Show error message
    console.error('Password update failed:', error)
  } finally {
    isLoading.value = false
  }
}

// Validate token on mount
onMounted(async () => {
  const token = route.query.token as string
  if (!token) {
    // TODO: Show error message and redirect
    navigateTo('/auth/forgot-password')
    return
  }

  try {
    // TODO: Validate token with backend
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    // TODO: Show error message and redirect
    navigateTo('/auth/forgot-password')
  }
})

// Page meta
useHead({
  title: 'Reset password',
  meta: [
    {
      name: 'description',
      content: 'Reset your Food Recipe account password.'
    }
  ]
})
</script> 