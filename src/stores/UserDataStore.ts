import { defineStore } from "pinia";
import { reactive } from "vue";

type addOn = {
  name: string;
  description: string;
  price: number;
  selected: boolean;
};

interface IUserData {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro";
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
    plan: "arcade",
    assinature: "monthly",
  });

  function setUserData(newUserData: Partial<IUserData>) {
    Object.assign(userData, newUserData);
  }

  return { userData, setUserData };
});

export default useUserDataStore;
