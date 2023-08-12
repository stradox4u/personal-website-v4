<script setup lang="ts">
import { ParsedBlog } from '../../components/BlogSection.vue';

const { data } = await useAsyncData('blogs', () => queryContent<ParsedBlog>('blog').find());
const blogs = data.value;

const goToBlog = () => {
  return navigateTo('https://stradoxcodes.hashnode.dev/', { external: true });
}
</script>


<template>
  <section class="bg-myDarkGray w-full overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-8">
        <blog-card v-for="blog in blogs" :key="blog._id" :blog="blog"></blog-card>
      </div>
      <div class="mx-auto">
        <ui-my-hollow-button :handle-click="goToBlog">
          <span>See More</span>
          <template #icon>
            <Icon name="mdi:arrow-right" size="24px" />
          </template>
        </ui-my-hollow-button>
      </div>
    </div>

  </section>
</template>