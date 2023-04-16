<template>
  <div class="flex gap-4 items-center">
    <div
      class="w-8 h-8 rounded-full border-magnolia border-solid border-2 flex items-center justify-center"
      :class="store.step === props.step ? 'bg-magnolia' : ''"
    >
      <span
        class="font-ubunto font-bold"
        :class="
          store.step === props.step ? 'text-marineblue' : 'text-pastelblue'
        "
        >{{ props.step }}</span
      >
    </div>
    <div class="flex flex-col">
      <span class="text-xs font-ubunto text-pastelblue font-medium"
        >STEP {{ props.step }}</span
      >
      <span class="text-white text-sm font-bold font-ubunto tracking-wider">{{
        getStepName(props.step)
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useStepStore from "../../stores/StepStore";

type stepType = 1 | 2 | 3 | 4;

const props = defineProps<{
  step: stepType;
}>();

const store = useStepStore();

function getStepName(step: stepType): string {
  switch (step) {
    case 1:
      return "YOUR INFO";
    case 2:
      return "SELECT PLAN";
    case 3:
      return "ADD-ONS";
    case 4:
      return "SUMMARY";
  }
}
</script>
