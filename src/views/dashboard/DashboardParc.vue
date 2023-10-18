<template>
  <div class="flex flex-row gap-4">
    <div class="left-panel">
      <DataTable :value="deviceSort" @row-click="onRowSelect">
        <Column field="id" header="ID" class="border-solid"/>
        <Column field="deviceName()" header="Nom de la machine">
          <template #body="{data}">
            {{ (data as Device).model}}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="flex-grow-1 h-min">
      <DeviceDetail :device="selectedDevice" v-if="selectedDevice"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
import Device from "@/models/device";
import DeviceDetail from "@/components/parc/ParcDetail.vue";


const deviceStore = useDeviceStore();

const selectedDevice = ref<Device>(null);

const onRowSelect = (event) => {
  selectedDevice.value = event.data;
};

const deviceSort = computed(() => {
  const sortedDevices = deviceStore.devices.sort((a, b) => a.id - b.id);
  return sortedDevices;
});

onMounted(() => {
  deviceStore.getDevices();
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
