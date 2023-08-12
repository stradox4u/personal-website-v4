<script setup lang="ts">
import { socialMedia } from '@/assets/socialMedia';

const contactForm = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});
const loading = ref(false);
const genError = ref('');
const handleSendMessage = useSendContactMessage(contactForm, loading, genError);

const nameVal = [
  (val: string) => !!val || 'Name is required',
  (val: string) => val.length > 3 || 'Name must be more than 3 characters',
];

const emailVal = [
  (val: string) => !!val || 'Email is required',
  (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid',
];

const subjVal = [
  (val: string) => !!val || 'Subject is required',
  (val: string) => val.length > 3 || 'Subject must be more than 3 characters',
]

const messageVal = [
  (val: string) => !!val || 'Message is required',
  (val: string) => val.length > 8 || 'Message must be more than 8 characters',
]
</script>


<template>
  <section id="contactSection" class="bg-myDarkGray w-full overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <ui-section-title dark-title="Contact" light-title="Get in Touch"></ui-section-title>
      <div class="grid sm:grid-cols-3 grid-cols-1 gap-8">
        <div class="sm:col-span-2 col-span-1 flex flex-col gap-3 w-full sm:px-0 px-3">
          <h4 class="font-roboto text-3xl text-myWhite">Email Me</h4>
          <form @submit.prevent="handleSendMessage" class="flex flex-col gap-3 w-full">
            <div class="flex sm:flex-row flex-col sm:gap-x-6 gap-y-3">
              <ui-base-input v-model="contactForm.name" placeholder-text="Name" input-type="text"
                :validators="nameVal"></ui-base-input>

              <ui-base-input v-model="contactForm.email" placeholder-text="Email" input-type="email"
                :validators="emailVal"></ui-base-input>
            </div>

            <ui-base-input v-model="contactForm.subject" placeholder-text="Subject" input-type="text"
              :validators="subjVal"></ui-base-input>

            <ui-base-textarea v-model="contactForm.message" :rows="5" placeholder-text="Message"
              :validators="messageVal"></ui-base-textarea>

            <span class="text-sm font-roboto text-rose-500 text-left">{{ genError }}</span>
            <div class="my-4">
              <ui-my-button button-type="submit" :disabled="loading">
                <div class="flex justify-around items-center relative">
                  <span>Send Message</span>
                  <Icon v-if="loading" name="mdi:loading" size="18px" class="text-myWhite animate-spin
                    absolute top[50%] -right-6 self-center" />
                </div>
              </ui-my-button>
            </div>
          </form>

        </div>
        <div class="col-span-1 flex flex-col gap-3 w-full sm:px-0 px-3">
          <h4 class="font-roboto text-3xl text-myWhite">Social Media</h4>
          <p class="font-roboto font-light text-myWhite text-xl">
            I'm always available for the right project and opportunity. Feel free to contact me!
          </p>
          <div class="relative">
            <div class="absolute left-[8%] border-r-4 h-full border-myPeach"></div>
            <nuxt-link :to="media.url" :external="true" v-for="media in socialMedia" :key="media.name"
              class="inline-flex items-center">
              <Icon :name="media.icon" size="36px" class="text-myPeach pr-2 hover:scale-105" />
              <span class="font-roboto font-light text-sm text-myWhite pl-2">{{ media.url }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>