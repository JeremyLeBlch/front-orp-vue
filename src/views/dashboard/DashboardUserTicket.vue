<template>
  <div class="flex flex-column gap-4 md:flex-row">
    <div class="left-auto ">
      <DataTable :value="ticketStore.tickets" @row-click="onRowSelect">
        <Column field="status" header="Status">
          <template #body="{ data }">
            <TicketStatus :status="data.status"/>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="right-auto ">

    </div>
    <div class="flex-grow-1 h-min">
      <TicketDetail :ticket="selectedTicket" v-if="selectedTicket"/>
      <div class="flex justify-content-center">
        <Button label="+"  @click="visible = true" v-if="showNewTicketButton" />
        <Toast />
      </div>
      <Dialog v-model:visible="visible" modal header="Nouveau ticket" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <TicketForm @cancel="closeForm" @success="onTicketCreated" />
      </Dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useTicketStore} from "@/stores/ticket-store";
import {useDeviceStore} from "@/stores/device-store";
import {useAuthStore} from "@/stores/auth-store";
import Ticket from "@/models/ticket";
import TicketStatus from "@/components/ticket/TicketStatus.vue";
import TicketDetail from "@/components/ticket/TicketByClient.vue";
import { useToast } from 'primevue/usetoast';
import TicketForm from "@/components/ticket/TicketForm.vue";

const visible = ref(false);
const showNewTicketButton = ref(true);
const authStore = useAuthStore();
const ticketStore = useTicketStore();
const deviceStore = useDeviceStore();

const selectedTicket = ref<Ticket>(null);
const toast = useToast();
const onRowSelect = (event : any) => {
  selectedTicket.value = event.data;
  showNewTicketButton.value = false;
};

const closeForm = () => {
  visible.value = false;
};
const showCreate = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Machine créé avec succès', life: 3000 });
};

const onTicketCreated = () => {
  closeForm();
  showCreate();
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
