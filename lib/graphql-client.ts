import { GraphQLClient } from 'graphql-request';

export const GRAPHQL_ENDPOINT = 'https://backend-practice.codebootcamp.co.kr/graphql';

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
