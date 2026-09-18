import { GRAPHQL_ENDPOINT } from '@/lib/graphql-client';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? 'application/json';
  const body = await request.arrayBuffer();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body,
  });

  const responseBody = await response.arrayBuffer();
  return new Response(responseBody, {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('content-type') ?? 'application/json' },
  });
}
