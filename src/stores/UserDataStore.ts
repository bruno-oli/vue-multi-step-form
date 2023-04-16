import { computed } from "@vue/reactivity";
import { defineStore } from "pinia";
import { reactive } from "vue";

type addOn = {
  name: string;
  description: string;
  price: number;
  selected: boolean;
};

type plans = {
  name: "Arcade" | "Advanced" | "Pro";
  selected: boolean;
  prices: {
    monthly: number;
    yearly: number;
  };
};

interface IUserData {
  name: string;
  email: string;
  phone: string;
  plans: Array<plans>;
  assinature: "monthly" | "yearly";
  addOns: Array<addOn>;
}

const useUserDataStore = defineStore("userData", () => {
  const userData = reactive<IUserData>({
    name: "",
    email: "",
    phone: "",
    addOns: [
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
    ],
    plans: [
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
    ],
    assinature: "monthly",
  });

  function setUserData(newUserData: Partial<IUserData>) {
    Object.assign(userData, newUserData);
  }

  const getActivePlan = computed(() => {
    return userData.plans.filter((i) => i.selected)[0];
  });

  return { userData, setUserData, getActivePlan };
});

export default useUserDataStore;
