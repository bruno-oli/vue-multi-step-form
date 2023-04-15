<template>
  <form
    class="flex flex-col items-start px-16 pt-6 pb-2 w-[38rem]"
    @submit.prevent="handleSubmit"
  >
    <div class="mb-8">
      <Title>Pick Add-ons</Title>
      <Description>Add-ons help enhance your gaming experience.</Description>
    </div>
    <div class="w-full flex flex-col gap-5">
      <div
        class="w-full h-20 border-solid border-2 border-purplishblue rounded-md flex items-center px-6 justify-between transition-all"
        v-for="addOn in localeAddOns"
        :key="addOn.name"
        :class="
          addOn.selected ? 'bg-purplishblue bg-opacity-10' : 'bg-transparent'
        "
      >
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            name=""
            id=""
            class="scale-125"
            v-model="addOn.selected"
          />
          <div>
            <h2 class="font-ubunto text-marineblue font-bold text-lg">
              {{ addOn.name }}
            </h2>
            <p class="font-ubunto text-coolgray">
              {{ addOn.description }}
            </p>
          </div>
        </div>
        <span class="text-purplishblue font-ubunto">{{
          userStore.userData.assinature === "monthly"
            ? `+$${addOn.price}/mo`
            : `+$${addOn.price * 10}/yr`
        }}</span>
      </div>
    </div>
    <Button>Next Step</Button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Description from "../Description.vue";
import Title from "../Title.vue";
import useUserDataStore from "../../stores/UserDataStore";
import Button from "../Button.vue";
import useStepStore from "../../stores/StepStore";

const userStore = useUserDataStore();
const stepStore = useStepStore();

type addOn = {
  name: string;
  description: string;
  price: number;
  selected: boolean;
};

const localeAddOns = reactive<Array<addOn>>([
  {
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
    selected: false,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
    selected: false,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    price: 2,
    selected: false,
  },
]);

function handleSubmit() {
  userStore.setUserData({ addOns: localeAddOns });
  stepStore.nextStep();
}
</script>

<style scoped></style>
