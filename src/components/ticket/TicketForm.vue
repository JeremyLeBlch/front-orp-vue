<template >
      <form @submit="createNewTicket">
        <div class="flex-grow-1">
          <div class="w-full">
            <EmergencySelector v-model="formTicket.emergency_degree"/>
          </div>

          <Divider align="center" type="dotted">
            <b>Type d'intervention</b>
          </Divider>
          <div>
            <InterventionTypeSelector v-model="formTicket.code_type"/>
          </div>

          <!-- MACHINE -->
          <Divider align="center" type="dotted">
            <b>Concerne</b>
          </Divider>
          <div>
            <DeviceSelector v-model="formTicket.code_machine" class="w-full"/>
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
import InterventionTypeSelector from "@/components/ticket/InterventionTypeSelector.vue";
import {onMounted, ref} from 'vue';
import {useTicketStore} from "@/stores/ticket-store";
import {useAuthStore} from "@/stores/auth-store";
import Ticket from "@/models/ticket";
import DeviceSelector from "@/components/parc/DeviceSelector.vue";
import EmergencySelector from "@/components/ticket/EmergencySelector.vue";

const authStore = useAuthStore();
const ticketStore = useTicketStore();

const emit = defineEmits(["success","cancel"]);

const intervention_start = ref(null);
const loading = ref(false);
const visible = ref(false);

const formTicket = ref<Partial<Ticket>>({
  emergency_degree: 0,
  status: "open",
  comments: "",
  location: "",
  intervention_start: null,
  code_type: null,
  code_machine: null,
  code_client: null
});

onMounted(() => {
  formTicket.value.code_client = authStore.user.id;
  refreshExtra();
});

function transformDate(){
  if (formTicket.value.intervention_start){
    formTicket.value.intervention_start = new Date(formTicket.value.intervention_start);
  }
}
async function createNewTicket() {
  console.log(formTicket.value);
  if (formTicket.value.intervention_start){
    const dateStart = new Date(formTicket.value.intervention_start );
    dateStart.toISOString();
    emit("success");
  }
  await ticketStore.createTicket(formTicket.value);
  visible.value = true;
}

const cancelForm = () => {
  emit("cancel");
};

function refreshExtra() {
  transformDate();
}

</script>
<style scoped>

</style>