<script setup lang="ts">
type SectionTitleProps = {
  lightTitle: string;
  darkTitle: string;
}

const props = defineProps<SectionTitleProps>();
</script>


<template>
  <div class="relative flex items-center">
    <span class="font-bungee-outline text-9xl text-myLightGray">{{ props.darkTitle }}</span>
    <h3 class="font-amaranth font-bold text-myWhite text-5xl absolute left-3">{{ props.lightTitle }}</h3>
  </div>
</template>