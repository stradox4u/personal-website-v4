---
title: Dockerizing Laravel Sail and Nuxt 3
description: A guide to dockerizing Laravel Sail and Nuxt for a better dev experience using docker compose.
image: '/sail.webp'
date: '2023-07-13'
head:
  meta:
    - name: 'keywords'
      content: 'nuxt 3, docker compose, laravel, laravel sail, server-side rendering, postgresql, api'
    - name: 'author'
      content: 'Umar Adejoh'
    - name: 'copyright'
      content: '© 2023 Umar Adejoh'
---

# Dockerizing a Laravel 10 API and Nuxt 3 Frontend

Laravel comes with a pretty handy way to use docker during development, it is called Laravel Sail and is a great implementation managed by the Laravel team itself. In fact, there's a `LABEL` option in the `Dockerfile` that names the maintainer as none other than Taylor Otwell himself.
<br><br>
This implementation works great if you're using Laravel by itself, and I would perhaps only advise that you add an alias for `./vendor/bin/sail`, to make all those sail commands easier to type for yourself.
<br><br>
Where I ran into headwinds was when I decided that for a better dev experience on a project I was working on with a Laravel API and a Nuxt frontend, I was going to run them both from one `docker-compose.yml` file, in a common parent folder. My folder structure looks something like this:
<br><br>

- Parent App Folder
  - Client App
  - Server App
  - docker-compose.yml

<br><br>
Here's a walkthrough of how I got this working and how you could too.

## Client App

To get this setup working, we first have to dockerize the `Client App`. This is the `Dockerfile` setup we end up with for the client:

```dockerfile
FROM node:18 as dev

WORKDIR /client
ENV PATH ./node_modules/.bin/:$PATH

COPY package*.json ./
RUN npm ci
COPY . ./

EXPOSE 3000
EXPOSE 24678

CMD ["npm", "run", "dev"]
```

There were a few gotchas here though. Firstly, using the regular `WORKDIR` of `/app` breaks Nuxt, as there are some issues around that name being used by a few of the internal workings of Nuxt. We need to choose a different value. This is discussed in further detail here: [Github Gist](https://github.com/nuxt/nuxt/issues/20446);

Secondly, Nuxt polls on port 24678 for updates in dev mode, so we must expose this port. With these, the client is now able to run in a container. Next, we update our `docker-compose.yml` with a client service as shown below:

```yaml
  build: 
    context: <path to client app>
    target: dev
  container_name: <client app container name>
  volumes:
    - <path to client app>:/client/
  ports:
    - 3000:3000
    - 24678:24678
  tty: true
  network_mode: host
  command: npm run dev
```

Another gotcha here, if we have any server-side rendering that requires the forwarding of headers from the client side, this is broken without using host networking. We thus need to set our `network_mode` to `host`.

With the client out of the way, let us set up the server next.

## Server App

For the server side of this application, we have a Laravel API and a PostgreSQL database. Since we're using Laravel Sail, we have a `docker-compose.yml` file at the root of the `Server App` directory.

Laravel Sail references quite a few `.env` variables, and so requires the `.env` file to be on the same folder level as the `docker-compose.yml`, or it would get ignored. To eat our cake and still have it, we can create a symlink from the original `Server App/.env` to the `Parent App Folder/.env` to have our `.env` live in two places at once. I believe this is better than moving the file, as it saves us the hassle of having to reconfigure all our `configs` to point to an `.env` file at a different location.

The next step would be to create two (2) new variables in the `.env`, called `WWWUSER` and `WWWGROUP`.These should point to your user id and your user group id respectively. For me, these were both equal to `1000`.

Finally, we can carefully go through the default Laravel Sail `docker-compose`, and copy it over into our new `docker-compose.yml`, being careful to change the relative paths as required. For my use case, we have two server-side services, the `server` and the `pgsql` (database). This is what the `docker-compose.yml` looks like afterward:

```yaml
server:
  build:
    context: <path to Server App>/vendor/laravel/sail/runtimes/8.2
    dockerfile: Dockerfile
    args:
      WWWGROUP: '${WWWGROUP}'
  image: sail-8.2/app
  extra_hosts:
    - 'host.docker.internal:host-gateway'
  ports:
    - '${APP_PORT}:80'
    - '${VITE_PORT:-5173}:${VITE_PORT:-5173}'
  env_file: .env
  environment:
    WWWUSER: '${WWWUSER}'
    LARAVEL_SAIL: 1
    XDEBUG_MODE: '${SAIL_XDEBUG_MODE:-off}'
    XDEBUG_CONFIG: '${SAIL_XDEBUG_CONFIG:-client_host=host.docker.internal}'
    IGNITION_LOCAL_SITES_PATH: '${PWD}'
  volumes:
    - '<path to Server App>:/var/www/html'
  depends_on:
    - pgsql

pgsql:
  image: 'postgres:15'
  ports:
    - 5432:5432
  env_file: .env
  environment:
    PGPASSWORD: '${DB_PASSWORD}'
    POSTGRES_DB: '${DB_DATABASE}'
    POSTGRES_USER: '${DB_USERNAME}'
    POSTGRES_PASSWORD: '${DB_PASSWORD}'
  volumes:
    - 'sail-pgsql:/var/lib/postgresql/data'
    - '<path to Server App>/vendor/laravel/sail/database/pgsql/create-testing-database.sql:/docker-entrypoint-initdb.d/10-create-testing-database.sql'
  healthcheck:
    test:
      - CMD
      - pg_isready
      - '-q'
      - '-d'
      - '${DB_DATABASE}'
      - '-U'
      - '${DB_USERNAME}'
    retries: 3
    timeout: 5s
```

Not any gotchas here particularly, as it should just work. To recap, the full `docker-compose.yml` should now look something like this:

```yaml
version: '3.7'

services:
  server:
    build:
      context: <path to Server App>/vendor/laravel/sail/runtimes/8.2
      dockerfile: Dockerfile
      args:
        WWWGROUP: '${WWWGROUP}'
    image: sail-8.2/app
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    ports:
      - '${APP_PORT}:80'
      - '${VITE_PORT:-5173}:${VITE_PORT:-5173}'
    env_file: .env
    environment:
      WWWUSER: '${WWWUSER}'
      LARAVEL_SAIL: 1
      XDEBUG_MODE: '${SAIL_XDEBUG_MODE:-off}'
      XDEBUG_CONFIG: '${SAIL_XDEBUG_CONFIG:-client_host=host.docker.internal}'
      IGNITION_LOCAL_SITES_PATH: '${PWD}'
    volumes:
      - '<path to Server App>:/var/www/html'
    depends_on:
      - pgsql
  
  pgsql:
    image: 'postgres:15'
    ports:
      - 5432:5432
    env_file: .env
    environment:
      PGPASSWORD: '${DB_PASSWORD}'
      POSTGRES_DB: '${DB_DATABASE}'
      POSTGRES_USER: '${DB_USERNAME}'
      POSTGRES_PASSWORD: '${DB_PASSWORD}'
    volumes:
      - 'sail-pgsql:/var/lib/postgresql/data'
      - '<path to Server App>/vendor/laravel/sail/database/pgsql/create-testing-database.sql:/docker-entrypoint-initdb.d/10-create-testing-database.sql'
    healthcheck:
      test:
        - CMD
        - pg_isready
        - '-q'
        - '-d'
        - '${DB_DATABASE}'
        - '-U'
        - '${DB_USERNAME}'
      retries: 3
      timeout: 5s
    
    client:
      build: 
        context: <path to client app>
        target: dev
      container_name: <client app container name>
      volumes:
        - <path to client app>:/client/
      ports:
        - 3000:3000
        - 24678:24678
      tty: true
      network_mode: host
      command: npm run dev
```

At this point, you should be able to start your entire application and have your server and client running in the same terminal using the following commands:

```bash
$: docker compose build
$: docker compose up
```