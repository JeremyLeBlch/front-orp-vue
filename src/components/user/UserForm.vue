<template #content>
  <form @submit="saveUser">
    <div class="flex flex-row">
      <div class="flex-grow-1">
        <table v-if="userStore.user" class="w-full">
          <tr>
            <th class="bg-primary-900 p-2 text-left">ID</th>
            <td class="p-2">{{userStore.user.id}}</td>
          </tr>
          <tr>
            <th class="bg-primary-900 p-2 text-left">Entreprise</th>
            <td class="p-2"><InputText v-model="user.company_code" class="col-4"/></td>
          </tr>
          <tr>
            <th class="bg-primary-900 p-2 text-left">Prénom</th>
            <td class="p-2"><InputText v-model="userStore.user.first_name" class="col-4" /></td>
          </tr>
          <tr>
            <th class="bg-primary-900 p-2 text-left">Nom</th>
            <td class="p-2"><InputText v-model="userStore.user.last_name" class="col-4" /></td>
          </tr>
          <tr>
            <th class="bg-primary-900 p-2 text-left">Email</th>
            <td class="p-2"><InputText v-model="userStore.user.email" class="col-4"/></td>
          </tr>
          <tr>
            <th class="bg-primary-900 p-2 text-left">Adresse</th>
            <td class="p-2"><InputText v-model="userStore.user.address" class="col-4" /></td>
          </tr>
          <tr>
            <th class="bg-primary-900 p-2 text-left">Photo de profil</th>
            <td class="p-2"><img :src="userStore.user.profil_picture_url" alt="Photo de profil" width="250" />
              <Button type="button" label="Modifier l'URL" @click="toggleImageUrlInput" class="p-button-success m-2" />
              <div v-if="showImageUrlInput" class="p-inputgroup">
                          <span class="p-inputgroup-addon">
                            <label for="imageUrlInput">URL :</label>
                          </span>
                <InputText
                    id="imageUrlInput"
                    v-model="newImageUrl"
                    class="col-4"
                    placeholder="Entrez l'URL de la photo de profil"
                />
              </div>
              <Button
                  type="button"
                  label="Mettre à jour"
                  @click="updateProfilePicture"
                  class="p-button-success m-2"
                  v-if="showImageUrlInput"
              />
            </td>
          </tr>
        </table>
        <div v-else> Chargement en cours</div>
      </div>
    </div>
    <div class="mx-auto">
      <Button type="button" label="Enregistrer" icon="pi pi-check" :loading="loading" @click="saveUser"
              class="m-4" severity="success"/>
      <Button type="button" label="Annuler les changements" icon="pi pi-history" class="m-4"/>
      <Button type="button" label="Supprimer" icon="pi pi-times" severity="danger" class="m-4"/>
    </div>
  </form>
</template>

<script setup lang="ts">

import {onMounted, ref, toRefs, watch} from 'vue';
import {useUserStore} from "@/stores/user-store";
// v pour companystore
import {useAuthStore} from "@/stores/auth-store";

import User from "@/models/user";



const authStore = useAuthStore();
const userStore = useUserStore();

const props = defineProps({
  user : {
    type: User,
    required: true
  }
});

const {user} = toRefs(props);

function refreshUser () {
  selectedRole.value = user.value.user_role;
  userStore.getUserById(user.value.id);
}

watch(user, () => {
  // v companystore -> companyStore.getUsers(user.value.company_code);
  refreshUser();
});

const active = ref(null);

const loading = ref(false);

const saveUser = async () => {
  loading.value = true;
  loading.value = false;
};

onMounted(() => {
  userStore.getUsers(authStore.user);
  refreshUser();
});

const selectedRole = ref(null);
const userRoles = userStore.userRoles;

const newImageUrl = ref('');
const updateProfilePicture = () => {
  userStore.user.profil_picture_url = newImageUrl.value;
  newImageUrl.value = ''; // Réinitialisez le champ de saisie après la mise à jour
  showImageUrlInput.value = false;
};
const showImageUrlInput = ref(false);
const toggleImageUrlInput = () => {
  showImageUrlInput.value = !showImageUrlInput.value;
};
</script>
