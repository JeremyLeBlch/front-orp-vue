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
          <Button type="button" label="Annuler les changements" icon="pi pi-history" class="m-4" @click="cancelChanges"/>
          <Toast position="bottom-center" group="bc" @close="onClose">
            <template #message="slotProps">
              <div class="flex flex-column align-items-center" style="flex: 1">
                <div class="text-center">
                  <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
                  <div class="font-bold text-xl my-3">{{ slotProps.message.summary }}</div>
                </div>
                <div class="flex gap-2">
                  <Button severity="success" label="Yes" @click="onConfirm()"></Button>
                  <Button severity="secondary" label="No" @click="onReject()"></Button>
                </div>
              </div>
            </template>
          </Toast>
          <Button type="button" label="Supprimer" icon="pi pi-times" severity="danger" class="m-4" :loading="loading" @click="showTemplate"/>
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
import { useToast } from "primevue/usetoast";

const toast = useToast();
const visible = ref(false)
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

const originalUser = ref(JSON.parse(JSON.stringify(user.value)));
const cancelChanges = () => {
  Object.assign(user.value, JSON.parse(JSON.stringify(originalUser.value)));
  newImageUrl.value = '';
  showImageUrlInput.value = false;
};

const saveUser = async () => {
  loading.value = true;
  await userStore.saveUser(user.value.id, user.value);
  loading.value = false;
  window.location.reload()
};

const updateProfilePicture = () => {
  user.value.profil_picture_url = newImageUrl.value;
  newImageUrl.value = '';
  showImageUrlInput.value = false;
};

const toggleImageUrlInput = () => {
  showImageUrlInput.value = !showImageUrlInput.value;
};



const deleteUser = async () => {
  await userStore.deleteUser(user.value.id);
};

const showTemplate = () => {
  if (!visible.value) {
    toast.add({ severity: 'warn', summary: 'voules-vous supprimer cet utilisateur?', detail: 'Proceed to confirm', group: 'bc' });
    visible.value = true;
  }
};

const onConfirm = () => {
  toast.removeGroup('bc');
  deleteUser()
  visible.value = false;
  window.location.reload();
}

const onReject = () => {
  toast.removeGroup('bc');
  visible.value = false;
}

const onClose = () => {
  visible.value = false;
}
</script>
