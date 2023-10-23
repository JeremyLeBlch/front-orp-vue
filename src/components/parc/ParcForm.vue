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
              <td class="p-2"><InputText v-model="formDevice.code_owner" class="col-9" /></td>
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
<script lang="ts">
import {onMounted, ref, toRefs, watch} from 'vue';
import {useDeviceStore} from "@/stores/device-store";
import Device from "@/models/device";



export default {
  setup(props, {emit}) {
    const cancelForm = () => {
      emit("cancel");
    };

    const deviceStore = useDeviceStore();

    const formDevice = ref({
      engine_type: "",
      brand: "",
      model: "",
      serial_number: "",
      client_reference_number: "",
      code_owner:"",
    });

    const createNewDevice = () => {
      deviceStore.createDevice(formDevice.value)
          .then(() => {
            console.log("Machine creer")
            emit("success");
          })
          .catch((error) => {
            console.error("Erreur lors de la création de la machine : ", error);
          });
    };

    return {
      cancelForm,
      formDevice,
      createNewDevice,
    };
  },
};



</script>

