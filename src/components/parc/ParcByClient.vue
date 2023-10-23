<template>
  <div class="card flex justify-content-center">
    <Dropdown v-model="selectedUser" :options="userList" showClear optionLabel="name" placeholder="Client" class="w-full md:w-14rem" />
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import User from '@/models/user';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();
const selectedUser = ref();
const userList = ref([

])

</script>
