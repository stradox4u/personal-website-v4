<script setup lang="ts">
import { Project, projects } from '@/assets/projects';

const route = useRoute();

const project = computed(() => {
  return projects.find(project => project.slug === route.params.slug);
});

const visitProject = () => {
  return navigateTo(project.value?.url, { external: true });
}
</script>

<template>
  <section class="bg-myDarkGray w-full border-t-2 border-myPeach">
    <div class="max-w-7xl mx-auto flex sm:flex-row flex-col justify-between py-8 gap-8">
      <div class="w-full">
        <nuxt-img :src="project?.image" class="object-cover aspect-square sm:w-96 w-full" />
      </div>

      <!-- Details -->
      <div class="flex flex-col justify-between divide-y divide-myPeach sm:px-0 px-3">
        <span class="inline-flex gap-3 items-baseline">
          <h5 class="font-roboto font-semibold text-xl text-myWhite">Thesis:</h5>
          <p class="font-roboto font-light text-xl text-myWhite">{{ project?.thesis }}</p>
        </span>
        <span class="inline-flex gap-3 items-baseline pt-4">
          <h5 class="font-roboto font-semibold text-xl text-myWhite">Description:</h5>
          <p class="font-roboto font-light text-xl text-myWhite">{{ project?.description }}</p>
        </span>
        <span class="inline-flex gap-3 items-baseline pt-4">
          <h5 class="font-roboto font-semibold text-xl text-myWhite shrink-0">Tech Stack:</h5>
          <span class="inline-flex flex-wrap">
            <span v-for="(tech, index) in project?.stack" :key="tech.name" class="inline-flex items-center gap-2 px-4"
              :class="{'border-r border-myPeach': project?.stack.length && index !== project?.stack.length - 1}">
              <p class="font-roboto text-xl text-myWhite font-light">{{ tech.name }}</p>
              <Icon :name="tech.icon" size="18px" class="text-myWhite" />
            </span>
          </span>
        </span>
   
        <!-- Visit Project -->
        <div class="py-6">
          <ui-my-button :handle-click="visitProject">Visit Project</ui-my-button>
        </div>
      </div>

    </div>
  </section>
</template>