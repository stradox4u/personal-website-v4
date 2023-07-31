<script setup lang="ts">
type IntroSectionProps = {
  handleContactClick: () => void;
}

const props = defineProps<IntroSectionProps>();

const technologies = [
  { name: "Vue JS", icon: "logos-vue" },
  { name: "Nuxt", icon: "logos-nuxt-icon" },
  { name: "Node JS", icon: "logos-nodejs-icon" },
  { name: "Express JS", icon: "skill-icons:expressjs-light" },
  { name: "Nest JS", icon: "logos-nestjs" },
  { name: "React", icon: "logos-react" },
  { name: "Inertia JS", icon: "tabler:brand-inertia" },
  { name: "Tailwind CSS", icon: "logos-tailwindcss-icon" },
  { name: "Laravel", icon: "logos:laravel" },
  { name: "PostgreSQL", icon: "logos-postgresql" },
  { name: "MySQL", icon: "logos-mysql-icon" },
  { name: "Mongo DB", icon: "logos-mongodb-icon" },
  { name: "Prisma", icon: "simple-icons:prisma"}
]
</script>


<template>
  <section class="bg-myDarkGray px-10 py-8 w-full">
    <div class="max-w-7xl mx-auto py-12 flex sm:flex-row flex-col justify-between sm:items-stretch items-center gap-12">
      <div class="sm:w-[40%] w-[80%] sm:block flex justify-center">
        <nuxt-img src="/DSC_6026.jpg" class="sm:aspect-[9/16] aspect-square rounded-full sm:rounded-none
        object-left-top object-cover" alt="headshot color" format="webp" sizes="sm:240px md:640px" provider="imgix" />
      </div>
      <div class="w-full flex flex-col justify-between">
        <h3 class="text-2xl font-amaranth text-myCyan">Who am I?</h3>
        <h3 class="text-3xl font-amaranth text-myPeach">I'm Umar Adejoh, a Full Stack Web Developer.</h3>
        <p class="text-2xl font-amaranth text-myMidGray text-justify">
          I was formally trained, and practiced as an architect for over 12 years.
          My passion for tech eventually led me into web development.
        </p>
        <p class="text-2xl font-amaranth text-myMidGray text-justify">
          I believe that tech is the future, and am excited to be a part of it.
          My mantra is to deliver in line with the client's expectations, using whatever
          methods/tools are most appropriate.
        </p>
        <p class="text-2xl font-amaranth text-myMidGray text-justify">
          I try to give back to the community by being active on
          <nuxt-link to="https://twitter.com/stradox4u" :external="true" class="text-myCyan">Twitter</nuxt-link>
          and a few Discord servers as @stradox.
        </p>
        <div class="w-full border-b-4 border-myPeach"></div>
  
        <!-- Technologies -->
        <div class="flex flex-col gap-2">
          <div class="flex sm:flex-row flex-col gap-2 sm:justify-between">
            <div class="inline-flex gap-3">
              <span class="font-amaranth text-lg text-myWhite">Name:</span>
              <span class="font-amaranth text-lg text-myMidGray">Umar O. Adejoh</span>
            </div>
            <div class="inline-flex gap-3">
              <span class="font-amaranth text-lg text-myWhite">Location:</span>
              <span class="font-amaranth text-lg text-myMidGray">Abuja, Nigeria</span>
            </div>
          </div>
          <div class="inline-flex gap-3 sm:flex-nowrap flex-wrap">
            <span class="font-amaranth text-lg text-myWhite">Languages:</span>
            <span class="font-amaranth text-lg text-myMidGray divide-x divide-myPeach">
              <span class="inline-flex items-center gap-2 px-3">Javascript <Icon name="logos-javascript" size="18px" /></span>
              <span class="inline-flex items-center gap-2 px-3">Typescript <Icon name="logos-typescript-icon" size="18px" /></span>
              <span class="inline-flex items-center gap-2 px-3">PHP <Icon name="logos-php" size="18px" /></span>
              <span class="inline-flex items-center gap-2 px-3">HTML <Icon name="logos-html-5" size="18px" /></span>
              <span class="inline-flex items-center gap-2 px-3">CSS <Icon name="logos-css-3" size="18px" /></span>
            </span>
          </div>
          <div class="inline-flex gap-3 sm:flex-nowrap flex-wrap">
            <span class="font-amaranth text-lg text-myWhite">Technologies:</span>
            <span class="font-amaranth text-lg text-myMidGray inline-flex flex-wrap">
              <span class="inline-flex items-center gap-2 px-3" v-for="(tech, index) in technologies" :key="tech.name"
                :class="{'border-r border-myPeach': index !== technologies.length - 1}">
                {{ tech.name }} 
                <Icon :name="tech.icon" size="18px" />
              </span>
            </span>
          </div>
          <div class="my-4">
            <ui-my-button :handle-click="handleContactClick">contact me</ui-my-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>