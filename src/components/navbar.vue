<template>
  <div class="flex justify-content-between flex-wrap">
    <div class="card flex align-items-center justify-content-center">
      <Sidebar v-model:visible="visible" >
        <img class="flex justify-content-start" src="../assets/logo.svg" alt="Orp logo" width="100">

        <h2>Sidebar</h2>
        <p>hello sidebard.</p>
      </Sidebar>
      <Button icon="pi pi-bars" @click="visible = true" />
    </div>
    <div class="card flex align-items-center justify-content-center">
      <Button type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </div>
  </div>
</template>


<script setup>
  import Sidebar from 'primevue/sidebar';
  const visible = ref(false);
  import { ref } from "vue";
  import TieredMenu from 'primevue/tieredmenu';
  const menu = ref();
  const items = ref([
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus'
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Logout' ,
      icon: 'pi pi-fw pi-power-off'
    }
  ]);

  const toggle = (event) => {
    menu.value.toggle(event);
  };
</script>



