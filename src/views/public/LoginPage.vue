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
      email: "thomevictor@gmail.com",
      password: "P@ssw0rd1",
      role: "intervention"
    },
    {
      email: "legaigneurbastien@gmail.com",
      password: "P@ssw0rd1",
      role: "user"
    },
    {
      email: "clequinthomas@gmail.com",
      password: "P@ssw0rd1",
      role: "planning"
    },
    {
      email: "alexispean@gmail.com",
      password: "P@ssw0rd",
      role: "admin"
    },
  ],
  jeb: [
    {
      email: "intervention@gmail.fr",
      password: "P@ssw0rd",
      role: "intervention"
    },
    {
      email: "username@gmail.fr",
      password: "P@ssw0rd",
      role: "user"
    },
    {
      email: "planning@gmail.com",
      password: "P@ssw0rd",
      role: "planning"
    },
    {
      email: "julienespenanbaron@gmail2.com",
      password: "P@ssw0rd",
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
