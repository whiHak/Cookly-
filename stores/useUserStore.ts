import { defineStore } from 'pinia'

interface User {
  id: string
  username: string
  email: string
  fullName: string
  avatar?: string
}

interface AuthResponse {
  token: string
  userID: string
  username: string
  email: string
  fullName: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user
    },

    setToken(token: string | null) {
      this.token = token
    },

    login(response: AuthResponse) {
      const user: User = {
        id: response.userID,
        username: response.username,
        email: response.email,
        fullName: response.fullName
      }
      this.setUser(user)
      this.setToken(response.token)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
      this.setUser(null)
      this.setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    initializeFromStorage() {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)
          if (user && typeof user === 'object' && user.id) {
            this.setToken(token)
            this.setUser(user)
          } else {
            throw new Error('Invalid user data structure')
          }
        } catch (e) {
          console.error('Failed to parse user data from localStorage')
          this.logout() // Clear invalid data
        }
      }
    },
  },
}) 