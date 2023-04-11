import { defineStore } from "pinia";
import { ref } from "vue";

const useStepStore = defineStore("step", () => {
  const step = ref(1);

  function nextStep() {
    if (step.value === 4) {
      return;
    }
    step.value += 1;
  }

  function prevStep() {
    if (step.value === 1) {
      return;
    }
    step.value -= 1;
  }

  return { step, prevStep, nextStep };
});

export default useStepStore;
