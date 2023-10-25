<template>
  <div class="flex flex-column justify-content-center">
    <div class="card flex justify-content-center">

      <div v-if="!authStore.user">
        <Card>
          <template #title>
            Connexion
          </template>
          <template #content>
            <form @submit.prevent="login" class="flex flex-column gap-2">
              <label for="value" class="">Email</label>
              <InputText id="value" v-model="email" type="text"/>

              <label for="password" class="mt-2">Mot de passe</label>
              <Password v-model="password" toggleMask/>

              <Button type="submit" label="Se connecter" class="m-4"/>
            </form>
          </template>
        </Card>

        <Card class="mt-6">
          <template #title>
            DEV ZONE
          </template>
          <template #content>
            <div class="flex flex-row gap-4">
              <div v-for="(users, key) in devAuthUsers" :key="key" class="flex-grow-1">
                <h3>{{key}}</h3>
                <div v-for="user in users" :key="user.email">
                  <Button size="small" :label="user.role.toUpperCase()" @click="selectDevUser(user)" class="mb-2 w-full" severity="info"/>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div v-else>
        <Card>
          <template #title>
            {{ authStore.user.fullName() }}
          </template>
          <template #content>
            <div class="min-w-20rem">
              <p>Vous êtes actuellement connecté</p>

              <RouterLink :to="{name: RouteName.dashboard}" class="block w-full">
                <Button label="Dashboard" class=" w-full" />
              </RouterLink>

              <Button outlined label="Déconnexion" @click="authStore.logout" class="block w-full mt-6" severity="danger"/>
            </div>

          </template>
        </Card>

      </div>

      <Toast/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from "@/stores/auth-store";
import {RouteName} from "@/router";

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const devAuthUsers = ref({
  jeremy: [
    {
      email: "Aliya.Cummings@yahoo.com",
      password: "%4_N7o6fTk",
      role: "intervention"
    },
    {
      email: "Josiah.Cormier33@gmail.com",
      password: "#8rwAB2qGA",
      role: "user"
    },
    {
      email: "Clarabelle84@yahoo.com",
      password: "*3av8MTCp7",
      role: "planning"
    },
    {
      email: "Sheldon58@hotmail.com",
      password: "%9cjKuPNpv",
      role: "admin"
    },
  ],
  jeb: [
    {
      email: "Lucienne16@yahoo.com",
      password: "Qwerty1234!",
      role: "intervention"
    },
    {
      email: "JEB@gmail.fr",
      password: "Qwerty1234!",
      role: "user"
    },
    {
      email: "Damian_Daugherty71@yahoo.com",
      password: "Qwerty1234!",
      role: "planning"
    },
    {
      email: "Sylvan21@hotmail.com",
      password: "Qwerty1234!",
      role: "admin"
    },
  ]
});

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    email.value = "";
    password.value = "";
  } catch (err){
    // todo show error
  }
}

const selectDevUser = (user) => {
  email.value = user.email;
  password.value = user.password;
  login();
}

</script>
