<script setup lang="ts">
export type Blog = {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: string;
  url: string;
}
const blogs: Blog[] = [
  {
    id: 1,
    title: 'Nuxt 3 Universal Rendering VS Docker Networking',
    description: 'Resolving addresses of fellow containers in a docker bridge network from Nuxt 3 SSR server',
    date: new Date('2023-07-15'),
    image: '/nuxt-vs-docker.webp',
    url: 'https://stradoxcodes.hashnode.dev/nuxt-3ur-vs-docker-networking'
  },
  {
    id: 2,
    title: 'REST API Authentication on Node JS and Express JS, Using Passport JS and JWTs',
    description: 'Using JWT tokens to authenticate a client application on a Node & Express JS REST API server',
    date: new Date('2021-10-20'),
    image: '/node-auth-cover.png',
    url: 'https://stradoxcodes.hashnode.dev/rest-api-authentication-on-node-js-and-express-js-using-passport-js-and-jwts'
  }
]
</script>


<template>
  <section class="bg-myDarkGray w-full">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <ui-section-title dark-title="Blogs" light-title="My Blog"></ui-section-title>
      <div class="grid grid-cols-2 gap-8">
        <blog-card v-for="blog in blogs" :key="blog.id" :blog="blog"></blog-card>
      </div>
      <div class="mx-auto">
        <ui-my-hollow-button>
          <span>All Blogs</span>
          <template #icon>
            <Icon name="mdi:arrow-right" size="24px" />
          </template>
        </ui-my-hollow-button>
      </div>
    </div>

  </section>
</template>