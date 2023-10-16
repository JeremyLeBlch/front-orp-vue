<template>
  <Card class="h-min">
    <template #title>
      <div class="flex flex-row justify-content-between">
        <div class="flex align-items-center">
          <div>{{ device?.model }}</div>
        </div>
        <div class="flex align-items-center">
          <label for="rating" class="flex align-items-center pr-2 text-sm">Marque</label>
          <InputText v-model="device.brand" :cancel="false"/>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit="saveDevice">
        <div class="flex flex-row">
          <div class="flex-grow-1">
            <h3>Machine</h3>
            <table v-if="deviceStore.device" class="w-full">
              <tr>
                <th class="bg-primary-900 p-2 text-left">ID</th>
                <td class="p-2">{{deviceStore.device.id}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Type</th>
                <td class="p-2"><InputText v-model="device.engine_type" class="col-4"/></td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Marque</th>
                <td class="p-2"><InputText v-model="device.brand" class="col-4"/></td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Modèle</th>
                <td class="p-2"><InputText v-model="device.model" class="col-4"/></td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Numéro de Série</th>
                <td class="p-2"><InputText v-model="device.serial_number" class="col-4" /></td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Référence client</th>
                <td class="p-2"><InputText v-model="device.client_reference_number" class="col-4" /></td>
              </tr>
            </table>
            <div v-else> Chargement en cours</div>
          </div>
        </div>
        <div class="mx-auto">
          <Button type="button" label="Enregistrer" icon="pi pi-check" :loading="loading" @click="saveDevice"
                  class="m-4" severity="success"/>
          <Button type="button" label="Annuler les changements" icon="pi pi-history" class="m-4"/>
          <Button type="button" label="Supprimer" icon="pi pi-times" severity="danger" class="m-4"/>
        </div>

      </form>
    </template>
  </Card>
</template>
<script setup lang="ts">
import {onMounted, ref, toRefs, watch} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
import Device from "@/models/device";

const deviceStore = useDeviceStore();

const props = defineProps({
  device : {
    type: Device,
    required: true
  }
});

const {device} = toRefs(props);
const loading = ref(false);
// const interventionStart = ref(null);
// const interventionEnd = ref(null);

onMounted(() => {
  refreshParc();
});

watch(device, () => {
  refreshParc();
});

const saveDevice = async () =>{
  loading.value = true;
  await deviceStore.updateDevice(device.value.id, device.value);
  loading.value = false;
};

function refreshParc () {
  deviceStore.getDeviceById(device.value.id);
}
</script>

