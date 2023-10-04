<template>
  <div>
    <div class="flex align-items-center gap-6">
      <RouterLink :to="{name: RouteName.dashboardPlanning}">
        <Button label="Planning" />
      </RouterLink>
      <RouterLink :to="{name: RouteName.allTickets}">
        <Button label="Tickets" />
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import {RouteName} from "@/router";

</script>