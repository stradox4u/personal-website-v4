<script setup lang="ts">
import type { Blog } from './BlogSection.vue';

const props = defineProps<{
  blog: Blog;
}>();
</script>


<template>
  <nuxt-link :to="blog.url" :external="true" class="hover:scale-105">
    <div class="w-full">
      <nuxt-img :src="blog.image" class="aspect-[16/9] object-cover" sizes="sm:480px md:720px" format="webp"
        :alt="`${blog.title}-image`" />
    </div>
    <div class="my-6 py-3 sm:px-0 px-3">
      <h4 class="font-amaranth font-bold text-2xl text-myWhite text-left mb-3">{{ blog.title }}</h4>
      <p class="font-roboto text-myWhite font-light text-justify">{{ blog.description }}</p>
    </div>
  </nuxt-link>
</template>