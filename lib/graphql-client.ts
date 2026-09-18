import { GraphQLClient } from 'graphql-request';

// Real backend, used only by the server-side proxy in app/api/graphql/route.ts
export const GRAPHQL_ENDPOINT = 'https://backend-practice.codebootcamp.co.kr/graphql';

// What browser code should call — proxied through our own API route
export const API_GRAPHQL_ENDPOINT = '/api/graphql';

export const graphqlClient = new GraphQLClient(API_GRAPHQL_ENDPOINT);
