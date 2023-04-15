<template>
  <main
    class="bg-magnolia w-screen min-h-screen flex items-center justify-center"
  >
    <section
      class="h-[36rem] p-3 bg-white shadow-md rounded-md flex items-center"
    >
      <SideBar />
      <PersonalInfo v-if="store.step === 1" />
      <SelectPlan v-else-if="store.step === 2" />
      <AddOns v-else-if="store.step === 3" />
    </section>
  </main>
</template>

<script setup lang="ts">
import PersonalInfo from "./components/Forms/PersonalInfo.vue";
import SelectPlan from "./components/Forms/SelectPlan.vue";
import SideBar from "./components/SideBar/SideBar.vue";
import useStepStore from "./stores/StepStore";
import AddOns from "./components/Forms/AddOns.vue";

const store = useStepStore();
</script>
