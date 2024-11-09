<script setup lang="ts">
import { ParsedBlog } from '../../components/BlogSection.vue';

const { data } = await useAsyncData('blogs', () => queryContent<ParsedBlog>('blog').find());
const blogs = data.value;
</script>


<template>
  <section class="bg-myDarkGray w-full overflow-hidden py-16">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="px-3 sm:px-0">
        <h2 class="font-amaranth font-bold text-myPeach sm:text-5xl text-3xl">My Blogs</h2>
        <p class="font-roboto text-myWhite sm:text-2xl text-lg">Here are a few of my recent blog posts</p>
      </div>
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-8">
        <blog-card v-for="blog in blogs" :key="blog._id" :blog="blog"></blog-card>
      </div>
      <div class="mx-auto">
        <ui-my-hollow-link-button destination="https://stradoxcodes.hashnode.dev/" :is-external="true" label-text="See More">
          <Icon name="mdi:arrow-right" size="24px" />
        </ui-my-hollow-link-button>
      </div>
    </div>

  </section>
</template>