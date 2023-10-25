<template>
  <div>
    <form @submit.prevent="createNewUser">
      <div class="flex flex-row">
        <div class="flex-grow-1">
          <table class="w-full">
            <tr>
              <th class="bg-primary-900 p-2 text-left">Prénom</th>
              <td class="p-2">
                <InputText v-model="formUser.first_name" class="col-9" required />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Nom de famille</th>
              <td class="p-2">
                <InputText v-model="formUser.last_name" class="col-9" required />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Email</th>
              <td class="p-2">
                <InputText v-model="formUser.email" class="col-9" required />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Adresse</th>
              <td class="p-2">
                <InputText v-model="formUser.address" class="col-9" required />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Password</th>
              <td class="p-2">
                <Password v-model="formUser.password" class="col-9" required toggleMask />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Photo de profil</th>
              <td class="p-2">
                <InputText v-model="formUser.profil_picture_url" class="col-9" placeholder="Url" />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Rôle de l'utilisateur</th>
              <td class="p-2">
                <UserRoleSelector v-model="formUser.user_role" />
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Code de l'entreprise</th>
              <td class="p-2">
                <CompanySelector v-model="formUser.company_code" class="w-full"/>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="mx-auto">
        <Button type="button" label="Enregistrer" icon="pi pi-check" :loading="loading" @click="createNewUser"
                class="m-4" severity="success"/>
        <Button type="button" label="Annuler" icon="pi pi-history" class="m-4" @click="cancelForm"/>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useUserStore} from "@/stores/user-store";
import {onMounted, ref} from 'vue';
import {useAuthStore} from "@/stores/auth-store";
import User from "@/models/user";
import CompanySelector from "@/components/company/CompanySelector.vue";
import UserRoleSelector from "@/components/user/UserRoleSelector.vue";

const userStore = useUserStore();
const authStore = useAuthStore();

const emit = defineEmits(["cancel", "success"]);

const loading = ref(false);

const formUser = ref<Partial<User>>({
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  password: "",
  profil_picture_url: "",
  user_role: "",
  active: true
});

onMounted(() => {
  userStore.getUsers(authStore.user);
});

const cancelForm = () => {
  emit("cancel");
};

const createNewUser = async () => {
  try {
    loading.value = true;
    await userStore.createUser(formUser.value);
    console.log("utilisateur créé");
    emit("success");
  } catch (error){
    console.error("Erreur lors de la création de l'utilisateur : ", error);
  } finally {
    loading.value = false;
  }
};

</script>
