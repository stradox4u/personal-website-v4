<script setup lang="ts">
import { projects } from '@/assets/projects';
</script>


<template>
  <main>
    <section class="bg-myDarkGray">
      <div class="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-6">
        <div v-for="project in projects" :key="project.slug" class="justify-self-center hover:scale-105">
          <ui-my-slot-link :to="`/portfolio/${project.slug}`" class="block">
            <div class="">
              <nuxt-img :src="project.image" class="object-cover aspect-square h-28" />
              <h3 class="text-center font-amaranth font-semibold text-base my-4 text-myWhite">{{ project.name }}</h3>
            </div>
          </ui-my-slot-link>
        </div>
      </div>
    </section>
    <nuxt-page></nuxt-page>
  </main>
</template>