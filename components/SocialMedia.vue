<script setup lang="ts">
import { socialMedia } from '@/assets/socialMedia';
</script>


<template>
  <div class="flex items-center gap-6">
    <nuxt-link v-for="media in socialMedia" :key="media.name" :to="media.url" :external="true">
      <Icon :name="media.icon" size="36px" class="text-myPeach hover:scale-105" />
    </nuxt-link>
  </div>
</template>