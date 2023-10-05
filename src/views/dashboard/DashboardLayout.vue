<template>
  <div class="flex flex-column">
    <NavBar/>
    <RouterView class="flex-grow-1" />
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";

</script>
