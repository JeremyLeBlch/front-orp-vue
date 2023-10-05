<template>
  <div class="flex flex-row">
    <div class="left-panel">
      <DataTable :value="ticketStore.tickets" @row-click="onRowSelect">
        <Column field="id" header="ID" class="border-solid"/>
        <Column field="status" header="Status"/>
      </DataTable>
    </div>

    <Card v-if="selectedTicket" class="flex-grow-1">
      <template #title>
        <div class="flex flex-row justify-content-between">
          <div class="flex align-items-center">
            <div>Ticket n°{{ selectedTicket?.id }}</div>
            <Tag :severity="tagSeverity(selectedTicket.status)" class="ml-2">{{ selectedTicket.status }}</Tag>
          </div>
          <div class="flex align-items-center">
            <label for="rating" class="flex align-items-center pr-2 text-sm">Urgence</label>
            <Rating id="rating" v-model="selectedTicket.emergency_degree" :cancel="false"/>
          </div>
        </div>
      </template>
      <template #content>
        <form @submit="onsubmit" class="mt-4">
          <div>Numéro machine : {{selectedTicket.code_machine}}</div>
          <div>Client n°{{selectedTicket.code_client}}</div>
          <div>
            <label for="subject" class="p-2 block">Commentaire</label>
            <Textarea v-model="selectedTicket.comments" rows="5" cols="30" id="subject" class="w-full"/>
          </div>
          <div class="mt-4">
            <label for="address" class="p-2 block">Adresse</label>
            <InputText v-model="selectedTicket.location" placeholder="Adresse" id="address" class="w-full"/>
          </div>
          <div class="flex flex-row mt-3">
            <div class="mr-2">
              <label for="calendar-24h" class="font-bold block mb-2 p-2"> Début d'intervention </label>
              <Calendar id="calendar-24h" v-model="interventionStart" showTime hourFormat="24" />
            </div>
            <div class="">
              <label for="calendar-24h" class="font-bold block mb-2 p-2"> Fin d'intervention </label>
              <Calendar id="calendar-24h" v-model="interventionEnd" showTime hourFormat="24" />
            </div>
          </div>
          <div class="mt-4">
            <label for="technician" class="p-2 block">Technicien affecté</label>
            <Dropdown
                id="technician"
                v-model="selectedTicket.code_technician"
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
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useTicketStore} from "@/stores/ticket-store";
import {useAuthStore} from "@/stores/auth-store";
import Ticket from "@/models/ticket";

const authStore = useAuthStore();
const ticketStore = useTicketStore();

const interventionStart = ref(null);
const interventionEnd = ref(null);

const selectedTicket = ref<Ticket>(null);
const tabTechnicians = ref(Array.from({length: 100}, (_, i) => ({label: `Technicien #${i}`, value: i})));

const loading = ref(false);

const saveTicket = async () => {
  loading.value = true;
  // await ticketStore.saveTicket(selectedTicket.value);
  loading.value = false;
};

const onRowSelect = (event) => {
  selectedTicket.value = event.data;
};

const tagSeverity = (status) => {
  switch (status) {
    case 'closed':
      return 'danger';
    case 'in_progress':
      return 'warning';
    case 'open':
      return 'success';
    default:
      return 'info';
  }
};

onMounted(() => {
  ticketStore.getTickets(authStore.user);
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