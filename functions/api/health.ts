export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      status: 'ok',
      platform: 'cloudflare-pages',
      timestamp: new Date().toISOString()
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
}
