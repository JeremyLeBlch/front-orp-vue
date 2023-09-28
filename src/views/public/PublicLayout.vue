<template>
    <div class="text-center">
        <LogoOrp/>
    </div>

    {{ authStore.user?.email ?? "offline" }}

    <RouterLink :to="{name: RouteName.dashboard}">
        <Button label="Dashboard" />
    </RouterLink>

    <RouterView />
</template>
<script setup lang="ts">
import {RouteName} from "@/router";
import LogoOrp from "@/components/common/LogoOrp.vue";
import {useAuthStore} from "@/stores/auth-store";

const authStore = useAuthStore();

</script>
