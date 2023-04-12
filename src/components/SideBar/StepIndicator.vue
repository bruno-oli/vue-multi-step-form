<template>
  <div class="flex gap-4 items-center">
    <div :class="classStepNumberBackgroundObject">
      <span :class="classStepNumberObject">{{ props.step }}</span>
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

const { step } = useStepStore();

const classStepNumberObject = computed(() => ({
  "font-ubunto": true,
  "font-bold": true,
  "text-marineblue": step === props.step,
  "text-pastelblue": step !== props.step,
}));

const classStepNumberBackgroundObject = computed(() => ({
  "w-8": true,
  "h-8": true,
  "rounded-full": true,
  "border-magnolia": true,
  "border-solid": true,
  "border-2": true,
  flex: true,
  "items-center": true,
  "justify-center": true,
  "bg-magnolia": step === props.step,
}));

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
