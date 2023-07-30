<script setup lang="ts">

</script>


<template>
  <nav class="w-full py-4 sticky top-0 z-10 bg-myLightGray">
    <div class="flex justify-end max-w-7xl mx-auto">
      <ul class="flex justify-between gap-x-8">
        <li>
          <ui-my-link to="/" title="Home" class="my-nav-item"></ui-my-link>
        </li>
        <li>
          <ui-my-link to="/portfolio" title="Portfolio" class="my-nav-item"></ui-my-link>
        </li>
        <li>
          <ui-my-link to="/blog" title="Blog" class="my-nav-item"></ui-my-link>
        </li>
        <li>
          <ui-my-link to="/contact" title="Contact" class="my-nav-item"></ui-my-link>
        </li>
      </ul>
    </div>
  </nav>
</template>