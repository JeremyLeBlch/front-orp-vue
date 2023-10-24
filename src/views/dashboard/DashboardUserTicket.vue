<template>
  <div class="flex flex-column gap-4 md:flex-row">
    <div class="left-panel ">
      <DataTable :value="ticketStore.tickets" @row-click="onRowSelect">
        <Column field="status" header="Status">
          <template #body="{ data }">
            <TicketStatus :status="data.status"/>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="flex-grow-1 h-min">
      <TicketDetail :ticket="selectedTicket" v-if="selectedTicket"/>
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

const authStore = useAuthStore();
const ticketStore = useTicketStore();
const deviceStore = useDeviceStore();

const selectedTicket = ref<Ticket>(null);

const onRowSelect = (event : any) => {
  selectedTicket.value = event.data;
  console.log("Selected Ticket ID:", selectedTicket.value.id);
};


// const ticketSort = computed(() => {
//   const sortedTickets = ticketStore.tickets.sort((a, b) => a.id - b.id);
//   return sortedTickets;
// });


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
