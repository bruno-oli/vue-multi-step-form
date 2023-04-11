<template>
  <main
    class="bg-magnolia w-screen min-h-screen flex items-center justify-center"
  >
    <section class="h-[36rem] p-3 bg-white shadow-md rounded-md flex">
      <SideBar />
    </section>
  </main>
</template>

<script setup lang="ts">
import SideBar from "./components/SideBar/SideBar.vue";
</script>
