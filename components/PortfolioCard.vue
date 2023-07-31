<script setup lang="ts">
import { StackEntry } from '../assets/projects';

type PortfolioCardProps = {
  name: string;
  thesis: string;
  description?: string;
  image: string;
  stack?: StackEntry[];
  slug: string;
}
const props = defineProps<PortfolioCardProps>();
</script>


<template>
  <nuxt-link :to="`/portfolio/${slug}`" class="hover:scale-105 bg-myLightGray rounded-b-md">
    <div class="w-full">
      <nuxt-img :src="image" class="aspect-square object-cover" />
    </div>
    <div class="my-6 divide-y-2 divide-myPeach px-3">
      <h4 class="font-amaranth font-bold text-2xl text-myWhite text-center">{{ name }}</h4>
      
      <p class="font-roboto text-myWhite font-light text-justify">{{ thesis }}</p>
    </div>
  </nuxt-link>
</template>