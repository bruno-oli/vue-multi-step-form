<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col items-start px-16 pt-6 pb-2"
  >
    <div class="mb-8">
      <Title>Personal Info</Title>
      <Description
        >Please provide your name, email address, and phone number.</Description
      >
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex w-full items-center justify-between">
        <Label>Name</Label>
        <ErrorMessage>{{ errors.name }}</ErrorMessage>
      </div>
      <input
        name="name"
        v-model="name"
        type="text"
        placeholder="e.g. Stephen King"
      />

      <div class="flex w-full items-center justify-between">
        <Label>Email Address</Label>
        <ErrorMessage>{{ errors.email }}</ErrorMessage>
      </div>
      <input
        name="email"
        v-model="email"
        type="email"
        placeholder="e.g. sthenking@lorem.com"
      />

      <div class="flex w-full items-center justify-between">
        <Label>Phone Number</Label>
        <ErrorMessage>{{ errors.phone }}</ErrorMessage>
      </div>
      <input
        name="phone"
        v-model="phone"
        type="string"
        placeholder="e.g. +1 234 567 890"
      />
    </div>

    <Button
      class="mt-16 self-end text-magnolia bg-marineblue font-medium text-sm rounded-md px-5 py-2"
      >Next Step</Button
    >
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

const { nextStep } = useStepStore();

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
        "Enter a valid number!"
      ),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField("name");
const { value: email } = useField("email");
const { value: phone } = useField("phone");

const onSubmit = handleSubmit(() => {
  nextStep();
});
</script>
