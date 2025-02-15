<template>
  <div class="flex flex-row gap-4">
    <div class="left-panel">
      <DataTable :value="userSort" @row-click="onRowSelect">
        <Column field="id" header="ID" class="border-solid"/>
        <Column field="fullName()" header="Nom d'utilisateur">
          <template #body="{data}">
            {{ (data as User).fullName() }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="flex-grow-1 h-min">
      <UserDetail :user="selectedUser" v-if="selectedUser"/>
      <Button label="nouvel utilisateur" icon="pi pi-external-link" @click="visible = true" v-if="showNewUserButton"/>
      <Toast />
      <Dialog v-model:visible="visible" modal header="Créer un nouvel utilisateur" :style="{ width: '50vw' }">
        <UserForm @cancel="closeForm" @success="onUserCreated" @delete="onUserDelete" />
      </Dialog>
    </div>

  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useUserStore} from "@/stores/user-store";
import {useAuthStore} from "@/stores/auth-store";
import User from "@/models/user";
import UserDetail from "@/components/user/UserDetail.vue";
import UserForm from "@/components/user/UserForm.vue";
import { useToast } from 'primevue/usetoast';

const showNewUserButton = ref(true);
const toast = useToast();
const authStore = useAuthStore();
const userStore = useUserStore();
const selectedUser = ref<User>(null);
const visible = ref(false);
const onRowSelect = (event) => {
  selectedUser.value = event.data;
  showNewUserButton.value = false;
};

const closeForm = () => {
  visible.value = false;
};
const showCreate = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Utilisateur créé avec succès', life: 3000 });
};
const showDelete = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Utilisateur créé avec succès', life: 3000 });
};
const onUserCreated = () => {
  closeForm();
  showCreate();
};
const onUserDelete = () =>{
  closeForm();
  showDelete();
}

const userSort = computed(() => {
  const sortedUsers = userStore.users.sort((a, b) => a.id - b.id);
  return sortedUsers;
});

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
