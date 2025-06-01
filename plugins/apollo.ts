import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'
import type { OperationDefinitionNode } from 'graphql'

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:8080/v1/graphql",
  })

  const authLink = setContext((request, { headers }) => {
    let token = ''
    let user = null;

    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user") || "{}");
    }
    if (process.client) {
      token = localStorage.getItem('token') || ''
    }
    const hasuraHeaders = {
        'x-hasura-role': token ? 'user' : 'anonymous',
        ...(token && user.id ? { 'X-Hasura-User-Id': user.id } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
    return {
      headers: {
        ...headers,
        ...hasuraHeaders,
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
