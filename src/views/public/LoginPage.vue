<template>
  <div class="flex flex-column justify-content-center">
    <div class="card flex justify-content-center">

      <div v-if="!authStore.user">
        <form @submit.prevent="login" class="flex flex-column gap-2">
          <label for="value">Email</label>
          <InputText id="value" v-model="email" type="text"/>

          <label for="password">Mot de passe</label>
          <Password v-model="password" toggleMask/>

          <Button type="submit" label="Se connecter" class="m-4"/>
        </form>
      </div>
      <div v-else>
        <div>
          {{ authStore.user.fullName }}
        </div>
        <Button label="logout" @click="authStore.logout"/>
      </div>
      
      <Toast/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from "@/stores/auth-store";

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const login = async () => {
  await authStore.login(email.value, password.value);
}

</script>
