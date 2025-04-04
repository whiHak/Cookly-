import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/useUserStore'

interface User {
  id: string
  username: string
  email: string
  fullName: string
}

interface AuthResponse {
  token: string
  user: User
}

export const useAuth = () => {
  const userStore = useUserStore()

  // Register user
  const register = async (userData: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
  }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          full_name: `${userData.firstName} ${userData.lastName}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data: AuthResponse = await response.json()
      userStore.login(data)
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
        throw new Error('Login failed')
      }

      const data: AuthResponse = await response.json()
      userStore.login(data)
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