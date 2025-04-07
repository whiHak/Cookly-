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
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    login(response: AuthResponse) {
      const user: User = {
        id: response.userID,
        username: response.username,
        email: response.email,
        fullName: response.fullName
      }
      
      // First set the token to ensure it's available for API calls
      this.setToken(response.token)
      
      // Then set the user data
      this.setUser(user)
      
      // Store user data in localStorage
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch (e) {
        console.error('Failed to store user data in localStorage:', e)
      }
    },

    logout() {
      this.setUser(null)
      this.setToken(null)
      localStorage.removeItem('user')
    },

    initializeFromStorage() {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')

        if (!token || !userStr) {
          // If either token or user data is missing, clear everything
          this.logout()
          return
        }

        const user = JSON.parse(userStr)
        if (!this.isValidUser(user)) {
          throw new Error('Invalid user data structure')
        }

        this.setToken(token)
        this.setUser(user)
      } catch (e) {
        console.error('Failed to initialize from storage:', e)
        this.logout() // Clear invalid data
      }
    },

    isValidUser(user: any): user is User {
      return (
        user &&
        typeof user === 'object' &&
        typeof user.id === 'string' &&
        typeof user.username === 'string' &&
        typeof user.email === 'string' &&
        typeof user.fullName === 'string'
      )
    }
  },
}) 