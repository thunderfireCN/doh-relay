export default {
  async fetch(request) {
    const url = new URL(request.url);
    const upstream = "https://dns.google" + url.pathname + url.search;

    const headers = new Headers(request.headers);
    headers.delete("host");

    const init = {
      method: request.method,
      headers,
    };

    if (request.method === "POST") {
      init.body = request.body;
      init.duplex = "half";
    }

    const resp = await fetch(upstream, init);
    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });
  }
}
