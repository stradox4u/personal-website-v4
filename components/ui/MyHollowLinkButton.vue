<script setup lang="ts">
type LinkProps = {
  destination: string;
  labelText: string;
  isExternal?: boolean;
}

const props = withDefaults(defineProps<LinkProps>(), {
  isExternal: false
});
</script>


<template>
  <NuxtLink :to="destination" :external="isExternal" :target="isExternal ? '_blank' : '_self'"
    class="py-2 px-12 text-base capitalize text-myCyan border-2 border-myCyan rounded-md hover:shadow-inner
    shadow-myPeach hover:scale-105 flex justify-around gap-3 items-center" >
      <span>{{ labelText }}</span>
      <slot></slot>
  </NuxtLink>
</template>