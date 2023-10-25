<template>
  <div>
    <Sidebar class="flex justify-content-between flex-wrap" v-model:visible="visible">
      <img src="../assets/logo.svg" alt="Orp logo" width="100">
      <Menu :model="sidebarMenuItems"/>
    </Sidebar>
    <Button icon="pi pi-bars" @click="visible = true"/>
  </div>
</template>
<script setup lang="ts">
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

function openPage(routeName: RouteName) {
  router.push({name: routeName});
  visible.value = false;
}

const adminRoutes = [
  {
    label: 'KPI',
    command: () => openPage(RouteName.kpi)
  },
  {
    label: 'Gestion User',
    command: () => openPage(RouteName.manageUser)
  },
  {
    label: 'Gestion Parc',
    command: () => openPage(RouteName.manageParc)
  }
];

const userRoutes = [
  // {
  //   label: 'Nouveau Ticket',
  //   command: () => openPage(RouteName.newTicket)
  // },
  {
    label: 'Ticket',
    command: () => openPage(RouteName.customerHistory)
  },
  {
    label: 'Parc',
    command: () => openPage(RouteName.customerParc)
  },
  // {
  //   label: 'Avis',
  //   command: () => openPage(RouteName.customerReview)
  // },
  // {
  //   label: 'Messagerie',
  //   command: () => openPage(RouteName.messaging)
  // }
];
const planningRoutes = [
  {
    label: 'Planning',
    command: () => openPage(RouteName.planning)
  },
  {
    label: 'Ticket',
    command: () => openPage(RouteName.allTickets)
  },
  {
    label: 'Parc Client',
    command: () => openPage(RouteName.allParc)
  },
  // {
  //   label: 'Messagerie',
  //   command: () => openPage(RouteName.messaging)
  // }
];
const techRoutes = [
  {
    label: 'Ticket',
    command: () => openPage(RouteName.ticketsByTechnicians)
  }
];

</script>
