const C='hitrock-v1.35';
const CORE=['./','./index.html','./songs.json','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/songs.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{caches.open(C).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match(e.request)))}else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
