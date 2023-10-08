<template>
  <Card v-if="ticket" class="h-min">
    <template #title>
      <div class="flex flex-row justify-content-between">
        <div class="flex align-items-center">
          <div>Ticket n°{{ ticket?.id }}</div>
          <TicketStatus :status="ticket.status"/>
        </div>
        <div class="flex align-items-center">
          <label for="rating" class="flex align-items-center pr-2 text-sm">Urgence</label>
          <Rating id="rating" v-model="ticket.emergency_degree" :cancel="false"/>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit="saveTicket">
        <div class="flex flex-row">
          <!-- MACHINE -->
          <div class="flex-grow-1">
            <h3>Machine</h3>
            <table v-if="deviceStore.device" class="w-full">
              <tr>
                <th class="bg-primary-900 p-2 text-left">ID</th>
                <td class="p-2">{{deviceStore.device.id}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Type</th>
                <td class="p-2">{{deviceStore.device.engine_type}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Marque</th>
                <td class="p-2">{{deviceStore.device.brand}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Modèle</th>
                <td class="p-2">{{deviceStore.device.model}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Référence client</th>
                <td class="p-2">{{deviceStore.device.client_reference_number}}</td>
              </tr>
            </table>
            <div v-else class="text-gray-500">Chargement en cours...</div>
          </div>

          <!-- CLIENT -->
          <div class="flex-grow-1">
            <h3>Client</h3>
            <table v-if="userStore.user">
              <tr>
                <th class="bg-primary-900 p-2 text-left">ID</th>
                <td class="p-2">{{userStore.user.id}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Nom</th>
                <td class="p-2">{{userStore.user.last_name}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Prénom</th>
                <td class="p-2">{{userStore.user.first_name}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Email</th>
                <td class="p-2">{{userStore.user.email}}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Adresse</th>
                <td class="p-2">{{userStore.user.address}}</td>
              </tr>
            </table>
            <div v-else class="text-gray-500">Chargement en cours...</div>
          </div>
        </div>

        <Divider />

        <h3>Informations</h3>
        <div>
          <label for="subject" class="p-2 block">Commentaire</label>
          <Textarea v-model="ticket.comments" rows="5" cols="30" id="subject" class="w-full"/>
        </div>
        <div class="mt-4">
          <label for="address" class="p-2 block">Adresse</label>
          <InputText v-model="ticket.location" placeholder="Adresse" id="address" class="w-full"/>
        </div>

        <Divider />

        <h3>Intervention</h3>
        <div class="flex flex-row">
          <div class="mr-2">
            <label for="calendar-24h" class="font-bold block mb-2 p-2"> Début d'intervention </label>
            <Calendar id="calendar-24h" v-model="interventionStart" showTime hourFormat="24"/>
          </div>
          <div class="">
            <label for="calendar-24h" class="font-bold block mb-2 p-2"> Fin d'intervention </label>
            <Calendar id="calendar-24h" v-model="interventionEnd" showTime hourFormat="24"/>
          </div>
        </div>

        <h3>Technicien</h3>
        <div>
          <label for="technician" class="p-2 block">Technicien affecté</label>
          <Dropdown
              id="technician"
              v-model="ticket.code_technician"
              optionLabel="label"
              optionValue="value"
              :options="tabTechnicians"/>
        </div>

        <div class="mx-auto">
          <Button type="button" label="Enregistrer" icon="pi pi-check" :loading="loading" @click="saveTicket"
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
import {useTicketStore} from "@/stores/ticket-store";
import {useDeviceStore} from "@/stores/device-store";
import {useAuthStore} from "@/stores/auth-store";

import Ticket from "@/models/ticket";
import TicketStatus from "@/components/ticket/TicketStatus.vue";
import {useUserStore} from "@/stores/user-store";

const authStore = useAuthStore();
const ticketStore = useTicketStore();
const deviceStore = useDeviceStore();
const userStore = useUserStore();

const props = defineProps({
  ticket : {
    type: Ticket,
    required: true
  }
});

const {ticket} = toRefs(props);


const interventionStart = ref(null);
const interventionEnd = ref(null);

const tabTechnicians = ref(Array.from({length: 100}, (_, i) => ({label: `Technicien #${i}`, value: i})));

const loading = ref(false);

const saveTicket = async () => {
  loading.value = true;
  // await ticketStore.updateTicket(ticket.value);
  loading.value = false;
};


onMounted(() => {
  ticketStore.getTickets(authStore.user);
  deviceStore.getDeviceById(ticket.value.code_machine);
  userStore.getUserById(ticket.value.code_client);
});

watch(ticket, () => {
  deviceStore.getDeviceById(ticket.value.code_machine);
  userStore.getUserById(ticket.value.code_client);
});

</script>
<style scoped>

</style>
