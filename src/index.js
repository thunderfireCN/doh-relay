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
      // 完整读出请求体,而不是当作流转发
      init.body = await request.arrayBuffer();
    }

    const resp = await fetch(upstream, init);

    // 同样完整读出响应体
    const respBody = await resp.arrayBuffer();

    const respHeaders = new Headers();
    respHeaders.set("content-type", resp.headers.get("content-type") || "application/dns-message");

    return new Response(respBody, {
      status: resp.status,
      headers: respHeaders,
    });
  }
}
