<script setup lang="ts">
const menuOpen = ref(false);
const handleClick = () => {
  menuOpen.value = !menuOpen.value;
  console.log(menuOpen.value);
}
</script>


<template>
  <nav class="w-full py-4 sticky top-0 z-10 bg-myLightGray">
    <div class="flex sm:justify-end justify-stretch max-w-7xl mx-auto">
      <ul class="sm:flex justify-between gap-x-8 hidden">
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

      <!-- Mobile Nav -->
      <ul class="sm:hidden absolute top-0 right-0 pt-8">
        <li>
          <ui-my-hamburger :menu-open="menuOpen" :handle-click="handleClick"></ui-my-hamburger>
        </li>
        <Transition name="drop">
          <ul @click="handleClick" v-if="menuOpen" class="flex flex-col bg-myMidGray bg-opacity-90">
            <ui-my-link to="/" title="Home" class="my-nav-item px-10"></ui-my-link>
            <ui-my-link to="/portfolio" title="Portfolio" class="my-nav-item px-10"></ui-my-link>
            <ui-my-link to="/blog" title="Blog" class="my-nav-item px-10"></ui-my-link>
            <ui-my-link to="/contact" title="Contact" class="my-nav-item px-10"></ui-my-link>
          </ul>
        </Transition>
        </ul>
    </div>
  </nav>
</template>