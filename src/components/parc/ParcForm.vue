<!--    <template #content>-->
<!--      <form @submit="createDevice">-->
<!--        <div class="flex flex-row">-->
<!--          <div class="flex-grow-1">-->
<!--            <table class="w-full">-->
<!--              <tr>-->
<!--                <th class="bg-primary-900 p-2 text-left">Type</th>-->
<!--                <td class="p-2"><InputText v-model="formDevice.brand" class="col-9"/></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <th class="bg-primary-900 p-2 text-left">Type</th>-->
<!--                <td class="p-2"><InputText v-model="formDevice.engine_type" class="col-9"/></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <th class="bg-primary-900 p-2 text-left">Marque</th>-->
<!--                <td class="p-2"><InputText v-model="formDevicedevice.brand" class="col-9"/></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <th class="bg-primary-900 p-2 text-left">Modèle</th>-->
<!--                <td class="p-2"><InputText v-model="formDevicedevice.model" class="col-9"/></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <th class="bg-primary-900 p-2 text-left">Numéro de Série</th>-->
<!--                <td class="p-2"><InputText v-model="formDevice.serial_number" class="col-9" /></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <th class="bg-primary-900 p-2 text-left">Référence client</th>-->
<!--                <td class="p-2"><InputText v-model="formDevice.client_reference_number" class="col-9" /></td>-->
<!--              </tr>-->
<!--            </table>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mx-auto">-->
<!--          <Button type="button" label="Enregistrer" icon="pi pi-check" :loading="loading" @click="createDevice"-->
<!--                  class="m-4" severity="success"/>-->
<!--          <Button type="button" label="Annuler" icon="pi pi-history" class="m-4" @click="cancelForm"/>-->
<!--        </div>-->

<!--      </form>-->
<!--    </template>-->
<!--<script setup lang="ts">-->
<!--import {onMounted, ref, toRefs, watch} from 'vue';-->
<!--// import {useDeviceStore} from "@/stores/device-store";-->
<!--// import Device from "@/models/device";-->

<!--// const deviceStore = useDeviceStore();-->

<!--// export default {-->
<!--//   setup(props, { emit }) {-->
<!--//     const cancelForm = () => {-->
<!--//       emit("cancel");-->
<!--//     };-->
<!--//     return {-->
<!--//       cancelForm,-->
<!--//     };-->
<!--//   },-->
<!--//   data() {-->
<!--//     return {-->
<!--//       formDevice: {-->
<!--//         engine_type: "",-->
<!--//         brand: "",-->
<!--//         model: "",-->
<!--//         serial_number: "",-->
<!--//         client_reference_number: "",-->
<!--//         code_owner: "",-->
<!--//         code_creator: "user",-->
<!--//       }-->
<!--//     };-->
<!--//   },-->
<!--//   methods: {-->
<!--//     createNewDevice() {-->
<!--//       this.device.createDevice(this.formDevice)-->
<!--//           .then(() => {-->
<!--//             console.log("Machine creer")-->
<!--//           })-->
<!--//           .catch((error) => {-->
<!--//             // Gérez les erreurs ici-->
<!--//             console.error("Erreur lors de la création de la machine : ", error);-->
<!--//           });-->
<!--//     },-->
<!--//   },-->
<!--// };-->

<!--const props = defineProps({-->
<!--  device : {-->
<!--    type: Device,-->
<!--    required: true-->
<!--  }-->
<!--});-->

<!--const {device} = toRefs(props);-->
<!--const loading = ref(false);-->
<!--// const interventionStart = ref(null);-->
<!--// const interventionEnd = ref(null);-->

<!--onMounted(() => {-->
<!--  refreshParc();-->
<!--});-->

<!--watch(device, () => {-->
<!--  refreshParc();-->
<!--});-->

<!--const saveDevice = async () =>{-->
<!--  loading.value = true;-->
<!--  await deviceStore.updateDevice(device.value.id, device.value);-->
<!--  loading.value = false;-->
<!--};-->

<!--function refreshParc () {-->
<!--  deviceStore.getDeviceById(device.value.id);-->
<!--}-->

<!--const cancelForm = () => {-->
<!--      emit("cancel");-->
<!--    };-->
<!--</script>-->

