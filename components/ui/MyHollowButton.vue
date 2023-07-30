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
    class="py-2 px-12 text-base capitalize text-myCyan border-2 border-myCyan rounded-md hover:shadow-inner
    shadow-myPeach hover:scale-105 flex justify-around gap-3 items-center" >
    <slot></slot>
    <slot name="icon"></slot>
  </button>
</template>