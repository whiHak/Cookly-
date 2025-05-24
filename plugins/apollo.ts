import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:8080/v1/graphql",
  })

  const authLink = setContext((_, { headers }) => {
    let token = ''
  
    if (process.client) {
      token = localStorage.getItem('token') || ''
    }
  
    return {
      headers: {
        ...headers,
        'x-hasura-role': 'anonymous', // Always send anonymous role
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ Only add if token exists
      },
    }
  })
  

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
