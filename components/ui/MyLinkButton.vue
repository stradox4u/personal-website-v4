<script setup lang="ts">
type LinkProps = {
  destination: string | undefined;
  labelText: string;
  isExternal?: boolean;
}

const props = withDefaults(defineProps<LinkProps>(), {
  isExternal: false
});
</script>


<template>
  <NuxtLink :to="destination" :external="isExternal" :target="isExternal ? '_blank' : '_self'"
    class="py-4 px-12 bg-myCyan text-base capitalize text-myWhite rounded-md hover:shadow-md
    shadow-myPeach hover:scale-105 disabled:scale-100 disabled:bg-opacity-50" >
    <span>{{ labelText }}</span>
    <slot></slot>
  </NuxtLink>
</template>