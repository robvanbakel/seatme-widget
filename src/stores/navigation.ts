import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNavigationStore = defineStore("navigation", () => {
  const currentStep = ref<1 | 2 | 3>(1);

  const onSuccessScreen = computed(() => {
    return currentStep.value === 3;
  });

  const reset = () => {
    currentStep.value = 1;
  };

  return { currentStep, onSuccessScreen, reset };
});
