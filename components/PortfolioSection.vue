<script setup lang="ts">
import { projects } from '../assets/projects';
</script>


<template>
  <section class="bg-myDarkGray w-full">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <ui-section-title dark-title="Portfolio" light-title="My Portfolio"></ui-section-title>
      <div class="grid grid-cols-3 gap-8">
        <portfolio-card v-for="project in projects" :key="project.slug"
          :image="project.image" :name="project.name" :thesis="project.thesis" :slug="project.slug"></portfolio-card>
      </div>
    </div>

  </section>
</template>