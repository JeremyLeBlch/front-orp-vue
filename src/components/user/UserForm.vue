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
                <InputText v-model="formUser.password" class="col-9" required />
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
                <select v-model="formUser.user_role" class="col-9" required>
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                  <option value="intervention">Intervention</option>
                  <option value="planning">Planning</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="bg-primary-900 p-2 text-left">Code de l'entreprise</th>
              <td class="p-2">
                <InputText v-model="formUser.company_code" class="col-9" required />
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

<script>
import {useUserStore} from "@/stores/user-store";
import { ref } from "vue";
import User from "@/models/user";
import UserRoleSelector from "@/components/user/UserRoleSelector.vue";


export default {
  setup(props, { emit }) {
    const cancelForm = () => {
      emit("cancel");
    };
    return {
      cancelForm,
    };
  },
  data() {
    return {
      formUser: {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        password: "",
        profil_picture_url: "",
        user_role: "user",
        company_code: null,
      }
    };
  },
  methods: {
    createNewUser() {
      this.userS.createUser(this.formUser)
          .then(() => {
            console.log("utilisateur creer")
          })
          .catch((error) => {
            // Gérez les erreurs ici
            console.error("Erreur lors de la création de l'utilisateur : ", error);
          });
    },
  },
};
</script>







