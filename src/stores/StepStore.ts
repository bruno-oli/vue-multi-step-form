import { defineStore } from "pinia";
import { ref } from "vue";
import useUserDataStore from "./UserDataStore";

const useStepStore = defineStore("step", () => {
  const step = ref(4);
  const userStore = useUserDataStore();

  function nextStep() {
    step.value = step.value + 1;
    console.log(userStore.userData);
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
