import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/useUserStore'

interface User {
  id: string
  username: string
  email: string
  full_name: string
}

interface AuthResponse {
  token: string
  user_id: string
  username: string
  email: string
  full_name: string
}

export const useAuth = () => {
  const userStore = useUserStore()

  // Register user
  const register = async (userData: {
    full_name: string
    email: string
    password: string
    username: string
  }) => {
    console.log('Registering user:', userData)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data: AuthResponse = await response.json()
      userStore.login({
        token: data.token,
        userID: data.user_id,
        username: data.username,
        email: data.email,
        fullName: data.full_name
      })
      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // Login user
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data: AuthResponse = await response.json()
      userStore.login({
        token: data.token,
        userID: data.user_id,
        username: data.username,
        email: data.email,
        fullName: data.full_name
      })
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Logout user
  const logout = () => {
    userStore.logout()
  }

  return {
    user: computed(() => userStore.user),
    isAuthenticated: computed(() => userStore.isAuthenticated),
    register,
    login,
    logout,
  }
} 