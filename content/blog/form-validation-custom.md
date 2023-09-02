---
title: Vue Form Validation
description: How to Create Your Own Custom Form Validation in Vue 3
image: '/validation-errors.png'
date: '2023-09-02'
head:
  meta:
    - name: 'keywords'
      content: 'vue 3, forms, validation, form validation, vue'
    - name: 'author'
      content: 'Umar Adejoh'
    - name: 'copyright'
      content: '© 2023 Umar Adejoh'
    - name: 'title'
      content: 'Vue Form Validation'
---

# Vue Form Validation

![image showing multiple validation errors](/validation-errors.png)

There are quite a few libraries out there to help you with form validation in Vue 3 such as [Vuelidate](https://vuelidate.js.org) and many more. However, there sometimes are situations where your needs do not warrant the inclusion of a whole library with all the attendant dependencies and their ramifications for your project. You might also just be in need of something small and simple.

I will be describing here, how I built out the validation logic for such a scenario. I completely ripped the idea for this from how [Vuetify](https://vuetifyjs.com) handles their validation, so credit to them as it is a very simple method.

## The General Idea
The method involves passing an array of functions into the input component, which are then run each time the input value changes, and if any validation errors are found, they are placed in an errors property, which is then displayed in the UI. This is explained in further detail below.

### The Input Component
The input component is setup as shown below:

> MyBaseInput.vue

```vue
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
        class="..."
      :class="{'border-rose-500': valErrors.length > 0}" />
    </div>
    <!-- Validation Errors -->
    <div class="flex flex-col gap-1 items-start">
      <span v-for="(error, index) in valErrors" :key="index" class="text-rose-500 text-xs px-3 font-roboto">
        {{ error }}
      </span>
    </div>
  </div>
</template>
```

You'll see that in the script block of the input component, we first setup our props, and then define our emits, which are just good practice, helping the component to be self-documenting. Most important for our purposes here is the validators prop, which we've defined as an array of functions which take a string as an argument and return a boolean value (always true), or a string value (the validation error in text form).

Next, we define a function `emitUpdate`, to be called whenever an input event is fired on our input element (note that for a file input for example, this would be a different event, I use the change event in that case). This function emits the `update:modelValue` event, which is consumed by the parent element to allow us to use `v-model` binding on our custom input element. It also calls the `runValidators` function, which is defined next.

The final function we define here is called `runValidators`, and it does exactly like the name suggests. This function takes all the validators passed in as props, and runs them against the current value of the input element. If any of the validators returns an error string instead of the boolean true, this string is pushed into the `valErrors` array, which then causes the validation errors to be shown in the UI.

### Using the Input Component
Now that we've written our input component, we could go ahead and use it in other components, as shown below:

> MyForm.vue

```vue
<script setup lang="ts">
import { reactive } from "vue";

const contactForm = reactive({
  name: '',
  email: '',
});

const nameVal = [
  (val: string) => !!val || 'Name is required',
  (val: string) => val.length > 3 || 'Name must be more than 3 characters',
];

const emailVal = [
  (val: string) => !!val || 'Email is required',
  (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid',
];
</script>

<template>
  <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-3 w-full">
    <div class="flex sm:flex-row flex-col sm:gap-x-6 gap-y-3">
      <ui-base-input v-model="contactForm.name" placeholder-text="Name" input-type="text"
        :validators="nameVal"></ui-base-input>

      <ui-base-input v-model="contactForm.email" placeholder-text="Email" input-type="email"
        :validators="emailVal"></ui-base-input>
    </div>

    <div class="my-4">
      <ui-my-button button-type="submit">
        <div class="flex justify-around items-center relative">
          <span>Submit Form</span>
          <Icon v-if="loading" name="mdi:loading" size="18px" class="text-myWhite animate-spin
            absolute top[50%] -right-6 self-center" />
        </div>
      </ui-my-button>
    </div>
  </form>
</template>
```

As we can see, we're passing an array of functions to the `validators` prop of our input components, of which we have two here, named 'Name' and 'Email'. The validators arrays are made up of functions, each taking a string as an argument, and then running it against some validating logic, returning true if it passes, or a string if not. These returned strings are the validation errors which end up rendered in our UI.

## Conclusion
Once again, hats off to the [Vuetify](https://vuetifyjs.com) team for this simple but effective methodology. I hope this helps someone somewhere, and if you have any further questions, feel free to reachout to me on [Twitter](https://twitter.com/stradox4u), or at my [website](https://arcodeh.pro).
