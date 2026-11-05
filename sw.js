const CACHE="caderno-oab-2026.11.04-1227";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("message",e=>{if(e.data==="skip")self.skipWaiting()});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  if(req.mode==="navigate"){e.respondWith(caches.match("index.html").then(r=>r||fetch(req)));return}
  e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});
