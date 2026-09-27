export default {
  async fetch(request) {
    const url = new URL(request.url);
    const upstream = "https://dns.google" + url.pathname + url.search;
    const resp = await fetch(upstream, {
      method: request.method,
      headers: request.headers,
      body: request.method === "POST" ? request.body : undefined,
    });
    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });
  }
}
