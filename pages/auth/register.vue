<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold">
          <img src="/images/logo.svg" alt="Food Recipe" class="h-8 w-auto" />
          Food Recipe
        </NuxtLink>
        <h2 class="mt-6 text-2xl font-bold">Create your account</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink to="/auth/login" class="font-medium text-primary hover:text-primary/90">
            Sign in
          </NuxtLink>
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium">First name</label>
              <div class="mt-1">
                <input
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  required
                  class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="John"
                />
              </div>
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium">Last name</label>
              <div class="mt-1">
                <input
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  required
                  class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          <div>
            <label for="username" class="block text-sm font-medium">Username</label>
            <div class="mt-1">
              <input
                id="username"
                v-model="username"
                type="text"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="johndoe"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium">Email</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="john@example.com"
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
                placeholder="Create a password"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium">Confirm password</label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Confirm your password"
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

          <div class="flex items-center">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label for="terms" class="ml-2 block text-sm">
              I agree to the
              <NuxtLink to="/terms" class="font-medium text-primary hover:text-primary/90">
                Terms of Service
              </NuxtLink>
              and
              <NuxtLink to="/privacy" class="font-medium text-primary hover:text-primary/90">
                Privacy Policy
              </NuxtLink>
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
              Creating account...
            </span>
            <span v-else>Create account</span>
          </button>
        </div>

        <!-- Social Sign Up -->
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
            @click="handleGoogleSignUp"
          >
            <Icon name="lucide:chrome" class="h-4 w-4" />
            Google
          </button>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @click="handleGithubSignUp"
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
import { ref, inject } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'

interface ToastRef {
  value: {
    addToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void
  } | null
}

// Router
const router = useRouter()
const route = useRoute()

// State
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const acceptTerms = ref(false)
const isLoading = ref(false)

// Get toast component instance
const toastRef = inject<ToastRef>('toast')

// Methods
const handleRegister = async () => {
  if (!firstName.value || !lastName.value || !username.value || !email.value || !password.value || !confirmPassword.value || !acceptTerms.value) {
    toastRef?.value?.addToast('error', 'Please fill in all required fields')
    return
  }
  
  if (password.value !== confirmPassword.value) {
    toastRef?.value?.addToast('error', 'Passwords do not match')
    return
  }

  isLoading.value = true
  try {
    const auth = useAuth()
    await auth.register({
      name: `${firstName.value} ${lastName.value}`,
      email: email.value,
      password: password.value,
    })
    
    toastRef?.value?.addToast('success', 'Registration successful')
    
    // Get redirect path from query or localStorage
    const redirectPath = route.query.redirect as string || localStorage.getItem('redirectPath') || '/'
    localStorage.removeItem('redirectPath') // Clear stored path
    
    // Navigate to redirect path
    router.push(redirectPath)
  } catch (error) {
    toastRef?.value?.addToast('error', 'Registration failed. Please try again.')
    console.error('Registration failed:', error)
  } finally {
    isLoading.value = false
  }
}

const handleGoogleSignUp = async () => {
  toastRef?.value?.addToast('info', 'Google sign up coming soon!')
}

const handleGithubSignUp = async () => {
  toastRef?.value?.addToast('info', 'GitHub sign up coming soon!')
}

// Page meta
useHead({
  title: 'Create account',
  meta: [
    {
      name: 'description',
      content: 'Create your Food Recipe account to share and discover amazing recipes.'
    }
  ]
})
</script> 