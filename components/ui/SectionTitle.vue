<script setup lang="ts">
type SectionTitleProps = {
  lightTitle: string;
  darkTitle: string;
}

const props = defineProps<SectionTitleProps>();
</script>


<template>
  <div class="relative flex items-center">
    <span class="font-bungee-outline sm:text-9xl text-7xl text-myLightGray">{{ props.darkTitle }}</span>
    <h3 class="font-amaranth font-bold text-myWhite sm:text-5xl text-3xl absolute left-3">{{ props.lightTitle }}</h3>
  </div>
</template>