---
title: Nuxt 3 Universal Rendering VS Docker Networking
description: Resolving addresses of fellow containers in a docker bridge network from Nuxt 3 SSR server
image: '/nuxt-vs-docker.webp'
date: '2023-07-15'
head:
  meta:
    - name: 'keywords'
      content: 'nuxt 3, docker, networking, server-side rendering, ssr, nitro, node js, node workers'
    - name: 'author'
      content: 'Umar Adejoh'
    - name: 'copyright'
      content: '© 2023 Umar Adejoh'
---

# Nuxt 3 Universal Rendering VS Docker Networking

![Nuxt 3 Universal Rendering jousting vs Docker networking](/nuxt-vs-docker.webp)

Nuxt 3 with its default settings, creates a node server that is making use of [Node JS worker threads](https://nodejs.org/api/worker_threads.html), and this server is built using [Nitro](https://nitro.unjs.io/). This server is what handles all of the server-side stuff, whether it be the server-side rendering of some pages/routes or the handling of the full-fledged server routes.

I was recently working on a personal project where I wanted to throw my API (Laravel) and a Nuxt 3 application (frontend) together in a single `docker-compose.yml` file for a better development experience.

I kept the default Nuxt `universal rendering` setup, which renders the first route you visit on the server, and then loads the Javascript, allowing the application to function as an SPA once it is loaded.

At first, my `docker-compose.yml` contained no networking, as I opted into using the default network. This, however, broke my SSR as fetch requests during SSR were all failing. A quick bandaid solution was to specify the `network_mode` property of the client application service to `host`. This solved the problem, but I thought it was an inelegant solution as it wouldn't work in Windows and Mac (this network driver mode is unavailable in Windows and Mac). If I wanted to ever have anyone run my development environment, I would have to do better.

This is what my original `docker-compose.yml` looked like:

```yaml
version: '3.7'
  services:
    server:
      ...
    database:
      ...
    client:
      build:
        context: ...
        target: dev
      container_name: ...
      volumes: ...
      ports: ...
      tty: true
      network_mode: host
      command: npm run dev
```

To fix this, the solution I settled upon was creating a user-defined bridge network and placing all the services on that network. This would allow all the services to be able to reach each other, and even resolve their addresses using their service/container names. This worked fine, but the issue of broken requests during SSR returned.

The source of this issue is that when making a request to the server, I had set up `http://localhost:8000` as my base URL for the server but while the client side was able to resolve this to the correct address, during SSR the resolution didn't work and so the server (API) was unreachable during SSR. Here's what the final `docker-compose.yml` looked like:

```yaml
version: '3.7'
  networks:
    articulus:
      driver: bridge
  services:
    server:
      ...
      networks:
        - articulus
    database:
      ...
      networks:
        - articulus
    client:
      build:
        context: ...
        target: dev
      container_name: ...
      volumes: ...
      ports: ...
      tty: true
      networks:
        - articulus
      command: npm run dev
```

The solution to this was to explicitly change the base URL for server requests depending on if the request was being made from the client side, or during SSR. During SSR, I set the URL of the server (API) to the name of the server container, like so:

```javascript
let baseURL = http://localhost:8000;
if(process.server) {
    baseURL = http://server;
}
// Proceed to make the server (API) request
```

This allowed the Nitro server to properly resolve the address of my server (API), and everything worked correctly. This solution also allowed the development environment to be built and run successfully regardless of the host operating system.

For my particular use case, I would be deploying the server (API) and the client (Nuxt) to different cloud providers and so don't envisage having the same problem in production.