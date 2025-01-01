<script setup lang="ts">
import { randomImages } from '../assets/randomImages';
</script>

<template>
  <section class="bg-myDarkGray w-full overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <ui-section-title dark-title="Photos" light-title="Photo Splash"></ui-section-title>

      <ul class="list-none mx-8 grid sm:grid-cols-3 grid-cols-1 gap-4">
        <li v-for="image in randomImages" :key="image.id" class="flex flex-col gap-2 items-center">
          <div class="aspect-w-1 aspect-h-1 overflow-hidden w-full h-full">
            <nuxt-img :src="image['src-attribute']" class="object-none" sizes="sm:240px md:480px" format="webp"
            :alt="image['alt-text']" provider="imgix"/>
          </div>
          <p class="font-roboto text-sm text-myMidGray">{{ image.description }}</p>
        </li>
      </ul>
    </div>
    
  </section>
</template>