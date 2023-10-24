<template>
  <div class="flex flex-row gap-4">
    <div class="left-panel">
      <DataTable :value="deviceStore.device" @row-click="onRowSelect">
        <Column field="id" header="ID" class="border-solid"/>
        <Column field="deviceName()" header="Nom de la machine">
          <template #body="{data}">
            {{ (data as Device).model}}
          </template>
        </Column>
      </DataTable>
    </div>
<!--    <ParcByClient class="h-min"/>-->
    <div class="flex-grow-1 h-min">
      <DeviceDetail :device="selectedDevice" v-if="selectedDevice"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
import Device from "@/models/device";
import DeviceDetail from "@/components/parc/ParcByClient.vue";

import {useAuthStore} from "@/stores/auth-store";

const authStore = useAuthStore();
const deviceStore = useDeviceStore();
const showNewDeviceButton = ref(true);
const selectedDevice = ref<Device>(null);


const onRowSelect = (event) => {
  selectedDevice.value = event.data;
  showNewDeviceButton.value = false;
};

onMounted(() => {
  deviceStore.getDeviceByClient(authStore.user.id);
});


</script>
<style scoped>
.left-panel {
  min-width: 350px;
  max-width: 350px;
  flex: 1 1 auto;
  overflow-y: auto;
  max-height: 100vh;
}
</style>
