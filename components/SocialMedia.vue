<script setup lang="ts">
const linkedinUrl = "https://www.linkedin.com/in/umar-o-adejoh-mnia-b8595a59/";
const githubUrl = "https://github.com/stradox4u";
const twitterUrl = "https://twitter.com/stradox4u";
</script>


<template>
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
</template>