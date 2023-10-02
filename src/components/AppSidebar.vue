<template>
  <div>
    <Sidebar class="flex justify-content-between flex-wrap" v-model:visible="visible">
      <img src="../assets/logo.svg" alt="Orp logo" width="100">
      <Menu :model="sidebarMenuItems"/>
    </Sidebar>
    <Button icon="pi pi-bars" @click="visible = true"/>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/stores/auth-store";
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {RouteName} from "@/router";

const authStore = useAuthStore();
const router = useRouter();

const visible = ref(false);

const sidebarMenuItems = computed(() => {
  if (authStore.user.isAdmin()) {
    return adminRoutes;
  } else if (authStore.user.isUser()) {
    return userRoutes;
  } else if (authStore.user.isPlanning()) {
    return planningRoutes;
  } else if (authStore.user.isTechnician()) {
    return techRoutes;
  }
  return [];
});

const adminRoutes = [
  {
    label: 'KPI',
    command: () => router.push({name: RouteName.kpi})
  },
  {
    label: 'Gestion User',
    command: () => router.push({name: RouteName.manageUser})
  },
  {
    label: 'Gestion Parc',
    command: () => router.push({name: RouteName.manageParc})
  }
];

const userRoutes = [];
const techRoutes = [];
const planningRoutes = [];

</script>
