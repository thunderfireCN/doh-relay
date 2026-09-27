export default {
  async fetch(request) {
    const url = new URL(request.url);
    const upstream = "https://dns.google" + url.pathname + url.search;

    const reqHeaders = new Headers(request.headers);
    reqHeaders.delete("host");

    const init = {
      method: request.method,
      headers: reqHeaders,
    };

    if (request.method === "POST") {
      init.body = request.body;
      init.duplex = "half";
    }

    const resp = await fetch(upstream, init);

    // 关键修复：不透传原始响应头，只保留必要的
    const respHeaders = new Headers();
    respHeaders.set("content-type", resp.headers.get("content-type") || "application/dns-message");

    return new Response(resp.body, {
      status: resp.status,
      headers: respHeaders,
    });
  }
}
