<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

export interface Blog {
  description: string;
  date: string;
  image: string;
}

export interface ParsedBlog extends Blog, ParsedContent {}

const { data, error } = await useAsyncData('blogs', () => queryContent<ParsedBlog>('blog').find());;

const blogs = data.value?.slice(0, 2);

const goToBlog = () => {
  return navigateTo('https://stradoxcodes.hashnode.dev/', { external: true });
}
</script>


<template>
  <section class="bg-myDarkGray w-full overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <ui-section-title dark-title="Blogs" light-title="My Blog"></ui-section-title>
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-8">
        <blog-card v-for="blog in blogs" :key="blog._id" :blog="blog"></blog-card>
      </div>
      <div class="mx-auto">
        <ui-my-hollow-button :handle-click="goToBlog">
          <span>All Blogs</span>
          <template #icon>
            <Icon name="mdi:arrow-right" size="24px" />
          </template>
        </ui-my-hollow-button>
      </div>
    </div>

  </section>
</template>