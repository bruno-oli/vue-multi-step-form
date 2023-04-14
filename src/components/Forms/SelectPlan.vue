<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-start px-16 pt-6 pb-2 w-[38rem]"
  >
    <Title>Select your plan</Title>
    <Description class="mb-4"
      >You have the option of monthly or yearly billing.</Description
    >
    <div class="w-full flex justify-between gap-4">
      <div
        class="cursor-pointer w-1/3 h-48 border-solid border-2 rounded-md flex flex-col p-5 items-start justify-between"
        :class="
          localeActivePlan === 'arcade'
            ? 'border-purplishblue'
            : 'border-lightgray'
        "
        @click="localeActivePlan = 'arcade'"
      >
        <img src="../../assets/icon-arcade.svg" alt="arcade-icon" />
        <div class="flex flex-col items-start mb-0">
          <Subtitle>Arcade</Subtitle>
          <Description>{{
            localeActiveAssinature === "monthly" ? "$9/mo" : "$90/yr"
          }}</Description>
        </div>
      </div>
      <div
        class="cursor-pointer w-1/3 h-48 border-lightgray border-solid border-2 rounded-md flex flex-col p-5 items-start justify-between"
        :class="
          localeActivePlan === 'advanced'
            ? 'border-purplishblue'
            : 'border-lightgray'
        "
        @click="localeActivePlan = 'advanced'"
      >
        <img src="../../assets/icon-advanced.svg" alt="arcade-icon" />
        <div class="cursor-pointer flex flex-col items-start mb-0">
          <Subtitle>Advanced</Subtitle>
          <Description>{{
            localeActiveAssinature === "monthly" ? "$12/mo" : "$120/yr"
          }}</Description>
        </div>
      </div>
      <div
        class="cursor-pointer w-1/3 h-48 border-lightgray border-solid border-2 rounded-md flex flex-col p-5 items-start justify-between"
        :class="
          localeActivePlan === 'pro'
            ? 'border-purplishblue'
            : 'border-lightgray'
        "
        @click="localeActivePlan = 'pro'"
      >
        <img src="../../assets/icon-pro.svg" alt="arcade-icon" />
        <div class="cursor-pointer flex flex-col items-start mb-0">
          <Subtitle>Pro</Subtitle>
          <Description>{{
            localeActiveAssinature === "monthly" ? "$15/mo" : "$150/yr"
          }}</Description>
        </div>
      </div>
    </div>
    <div
      class="w-full h-12 bg-magnolia mt-8 rounded-md flex items-center justify-center"
    >
      <div class="flex items-center gap-6">
        <span
          class="font-bold font-ubunto transition-colors"
          :class="
            localeActiveAssinature === 'monthly'
              ? 'text-marineblue'
              : 'text-coolgray'
          "
          >Monthly</span
        >

        <div
          class="w-10 h-5 p-1 relative bg-marineblue rounded-2xl cursor-pointer"
          @click="changeLocaleAssinature"
        >
          <div
            class="w-3 h-3 absolute bg-alabaster rounded-full"
            :class="localeActiveAssinature === 'monthly' ? 'left-1' : 'right-1'"
          ></div>
        </div>

        <span
          class="text-coolgray font-bold font-ubunto transition-colors"
          :class="
            localeActiveAssinature === 'yearly'
              ? 'text-marineblue'
              : 'text-coolgray'
          "
          >Yearly</span
        >
      </div>
    </div>
    <Button>Next Step</Button>
  </form>
</template>

<script setup lang="ts">
import Title from "../Title.vue";
import Description from "../Description.vue";
import Subtitle from "../Subtitle.vue";
import Button from "../Button.vue";
import useUserDataStore from "../../stores/UserDataStore";
import { ref } from "vue";
import useStepStore from "../../stores/StepStore";

const userStore = useUserDataStore();
const stepStore = useStepStore();
const localeActivePlan = ref<"arcade" | "advanced" | "pro">("arcade");
const localeActiveAssinature = ref<"monthly" | "yearly">("monthly");

function changeLocaleAssinature() {
  if (localeActiveAssinature.value === "monthly") {
    localeActiveAssinature.value = "yearly";
  } else {
    localeActiveAssinature.value = "monthly";
  }
}

function handleSubmit() {
  userStore.setUserData({
    ...userStore.userData,
    assinature: localeActiveAssinature.value,
    plan: localeActivePlan.value,
  });
  stepStore.nextStep();
}
</script>
