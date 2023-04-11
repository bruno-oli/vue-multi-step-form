<template>
  <div
    class="h-full w-64 rounded-md bg-[url('./assets/bg-sidebar-desktop.svg')] bg-no-repeat bg-center p-6 flex flex-col gap-3"
  >
    <StepIndicator :step="1" />
    <StepIndicator :step="2" />
    <StepIndicator :step="3" />
    <StepIndicator :step="4" />
  </div>
</template>

<script setup lang="ts">
import StepIndicator from "./StepIndicator.vue";
</script>
