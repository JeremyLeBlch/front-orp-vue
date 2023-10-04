<template>
  <div class="grid">
    <!--div v-for="ticket in ticketStore.tickets" :key="ticket.id" class="bg-gray-200 p-4 rounded max-w-3">
      <div>{{ ticket.id }}</div>
      <div>{{ ticket.status }}</div>
    </div-->

    <div class="col-3">
      <DataTable :value="ticketStore.tickets">
        <Column field="id" header="ID" />
        <Column field="status" header="status" />
      </DataTable>
    </div>
    <div class="col-9 bg-gray-800">
      Partie ticket
    </div>
  </div>
</template>
<script setup lang="ts">
import {useTicketStore} from "@/stores/ticket-store";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth-store";

const authStore = useAuthStore();
const ticketStore = useTicketStore();

onMounted(() => {
  ticketStore.getTickets(authStore.user);
});

/*
- 2 : les afficher
- 3 : refacto + composants
 */

</script>
<style scoped>

</style>