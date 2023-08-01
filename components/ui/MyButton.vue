<script setup lang="ts">
type ButtonProps = {
  buttonType?: "button" | "submit" | "reset";
  handleClick?: () => void;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  buttonType: "button"
});
</script>


<template>
  <button :type="buttonType" @click="handleClick"
    class="py-2 px-12 bg-myCyan text-base capitalize text-myWhite rounded-md hover:shadow-md
    shadow-myPeach hover:scale-105 disabled:scale-100 disabled:bg-opacity-50" >
    <slot></slot>
  </button>
</template>