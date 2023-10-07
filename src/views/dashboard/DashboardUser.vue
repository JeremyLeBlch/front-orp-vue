<template>
  <div class="flex flex-row gap-4">
    <div class="left-panel">
      <DataTable :value="userStore.users" @row-click="onRowSelect">
        <Column field="id" header="ID" class="border-solid"/>
      </DataTable>
<!--      v companycode -> <DataTable :value="deviceStore.devices" @row-click="onRowSelect">-->
<!--        <Column field="id" header="ID" class="border-solid"/>-->
<!--        <Column field="engine_type" header="Type d'engin"/>-->
<!--      </DataTable>-->
    </div>
    <div class="flex-grow-1 h-min">
      <USerDetail :user="selectedUser" v-if="selectedUser"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from "@/stores/user-store";
import {useAuthStore} from "@/stores/auth-store";
import User from "@/models/user";
import USerDetail from "@/components/user/USerDetail.vue";

const authStore = useAuthStore();
const userStore = useUserStore();

const selectedUser = ref<User>(null);

const onRowSelect = (event) => {
  selectedUser.value = event.data;
};

onMounted(() => {
  userStore.getUsers(authStore.user);
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
