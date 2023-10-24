])
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
            <table class="w-full">
              <tr>
                <th class="bg-primary-900 p-2 text-left">ID</th>
                <td class="p-2">{{device.id}}</td>
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
                <th class="bg-primary-900 p-2 text-left">Entreprise</th>
                <td class="p-2">
                  <CompanySelector v-model="device.code_owner"  class="col-4"/>
                </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Référence client</th>
                <td class="p-2"><InputText v-model="device.client_reference_number" class="col-4" /></td>
              </tr>
            </table>
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>
<script setup lang="ts">
import {onMounted, ref, toRefs, watch} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
import Device from "@/models/device";
import CompanySelector from "@/components/company/CompanySelector.vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const visible = ref(false)
const deviceStore = useDeviceStore();

const props = defineProps({
  device : {
    type: Device,
    required: true
  }
});

const {device} = toRefs(props);
const loading = ref(false);

let selectedDeviceId = null;

let deviceCopy = JSON.parse(JSON.stringify(device.value)); // Copie profonde de la machine actuelle

const cancelChanges = () => {
  // Restaurer les valeurs de device à partir de la copie
  Object.assign(device.value, JSON.parse(JSON.stringify(deviceCopy)));
};

const saveDevice = async () => {
  loading.value = true;
  await deviceStore.updateDevice(device.value.id, device.value);
  loading.value = false;
  window.location.reload()
};

const deleteDevice = async () => {
  await deviceStore.deleteDevice(device.value.id);
};

const showTemplate = () => {
  if (!visible.value) {
    toast.add({
      severity: 'warn',
      summary: 'Voulez-vous supprimer cette machine?',
      detail: 'Proceed to confirm',
      group: 'bc',
    });
    visible.value = true;
  }
};

const onConfirm = () => {
  toast.removeGroup('bc');
  deleteDevice()
  visible.value = false;
  window.location.reload();
}

const onReject = () => {
  toast.removeGroup('bc');
  visible.value = false;
}

const onClose = () => {
  visible.value = false;
}

watch(
    // Surveiller le changement de l'ID de la machine sélectionnée
    () => device.value.id,
    (newDeviceId) => {
      if (newDeviceId !== selectedDeviceId) {
        // Si l'ID de la machine a changé, copier la nouvelle machine
        deviceCopy = JSON.parse(JSON.stringify(device.value));
        selectedDeviceId = newDeviceId; // Mettre à jour l'ID de la machine sélectionnée
      }
    }
);
</script>

