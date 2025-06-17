import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/useUserStore'
import { useMutation, useQuery, useApolloClient, provideApolloClient  } from '@vue/apollo-composable'
import { GetUserProfileDocument, LoginDocument, RegisterDocument, type GetUserProfileQuery, type LoginMutation, type RegisterMutation } from '~/graphql/generated/graphql'


export const useAuth = () => {
  const userStore = useUserStore()
  const client = useApolloClient().client

  provideApolloClient(client)
  const { mutate: loginMutation } = useMutation<LoginMutation>(LoginDocument)
  const { mutate: registerMutation } = useMutation<RegisterMutation>(RegisterDocument)

  // Register user
  const register = async (userData: {
    full_name: string
    email: string
    password: string
    username: string
  }) => {
    try {
      const result = await registerMutation({
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        username: userData.username,
      })

      if (!result?.data) {
        throw new Error('Registration failed')
      }

      const response = result.data.register
      userStore.login({
        token: response?.token || '',
        userID: response?.user.id || '',
        username: response?.user.username || '',
        email: response?.user.email || '',
        fullName: response?.user.full_name || '',
      })

      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // Login user
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await loginMutation({
        email: credentials.email,
        password: credentials.password
      })
      console.log(result)

      if (!result?.data) {
        throw new Error('Login failed')
      }

      const response = result.data.login
      userStore.login({
        token: response?.token || '',
        userID: response?.user.id || '',
        username: response?.user.username || '',
        email: response?.user.email || '',
        fullName: response?.user.full_name || '',
      })

      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Logout user
  const logout = () => {
    userStore.logout()
  }

  // Get user profile
  const { result: userProfile, loading: loadingProfile } = useQuery<GetUserProfileQuery>(GetUserProfileDocument)

  return {
    user: computed(() => userStore.user),
    isAuthenticated: computed(() => userStore.isAuthenticated),
    userProfile,
    loadingProfile,
    register,
    login,
    logout,
  }
} 