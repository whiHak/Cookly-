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
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
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
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
              Sending instructions...
            </span>
            <span v-else>Send instructions</span>
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
import { ref } from 'vue'

// State
const email = ref('')
const isLoading = ref(false)

// Methods
const handleSubmit = async () => {
  if (!email.value) return

  isLoading.value = true
  try {
    // TODO: Implement password reset functionality
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Show success message and redirect
    navigateTo('/auth/reset-password')
  } catch (error) {
    // Show error message
    console.error('Password reset failed:', error)
  } finally {
    isLoading.value = false
  }
}

// Page meta
useHead({
  title: 'Forgot password',
  meta: [
    {
      name: 'description',
      content: 'Reset your Food Recipe account password.'
    }
  ]
})
</script> 