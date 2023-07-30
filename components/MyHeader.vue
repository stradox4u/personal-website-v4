<script setup lang="ts">

</script>


<template>
  <nav class="w-full py-4 sticky top-0 z-10 bg-myLightGray">
    <div class="flex justify-end max-w-7xl mx-auto">
      <ul class="flex justify-between gap-x-8">
        <li>
          <nuxt-link to="/" class="my-nav-item">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/portfolio" class="my-nav-item">Portfolio</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/blog" class="my-nav-item">Blog</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact" class="my-nav-item">Contact</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>