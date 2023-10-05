<template>
  <div class="flex justify-content-between">
    <AppSidebar />
    <div class="flex align-items-center justify-content-center gap-3">
      <div class="hidden sm:block">
        {{ authStore.user.fullName() }}
      </div>
      <div class="flex align-items-center justify-content-center pb-2	">
        <Button type="button" icon="pi pi-user" @click="toggleMenu" />
        <TieredMenu ref="menu" :model="tieredMenuItems" popup/>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useAuthStore} from "@/stores/auth-store";
import {RouteName} from "@/router";
import {useRouter} from "vue-router";
import {ref} from "vue";
import AppSidebar from "@/components/AppSidebar.vue";

const authStore = useAuthStore();
const router = useRouter();

const menu = ref();
const tieredMenuItems = ref([
  {
    label: 'Users',
    icon: 'pi pi-fw pi-user',
    items: []
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-power-off',
    command: () => {
      authStore.logout();
      router.push({name: RouteName.login});
    },
  }
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>



