<script setup lang="ts">
interface InputProps {
  modelValue: string;
  inputType?: string;
  placeholderText: string;
  validators?: Array<(val: string) => boolean | string>;
}
const props = withDefaults(defineProps<InputProps>(), {
  inputType: 'text',
});
const emit = defineEmits(['update:modelValue']);
const emitUpdate = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
  runValidators(event);
}
let valErrors: string[] = [];
const runValidators = (event: Event) => {
  if (!props.validators || props.validators.length === 0) return;
  valErrors = [];
  props.validators && props.validators.forEach((validator) => {
    const isValid = validator((event.target as HTMLInputElement).value);
    if (isValid !== true && typeof isValid === 'string') {
      valErrors.push(isValid);
    }
  });
}

</script>

<template>
  <div class="w-full">
    <div class="w-full pb-2">
      <input :type="inputType" :placeholder="placeholderText" :value="modelValue" @input="emitUpdate" autocomplete="on"
        class="w-full border-b-2 border-myPeach px-4 bg-inputBg text-myWhite
      py-3 focus:outline-none focus:border-none focus:ring-2 focus:ring-myCyan
      placeholder:text-myLightGray font-roboto text-lg"
      :class="{'border-rose-500': valErrors.length > 0}" />
    </div>
    <div class="flex flex-col gap-1 items-start">
      <span v-for="(error, index) in valErrors" :key="index" class="text-rose-500 text-xs px-3 font-roboto">
        {{ error }}
      </span>
    </div>
  </div>
</template>