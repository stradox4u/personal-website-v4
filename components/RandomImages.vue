<script setup lang="ts">
import { randomImages } from '../assets/randomImages';
</script>

<template>
  <ul class="list-none mx-8 grid sm:grid-cols-3 grid-cols-1 gap-4">
    <li v-for="image in randomImages" :key="image.id" class="flex flex-col gap-2 items-center">
      <nuxt-img :src="image['src-attribute']" class="object-cover aspect-square" sizes="sm:480px md:720px" format="webp"
      :alt="image['alt-text']" provider="imgix"/>
      <p class="font-roboto text-sm text-myMidGray">{{ image.description }}</p>
    </li>
  </ul>
</template>