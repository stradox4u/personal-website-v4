<script setup lang="ts">
type HamburgerProps = {
  menuOpen: boolean;
  handleClick: () => void;
}

const props = defineProps<HamburgerProps>();
</script>


<template>
  <div @click="handleClick" class="absolute top-1 right-1 cursor-pointer h-6 py-3 aspect-square">
    <span aria-hidden="true" :class="menuOpen ? 'rotate-45' : '-translate-y-1.5'"
      class = "block absolute h-0.5 w-4 bg-current transform transition duration-500 ease-in-out" >
    </span>
    <span aria-hidden="true" :class="menuOpen ? 'opacity-0' : ''"
      class="block absolute  h-0.5 w-4 bg-current transform transition duration-500 ease-in-out" >
    </span>
    <span aria-hidden="true" :class="menuOpen ? '-rotate-45' : 'translate-y-1.5'"
      class=" block absolute  h-0.5 w-4 bg-current transform transition duration-500 ease-in-out" >
    </span>
  </div>
</template>