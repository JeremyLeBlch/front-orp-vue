<template>
    <div>
        <RouterLink :to="{name: RouteName.dashboardAdmin}">
            <Button label="Admin" />
        </RouterLink>
        <RouterLink :to="{name: RouteName.dashboardClient}">
            <Button label="Client" />
        </RouterLink>
        <RouterLink :to="{name: RouteName.dashboardTechnician}">
            <Button label="Tech" />
        </RouterLink>
        <RouterLink :to="{name: RouteName.dashboardPlanning}">
          <Button label="Planning" />
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
import {RouteName} from "@/router";

</script>