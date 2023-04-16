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
        v-for="plan in localeActivePlan"
        :key="plan.name"
        :class="plan.selected ? 'border-purplishblue' : 'border-lightgray'"
        @click="
          () => {
            localeActivePlan.forEach((i) => {
              i.selected = false;
            });
            plan.selected = true;
          }
        "
      >
        <img :src="getPlanIconPath(plan.name)" />
        <div class="flex flex-col items-start mb-0">
          <Subtitle>{{ plan.name }}</Subtitle>
          <Description>{{
            localeActiveAssinature === "monthly"
              ? `$${plan.prices.monthly}/mo`
              : `$${plan.prices.yearly}/yr`
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

//icons
import iconArcade from "../../assets/icon-arcade.svg";
import iconAdvanced from "../../assets/icon-advanced.svg";
import iconPro from "../../assets/icon-pro.svg";

type plans = {
  name: "Arcade" | "Advanced" | "Pro";
  selected: boolean;
  prices: {
    monthly: number;
    yearly: number;
  };
};

const userStore = useUserDataStore();
const stepStore = useStepStore();
const localeActivePlan = ref<Array<plans>>([
  {
    name: "Arcade",
    selected: true,
    prices: {
      monthly: 9,
      yearly: 90,
    },
  },
  {
    name: "Advanced",
    selected: false,
    prices: {
      monthly: 12,
      yearly: 120,
    },
  },
  {
    name: "Pro",
    selected: false,
    prices: {
      monthly: 15,
      yearly: 150,
    },
  },
]);

const localeActiveAssinature = ref<"monthly" | "yearly">("monthly");

function changeLocaleAssinature() {
  if (localeActiveAssinature.value === "monthly") {
    localeActiveAssinature.value = "yearly";
  } else {
    localeActiveAssinature.value = "monthly";
  }
}

function getPlanIconPath(plan: "Arcade" | "Advanced" | "Pro") {
  switch (plan) {
    case "Arcade":
      return iconArcade;
    case "Advanced":
      return iconAdvanced;
    case "Pro":
      return iconPro;
  }
}

function handleSubmit() {
  userStore.setUserData({
    ...userStore.userData,
    assinature: localeActiveAssinature.value,
    plans: localeActivePlan.value,
  });
  stepStore.nextStep();
}
</script>
