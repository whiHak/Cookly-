import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    [process.env.NUXT_PUBLIC_HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql']:{
      headers: {
        'x-hasura-admin-secret': 'myadminsecret',
      },
    },
  },
  documents: './graphql/**/*.gql', // All your queries/mutations in one or many .gql files
  generates: {
    './graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
  config: {
    useTypeImports: true,
  },
}

export default config
