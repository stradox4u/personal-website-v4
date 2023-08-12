<script setup lang="ts">
import type { ParsedBlog } from './BlogSection.vue';

const props = defineProps<{
  blog: ParsedBlog;
}>();
</script>


<template>
  <nuxt-link :to="blog._path" :external="true" class="hover:scale-105">
    <div v-if="blog.image" class="w-full relative">
      <nuxt-img :src="blog.image" class="aspect-[16/9] object-cover" sizes="sm:480px md:720px" format="webp"
        :alt="`${blog.title}-image`" provider="imgix" />
      <div class="bg-myCyan absolute bottom-0 left-0 p-3 shadow-md">
        <p class="font-roboto text-myWhite text-base">{{ blog.date }}</p>
      </div>
    </div>
    <div class="my-6 py-3 sm:px-0 px-3">
      <h4 class="font-amaranth font-bold text-2xl text-myWhite text-left mb-3">{{ blog.title }}</h4>
      <p class="font-roboto text-myWhite font-light text-justify">{{ blog.description }}</p>
    </div>
  </nuxt-link>
</template>