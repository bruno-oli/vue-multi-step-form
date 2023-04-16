<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-start px-16 pt-6 pb-2 w-[38rem]"
  >
    <div class="mb-8">
      <Title>Finishing up</Title>
      <Description
        >Double check everything looks OK before confirming.</Description
      >
    </div>
    <div class="flex flex-col gap-5 p-5 rounded-md bg-magnolia w-full">
      <div
        class="flex items-center justify-between border-b-[1px] border-solid border-lightgray pb-5"
      >
        <div class="flex flex-col items-start">
          <span
            class="capitalize text-marineblue text-lg font-medium font-ubunto"
            >{{ userStore.getActivePlan.name }} ({{
              userStore.userData.assinature
            }})</span
          >
          <button type="button" class="text-coolgray underline font-ubunto">
            Change
          </button>
        </div>
        <span class="text-marineblue font-bold text-lg font-ubunto">{{
          userStore.userData.assinature === "monthly"
            ? `$${userStore.getActivePlan.prices.monthly}/mo`
            : `$${userStore.getActivePlan.prices.yearly}/yr`
        }}</span>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div
          v-for="addOn in addOns"
          :key="addOn.name"
          class="flex w-full items-center justify-between"
        >
          <span class="text-coolgray font-ubunto">{{ addOn.name }}</span>
          <span class="text-marineblue font-medium font-ubunto">{{
            userStore.userData.assinature === "monthly"
              ? `$${addOn.price}/mo`
              : `$${addOn.price * 10}/yr`
          }}</span>
        </div>
      </div>
    </div>
    <div class="p-5 flex w-full justify-between items-center">
      <span class="font-ubunto text-coolgray">
        Total (per
        {{ userStore.userData.assinature === "monthly" ? "month" : "year" }})
      </span>
      <span class="font-ubunto text-purplishblue font-bold text-2xl"
        >+${{ totalValue
        }}{{
          userStore.userData.assinature === "monthly" ? "/mo" : "/yr"
        }}</span
      >
    </div>
    <button
      class="self-end mt-10 px-8 py-2 rounded-md bg-purplishblue text-white font-bold"
    >
      Confirm
    </button>
  </form>
</template>

<script setup lang="ts">
import useStepStore from "../../stores/StepStore";
import useUserDataStore from "../../stores/UserDataStore";
import Button from "../Button.vue";
import Description from "../Description.vue";
import Title from "../Title.vue";

const userStore = useUserDataStore();
const stepStore = useStepStore();

const addOns = userStore.userData.addOns.filter((i) => {
  return i.selected;
});

function addOnsValue(): number {
  let price = 0;
  addOns.forEach((i) => {
    if (userStore.userData.assinature === "monthly") {
      price += i.price;
    } else {
      price += i.price * 10;
    }
  });
  return price;
}

const totalValue =
  userStore.userData.assinature === "monthly"
    ? userStore.getActivePlan.prices.monthly
    : userStore.getActivePlan.prices.yearly + addOnsValue();

function handleSubmit() {
  stepStore.nextStep();
}
</script>

<style scoped></style>
