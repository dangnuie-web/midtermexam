export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(
    '/api/graphql',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  return response;
}