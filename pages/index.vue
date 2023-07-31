<script setup lang="ts">
useHead({
  title: "Dev Umar Portfolio",
  meta: [
    { name: 'description', content: 'A developer\'s portfolio for Umar Adejoh (Dev Umar)' },
    { name: 'keywords', content: 'Umar, Dev Umar, Dev, Portfolio' },
    { name: 'robots', content: 'index, follow' },
    { name: 'charset', content: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'author', content: 'Umar Adejoh' },
    { name: 'og:title', content: 'Umar Adejoh, Full stack software developer' },
    { name: 'og:description', content: 'Introduction and portfolio for Umar Adejoh' },
    { name: 'og:image', content: '/my-website-og.webp' },
    { name: 'twitter:title', content: 'Umar Adejoh, Full stack software developer' },
    { name: 'twitter:creator', content: '@stradox4u' },
    { name: 'twitter:image', content: '/my-website-og.webp' },
  ],
  link: [
    {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
  ]
})
</script>


<template>
  <div class="">
    <hero-section></hero-section>
    <div class="bg-myDarkGray flex flex-col gap-y-16 pb-16">
      <intro-section></intro-section>
      <experience-panel></experience-panel>
      <portfolio-section></portfolio-section>
      <blog-section></blog-section>
      <contact-section></contact-section>
    </div>
  </div>
</template>