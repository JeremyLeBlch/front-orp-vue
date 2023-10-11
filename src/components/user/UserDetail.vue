<template>
  <template v-if="!user">
    <ProgressSpinner/>
  </template>
  <Card class="h-min" v-else>
    <template #title>
      <div class="flex flex-row justify-content-between">
        <div class="flex align-items-center">
          <div>{{ user?.fullName() }}</div>
        </div>
        <div class="card flex justify-content-center">
          <UserRoleSelector v-model="user.user_role"/>
        </div>
      </div>
    </template>
    <template #content>
      <form @submit="saveUser">
        <div class="flex flex-row">
          <div class="flex-grow-1">
            <table class="w-full">
              <tr>
                <th class="bg-primary-900 p-2 text-left">ID</th>
                <td class="p-2">{{ user.id }}</td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Entreprise</th>
                <td class="p-2">
                  <!--InputText v-model="user.company_code" class="col-4"/-->
                  <CompanySelector v-model="user.company_code"  class="col-4"/>
                </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Prénom</th>
                <td class="p-2">
                  <InputText v-model="user.first_name" class="col-4"/>
                </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Nom</th>
                <td class="p-2">
                  <InputText v-model="user.last_name" class="col-4"/>
                </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Email</th>
                <td class="p-2">
                  <InputText v-model="user.email" class="col-4"/>
                </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Adresse</th>
                <td class="p-2">
                  <InputText v-model="user.address" class="col-4"/>
                </td>
              </tr>
              <tr>
                <th class="bg-primary-900 p-2 text-left">Photo de profil</th>
                <td class="p-2"><img :src="user.profil_picture_url" alt="Photo de profil" width="250"/>
                  <Button type="button" label="Modifier l'URL" @click="toggleImageUrlInput"
                          class="p-button-success m-2"/>
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

  </Card>
</template>
<script setup lang="ts">
import {ref, toRefs} from 'vue';
import {useUserStore} from "@/stores/user-store";
import UserRoleSelector from "@/components/user/UserRoleSelector.vue";
import User from "@/models/user";
import CompanySelector from "@/components/company/CompanySelector.vue";

const userStore = useUserStore();

const props = defineProps({
  user: {
    type: User,
    required: true
  }
});

const {user} = toRefs(props);
const loading = ref(false);
const newImageUrl = ref('');
const showImageUrlInput = ref(false);

const saveUser = async () => {
  loading.value = true;
  await userStore.saveUser(user.value);
  loading.value = false;
};

const updateProfilePicture = () => {
  user.value.profil_picture_url = newImageUrl.value;
  newImageUrl.value = '';
  showImageUrlInput.value = false;
};

const toggleImageUrlInput = () => {
  showImageUrlInput.value = !showImageUrlInput.value;
};
</script>
