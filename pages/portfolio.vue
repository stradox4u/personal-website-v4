<script setup lang="ts">
import { projects } from '@/assets/projects';
</script>


<template>
  <main>
    <section class="bg-myDarkGray">
      <div class="max-w-7xl mx-auto p-6 sm:grid sm:grid-cols-4 sm:gap-6 gap-3 flex sm:overflow-hidden overflow-auto">
        <div v-for="project in projects" :key="project.slug" class="justify-self-center hover:scale-105 min-w-[200px]">
          <ui-my-slot-link :to="`/portfolio/${project.slug}`" class="block">
            <div class="flex flex-col items-center">
              <nuxt-img :src="project.image" class="object-cover aspect-square h-28" sizes="sm:240px md:480px"
                format="webp" provider="imgix" />
              <h3 class="text-center font-amaranth font-semibold text-base my-4 text-myWhite">{{ project.name }}</h3>
            </div>
          </ui-my-slot-link>
        </div>
      </div>
    </section>
    <nuxt-page></nuxt-page>
  </main>
</template>