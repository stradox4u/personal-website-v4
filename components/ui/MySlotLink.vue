<script setup lang="ts">
type CustomLinkProps = {
  to: string;
}

const props = defineProps<CustomLinkProps>();
</script>

<template>
  <ui-custom-link :to="to" >
    <slot></slot>
  </ui-custom-link>
</template>