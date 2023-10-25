<template>
  <div>
    <form @submit="createNewDevice">
      <div class="flex flex-row">
        <div class="flex-grow-1">
          <table class="w-full">
            <tr>
              <th class="bg-primary-900 p-2 text-left">Type</th>
              <td class="p-2"><InputText v-model="formDevice.engine_type" class="col-9"/></td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Marque</th>
              <td class="p-2"><InputText v-model="formDevice.brand" class="col-9"/></td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Modèle</th>
              <td class="p-2"><InputText v-model="formDevice.model" class="col-9"/></td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Numéro de Série</th>
              <td class="p-2"><InputText v-model="formDevice.serial_number" class="col-9" /></td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Référence client</th>
              <td class="p-2"><InputText v-model="formDevice.client_reference_number" class="col-9" /></td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Propriétaire</th>
              <td class="p-2">
                <InputNumber v-model="formDevice.code_owner" class="col-9" />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="mx-auto">
        <Button type="button" label="Enregistrer" icon="pi pi-check"  @click="createNewDevice"
                  class="m-4" severity="success"/>
        <Button type="button" label="Annuler" icon="pi pi-history" class="m-4" @click="cancelForm"/>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
import Device from "@/models/device";

const deviceStore = useDeviceStore();

const emit = defineEmits(["cancel","success"]);

const formDevice = ref<Partial<Device>>({
  engine_type: "",
  brand: "",
  model: "",
  serial_number: "",
  client_reference_number: "",
  code_owner: null,
});

const createNewDevice = async () => {
  try {
    await deviceStore.createDevice(formDevice.value);
    console.log("Machine creer");
    emit("success");
  } catch (err){
    console.error("Erreur lors de la création de la machine : ", err);
  }
};

const cancelForm = () => {
  emit("cancel");
};

</script>

