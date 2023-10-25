<template >
      <form @submit="createNewTicket">
        <div class="flex-grow-1">
          <div class="w-full">
            <Dropdown v-model="formTicket.emergency_degree" :options="emergency" optionLabel="name" optionValue="code" placeholder="Niveau d'urgence" class="md:w-14rem" />
          </div>

          <Divider align="center" type="dotted">
            <b>Type d'intervention</b>
          </Divider>
          <div>
            <Dropdown v-model="selectedType" :options="type" optionLabel="name" optionValue="code" placeholder="selectionner le type" class="md:w-14rem" />
          </div>

          <!-- MACHINE -->
          <Divider align="center" type="dotted">
            <b>Concerne</b>
          </Divider>
          <div>
            <table class="w-full">
              <tr>
                <th class="bg-primary-900 p-2 text-left">Machine</th>
                <DeviceSelector v-model="formTicket.devices"  class="col-12"/>
              </tr>
            </table>
          </div>
        </div>

        <Divider align="center" type="dotted">
          <b>Informations</b>
        </Divider>

        <div>
          <label for="subject" class="p-2 block">Travaux demandés</label>
          <Textarea v-model="formTicket.comments" rows="5" cols="30" id="subject" class="w-full"/>
        </div>
        <div class="mt-4">
          <label for="address" class="p-2 block">Adresse</label>
          <InputText v-model="formTicket.location" placeholder="Adresse du chantier" id="address" class="w-full"/>
        </div>

        <Divider align="center" type="dotted">
          <b>Intervention</b>
        </Divider>


        <div class="flex flex-row">
          <div class="mr-2">
            <label for="calendar-24h" class="font-bold block mb-2 p-2"> Date d'intervention souhaitée </label>
            <Calendar id="calendar-24h" v-model="intervention_start" showIcon showTime hourFormat="24"/>
          </div>
        </div>

        <Divider/>

        <div class="card ">
          <div class="flex justify-content-around">
            <Button type="button" label="Annuler" icon="pi pi-history" class="m-1 align-items-center justify-content-center" @click="cancelForm"/>
            <Button type="button" label="Enregistrer" icon="pi pi-check" :loading="loading" @click="createNewTicket"
                    class="m-1 align-items-center justify-content-center" severity="success"/>
          </div>
        </div>
      </form>
      <Dialog v-model:visible="visible" modal header="Sauvegarde" :style="{ width: '50vw' }">
        <p>
          Le ticket a bien été enregistré !
        </p>
      </Dialog>
    </template>
<script setup lang="ts">
import {computed, onMounted, ref, toRefs, watch} from 'vue';
import {useTicketStore} from "@/stores/ticket-store";
import {useDeviceStore} from "@/stores/device-store";
import {useAuthStore} from "@/stores/auth-store";
import Ticket from "@/models/ticket";
import {useUserStore} from "@/stores/user-store";
import DeviceSelector from "@/components/parc/DeviceSelector.vue";

const authStore = useAuthStore();
const ticketStore = useTicketStore();
const deviceStore = useDeviceStore();
const userStore = useUserStore();

const selectedType = ref(null);
const intervention_start = ref(null);

const loading = ref(false);
const visible = ref(false);

const formTicket = ref({
  emergency_degree:0,
  status:"open",
  comments: "",
  location: "",
  intervention_start: intervention_start.value,
  code_type: selectedType.value,
  code_machine:0,
  code_client: authStore.user.id
});

const {ticket} = toRefs(props);
const props = defineProps({
  ticket: {
    type: Ticket,
    required: true
  }
});

const type = ref([
  {name: 'Revision', code: 1},
  {name: 'Climatisation', code: 2},
  {name: 'Réparation', code: 3},
]);

const emergency = ref([
  {name: 'Non-urgent', code: 1},
  {name: 'Modéré', code: 2},
  {name: 'Urgent', code: 3},
]);

onMounted(() => {
  refreshExtra();
});

watch(ticket, (newTicket) => {
  refreshExtra();
  formTicket.value = { ...newTicket };
});

function transformDate(){
  if (formTicket.value.intervention_start){
    formTicket.value.intervention_start = new Date(formTicket.value.intervention_start);
  }
}
async function createNewTicket() {
  if (formTicket.value.intervention_start){
    const dateStart = new Date(formTicket.value.intervention_start );
    dateStart.toISOString();
    emit("success");
  }
  await ticketStore.createTicket(formTicket.value);
  visible.value = true;
}

const emit = defineEmits(["success","cancel"]);
const cancelForm = () => {
  emit("cancel");
};

function refreshExtra() {
  deviceStore.getDeviceById(formTicket.value.code_machine);
  userStore.getUserById(formTicket.value.code_client);
  transformDate();
}

</script>
<style scoped>

</style>