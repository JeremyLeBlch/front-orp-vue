])
<template>
  <Card class="h-min">
    <template #title>
      <div class="flex flex-row justify-content-between">
        <div class="flex align-items-center">
          <div>{{ device?.model }}</div>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit="saveDevice">
        <div class="flex flex-row">
          <div class="flex-grow-1 max-w-screen ">
            <table class="w-full">
              <tr>
                <th class="bg-primary-900 p-2 text-left">Type</th>
                <td class="p-2 col-8 md:col-4">{{ device.engine_type }} </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Marque</th>
                <td class="p-2 col-8 md:col-4">{{device.brand}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Modèle</th>
                <td class="p-2 col-8 md:col-4">{{device.model}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Numéro de Série</th>
                <td class="p-2 col-8 md:col-4">{{device.serial_number}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Entreprise</th>
                <td class="p-2 col-8 md:col-4">{{device.code_owner}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Référence client</th>
                <td class="p-2 col-8 md:col-4">{{device.client_reference_number}}</td>
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

