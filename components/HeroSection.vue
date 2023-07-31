<script setup lang="ts">
const typingEntries = ["Umar", "a Developer"];
const currTypingEntryIndex = ref(0);
const typingOutput = ref("");
const deleting = ref(false);

const addText = () => {
  typingOutput.value += typingEntries[currTypingEntryIndex.value].split("")[typingOutput.value.length];
}

const removeText = () => {
  typingOutput.value = typingOutput.value.slice(0, -1);
}

let renderCount = ref(0);
const animateTyping = (timestamp: number) => {
  const count = renderCount.value++;

  if (count % 40 === 0) {
    if (deleting.value) {
      removeText();
    }

    if (typingOutput.value.length === typingEntries[currTypingEntryIndex.value].length && !deleting.value) {
      deleting.value = true;
    }

    if (typingOutput.value.length !== typingEntries[currTypingEntryIndex.value].length && !deleting.value) {
      addText();
    }

    if (deleting.value && typingOutput.value.length === 0) {
      deleting.value = false;
      currTypingEntryIndex.value++;
      if (currTypingEntryIndex.value === typingEntries.length) {
        currTypingEntryIndex.value = 0;
      }
    }
  }

  window.requestAnimationFrame(animateTyping);
}

onMounted(() => {
  window.requestAnimationFrame(animateTyping);
});
</script>

<template>
  <div class="bg-myLightGray px-10 py-8 w-full">
    <div class="max-w-7xl mx-auto pt-12 flex justify-between items-stretch relative">
      <div class="flex flex-col justify-between gap-20 z-10">
        <div class="mt-24">
          <h1 class="sm:text-3xl text-2xl font-amaranth text-myWhite">Hi There!</h1>
          <h3 class="text-myWhite font-amaranth font-bold sm:text-5xl text-4xl">
            I am
            <span>{{ typingOutput }}</span>
            <span class="border-r-2 border-myWhite animate-ping"></span>
          </h3>
          <h4 class="text-myWhite font-amaranth sm:text-2xl text-xl">I build great web experiences.</h4>
          <div class="my-4">
            <ui-my-button>contact me</ui-my-button>
          </div>
        </div>
        <div class="mt-8 justify-self-end">
          <social-media></social-media>
        </div>

      </div>
      <!-- Hero Profile photo -->
      <div class="w-[100%] absolute -bottom-8 top-0 sm:-right-14 -right-10 flex justify-end z-0">
        <img src="/website-headshot.png" class="h-full object-cover" />
      </div>
    </div>
  </div>
</template>