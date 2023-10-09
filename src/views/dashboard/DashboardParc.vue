<template>
  <div class="flex flex-row gap-4">
    <div class="left-panel">
      <DataTable :value="deviceStore.devices" @row-click="onRowSelect">
        <Column field="id" header="ID" class="border-solid"/>
        <Column field="deviceName()" header="Nom de la machine">
          <template #body="{data}">
            {{ (data as Device).model}}
          </template>
        </Column>
      </DataTable>
<!--      v companycode -> <DataTable :value="deviceStore.devices" @row-click="onRowSelect">-->
<!--        <Column field="id" header="ID" class="border-solid"/>-->
<!--        <Column field="engine_type" header="Type d'engin"/>-->
<!--      </DataTable>-->
    </div>
    <div class="flex-grow-1 h-min">
      <DeviceDetail :device="selectedDevice" v-if="selectedDevice"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
// import {useAuthStore} from "@/stores/auth-store";
import Device from "@/models/device";
import DeviceDetail from "@/components/parc/ParcDetail.vue";


// const authStore = useAuthStore();
const deviceStore = useDeviceStore();

const selectedDevice = ref<Device>(null);

const onRowSelect = (event) => {
  selectedDevice.value = event.data;
};

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
