<template>
    <div class="text-center">
        <LogoOrp/>
    </div>

    <RouterView />
</template>
<script setup lang="ts">
import {RouteName} from "@/router";
import LogoOrp from "@/components/common/LogoOrp.vue";
import {useAuthStore} from "@/stores/auth-store";
import Header from "@/components/Header.vue";

const authStore = useAuthStore();

</script>
