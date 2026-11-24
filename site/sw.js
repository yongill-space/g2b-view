self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.mode !== "navigate" || request.method !== "GET" || !request.url.startsWith(self.registration.scope)) return;
  event.respondWith(fetch(request, {cache: "no-cache"}).catch(() => new Response(
    '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>입찰 보기</title><main><h1>인터넷 연결을 확인해 주세요</h1><p>연결되면 최신 입찰 정보를 다시 열 수 있습니다.</p><a href="./">다시 열기</a></main></html>',
    {status: 503, headers: {"Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store"}}
  )));
});
