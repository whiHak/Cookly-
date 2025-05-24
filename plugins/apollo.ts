import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'
import type { OperationDefinitionNode } from 'graphql'

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:8080/v1/graphql",
  })

  // List of public query operation names
  const PUBLIC_OPERATIONS = [
    'GetAllRecipes',
    'GetRecipeById',
    'GetUserBookmarks',
    'GetRecipeComments',
    // Add more public query operation names as needed
  ]

  function getOperationNameFromRequest(request: any): string | undefined {
    if (request.operationName) return request.operationName
    if (request.query && request.query.definitions && request.query.definitions.length > 0) {
      const def = request.query.definitions[0]
      // Only OperationDefinitionNode has .name
      if (def.kind === 'OperationDefinition' && 'name' in def && def.name) {
        return def.name.value
      }
    }
    return undefined
  }

  const authLink = setContext((request, { headers }) => {
    let token = ''
    let user = null;

    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user") || "{}");
    }
    if (process.client) {
      token = localStorage.getItem('token') || ''
    }
    // Try to get operationName from request
    const operationName = getOperationNameFromRequest(request)
    let hasuraHeaders = {}
    if (operationName && PUBLIC_OPERATIONS.includes(operationName)) {
      hasuraHeaders = {
        'x-hasura-role': 'anonymous',
      }
    } else {
      hasuraHeaders = {
        'x-hasura-role': token ? 'user' : 'anonymous',
        ...(token && user.id ? { 'X-Hasura-User-Id': user.id } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }
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
