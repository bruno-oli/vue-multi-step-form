<template>
  <main
    class="bg-magnolia w-screen min-h-screen flex items-center justify-center"
  >
    <section
      class="h-[36rem] p-3 bg-white shadow-md rounded-md flex items-center"
    >
      <SideBar />
      <PersonalInfo v-if="step === 1" />
    </section>
  </main>
</template>

<script setup lang="ts">
import PersonalInfo from "./components/Forms/PersonalInfo.vue";
import SideBar from "./components/SideBar/SideBar.vue";
import useStepStore from "./stores/StepStore";

const { step } = useStepStore();
</script>
