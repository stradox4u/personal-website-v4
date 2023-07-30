<script setup lang="ts">
const contactForm = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});
const handleSendMessage = () => {
  console.log('Sending message');
}
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
  <section class="bg-myDarkGray w-full">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <ui-section-title dark-title="Contact" light-title="Get in Touch"></ui-section-title>
      <div class="grid grid-cols-3 gap-8">
        <div class="col-span-2 flex flex-col gap-3 w-full">
          <h4>Email Me</h4>
          <form @submit.prevent="handleSendMessage" class="flex flex-col gap-3 w-full">
            <div class="flex gap-x-6">
              <ui-base-input v-model="contactForm.name" placeholder-text="Name" input-type="text"
                :validators="nameVal"></ui-base-input>
              
              <ui-base-input v-model="contactForm.email" placeholder-text="Email" input-type="text"
              :validators="emailVal"></ui-base-input>
            </div>
            
            <ui-base-input v-model="contactForm.subject" placeholder-text="Subject" input-type="text"
            :validators="subjVal"></ui-base-input>

            <ui-base-textarea v-model="contactForm.message" :rows="5" placeholder-text="Message"
              :validators="messageVal"></ui-base-textarea>
          </form>

        </div>
        <div class="col-span-1">

        </div>
      </div>
      
    </div>
  </section>
</template>