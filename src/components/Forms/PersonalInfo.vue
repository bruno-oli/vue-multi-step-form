<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col items-start px-16 pt-6 pb-2 w-[38rem]"
  >
    <div class="mb-8">
      <Title>Personal Info</Title>
      <Description
        >Please provide your name, email address, and phone number.</Description
      >
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex w-full items-center justify-between h-4">
        <Label>Name</Label>
        <transition name="slide-fade">
          <ErrorMessage v-if="errors.name">{{ errors.name }}</ErrorMessage>
        </transition>
      </div>
      <input
        name="name"
        v-model="name"
        type="text"
        placeholder="e.g. Stephen King"
      />

      <div class="flex w-full items-center justify-between h-4">
        <Label>Email Address</Label>
        <transition name="slide-fade">
          <ErrorMessage v-if="errors.email">{{ errors.email }}</ErrorMessage>
        </transition>
      </div>
      <input
        name="email"
        v-model="email"
        type="email"
        placeholder="e.g. sthenking@lorem.com"
      />

      <div class="flex w-full items-center justify-between h-4">
        <Label>Phone Number</Label>
        <transition name="slide-fade">
          <ErrorMessage v-if="errors.phone" class="slide-fade">{{
            errors.phone
          }}</ErrorMessage>
        </transition>
      </div>
      <input
        name="phone"
        v-model="phone"
        type="text"
        placeholder="e.g. +1 234 567 890"
      />
    </div>

    <Button>Next Step</Button>
  </form>
</template>
<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import Description from "../Description.vue";
import Title from "../Title.vue";
import Label from "../Label.vue";
import Button from "../Button.vue";
import ErrorMessage from "../ErrorMessage.vue";
import useStepStore from "../../stores/StepStore";
import useUserDataStore from "../../stores/UserDataStore";

const stepStore = useStepStore();
const userDataStore = useUserDataStore();

const validationSchema = toFormValidator(
  zod.object({
    email: zod
      .string()
      .nonempty("This is required")
      .email({ message: "Must be a valid email" }),
    name: zod.string().nonempty("This is required"),
    phone: zod
      .string()
      .refine(
        (value) => /\(?[0-9]{3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{3}/.test(value),
        "Enter a valid phone!"
      ),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField<string>("name");
const { value: email } = useField<string>("email");
const { value: phone } = useField<string>("phone");

const onSubmit = handleSubmit(() => {
  stepStore.nextStep();
  userDataStore.setUserData({
    name: name.value,
    email: email.value,
    phone: phone.value,
  });
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
