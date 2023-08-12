export type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useSendContactMessage = (contactForm: ContactForm, loading: Ref<boolean>, genError: Ref<string>) => {
  const handleSendMessage = async () => {
    if(!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) return;
    const form = new FormData();
    Object.keys(contactForm).forEach((key) => {
      form.append(key, contactForm[key as keyof ContactForm]);
    });

    loading.value = true;
    genError.value = '';
    const { data, pending, error, status } = await useFetch(
      '/api/sendContactMail',
      {
        method: 'POST',
        body: contactForm,
        key: 'contact-form',
        watch: false,
      });
    loading.value = pending.value;

    if(status.value === 'success') {
      contactForm.name = '';
      contactForm.email = '';
      contactForm.subject = '';
      contactForm.message = '';
    }

    if (error.value) {
      genError.value = error.value.statusMessage as string;
    }
  }

  return handleSendMessage;
}
