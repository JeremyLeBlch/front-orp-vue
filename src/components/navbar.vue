<template>
  <div class="flex justify-content-between flex-wrap">
    <div class="card flex align-items-center justify-content-center">
      <Sidebar class="flex justify-content-between flex-wrap" v-model:visible="visible" >
        <img class="flex align-items-center justify-content-center" src="../assets/logo.svg" alt="Orp logo" width="100">

        <h2>Sidebar</h2>
        <p>hello sidebard.</p>
      </Sidebar>
      <Button icon="pi pi-bars" @click="visible = true" />
    </div>
      <div class="flex align-items-center justify-content-center gap-3">
        <div class="block sm:hidden"> </div>
        <div class="hidden sm:block">
          {{ authStore.user.fullName }}
        </div>
        <div class="card flex align-items-center justify-content-center">
          <Button type="button" icon="pi pi-user" @click="toggleMenu" aria-haspopup="true" aria-controls="overlay_tmenu" />
          <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
        </div>
      </div>
  </div>
</template>


<script setup>
  import {useAuthStore} from "@/stores/auth-store";
  import Sidebar from 'primevue/sidebar';
  import { ref } from "vue";
  import TieredMenu from 'primevue/tieredmenu';
  import 'primeicons/primeicons.css';
  import {RouteName} from "@/router";
  import {useRouter} from "vue-router";

  const authStore = useAuthStore();
  const visible = ref(false);

  const router = useRouter();
  const menu = ref();
  const items = ref([
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [

      ]
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        authStore.logout();
        router.push({ name: RouteName.login });
      },
    }
  ]);

  const toggleMenu = (event) => {
    menu.value.toggle(event);
  };
</script>



