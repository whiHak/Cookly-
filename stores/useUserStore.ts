import { defineStore } from 'pinia'

interface User {
  id: string
  username: string
  email: string
  fullName: string
  avatar?: string
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

    login(userData: { user: User; token: string }) {
      this.setUser(userData.user)
      this.setToken(userData.token)
      localStorage.setItem('token', userData.token)
      localStorage.setItem('user', JSON.stringify(userData.user))
    },

    logout() {
      this.setUser(null)
      this.setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    initializeFromStorage() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.setToken(token)
        this.setUser(JSON.parse(user))
      }
    },
  },
}) 