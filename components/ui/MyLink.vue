<script setup lang="ts">
type CustomLinkProps = {
  to: string;
  title: string;
}

const props = defineProps<CustomLinkProps>();
</script>

<template>
  <ui-custom-link :to="to">{{ title }}</ui-custom-link>
</template>