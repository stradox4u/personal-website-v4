export const useContactMe = (target: Ref<HTMLElement | null>) => {
  const scrollToContactForm = () => {

    target.value?.scrollIntoView({ behavior: 'smooth' });
  }
  return scrollToContactForm;
}
