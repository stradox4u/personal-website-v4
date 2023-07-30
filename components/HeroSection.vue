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

const linkedinUrl = "https://www.linkedin.com/in/umar-o-adejoh-mnia-b8595a59/";
const githubUrl = "https://github.com/stradox4u";
const twitterUrl = "https://twitter.com/stradox4u";
</script>

<template>
  <div class="bg-myLightGray px-10 py-8 w-full">
    <div class="max-w-7xl mx-auto pt-12 flex justify-between items-stretch relative">
      <div class="flex flex-col justify-between gap-20">
        <div class="mt-24">
          <h1 class="text-3xl font-amaranth text-myWhite">Hi There!</h1>
          <h3 class="text-myWhite font-amaranth font-bold text-5xl">
            I am
            <span>{{ typingOutput }}</span>
            <span class="border-r-2 border-myWhite animate-ping"></span>
          </h3>
          <h4 class="text-myWhite font-amaranth text-2xl">I build great web experiences.</h4>
          <div class="my-4">
            <ui-my-button>contact me</ui-my-button>
          </div>
        </div>
        <div class="mt-8 justify-self-end">
          <div class="flex items-center gap-6">
            <nuxt-link :to="linkedinUrl" :external="true">
              <Icon name="mdi-linkedin" size="36px" class="text-myPeach" />
            </nuxt-link>
            <nuxt-link :to="githubUrl" :external="true">
              <Icon name="mdi-github" size="36px" class="text-myPeach" />
            </nuxt-link>
            <nuxt-link :to="twitterUrl" :external="true">
              <Icon name="mdi-twitter" size="36px" class="text-myPeach" />
            </nuxt-link>
          </div>
        </div>

      </div>
      <!-- Hero Profile photo -->
      <div class="w-[50%] absolute -bottom-8 right-0">
        <nuxt-img src="/DSC_6026.jpg" class="" />
      </div>
    </div>
  </div>
</template>