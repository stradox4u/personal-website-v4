<script setup lang="ts">
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
    <div class="max-w-7xl mx-auto flex flex-col gap-12 py-16">
      <div class="sm:px-0 px-3">
        <h2 class="font-amaranth font-bold text-myPeach sm:text-5xl text-3xl">Contact Me</h2>
        <p class="font-roboto text-myWhite sm:text-2xl text-lg">Send me an email now</p>
      </div>
      <div class="w-full gap-8">
        <div class=" flex flex-col gap-3 w-full sm:px-0 px-3">
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
      </div>

    </div>
  </section>
</template>