import { defineStore } from "pinia";
import { reactive } from "vue";

interface IUserData {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro";
  assinature: "monthly" | "yearly";
  addOns: Partial<"onlineService" | "largerStorage" | "customizableProfile">[];
}

const useUserDataStore = defineStore("userData", () => {
  const userData = reactive<IUserData>({
    name: "",
    email: "",
    phone: "",
    addOns: [],
    plan: "arcade",
    assinature: "monthly",
  });

  function setUserData(newUserData: Partial<IUserData>) {
    Object.assign(userData, newUserData);
  }

  return { userData, setUserData };
});

export default useUserDataStore;
