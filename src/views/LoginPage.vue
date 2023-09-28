// @ts-nocheck
<script setup lang="ts">
import logoORP from '../components/logoOrp.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import jwt from 'jsonwebtoken';
import {ref} from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();


const email = ref('');
const password = ref('');


const login = async () => {
  const user = {
    email: email.value,
    password: password.value
  };
  await fetch('https://orp-back.onrender.com/api/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(blob => blob.json())
      .then(data => {
        if (data.token) {
          console.log(data);
          localStorage.setItem('token', data.token);
          router.push('/app/technician');
        } else {
          console.log("erreur d'authentification");
        }
      })
}
</script>

<template>
  <div class="flex flex-column justify-content-center">
    <logoORP/>
    <div class="card flex justify-content-center">
      <form @submit.prevent="login" class="flex flex-column gap-2">
        <label for="value">Email</label>
        <InputText id="value" v-model="email" type="text"/>
        <label for="password">Mot de passe</label>
        <Password v-model="password" toggleMask/>
        <Button type="submit" label="Se connecter" class="m-4"/>
      </form>
      <Toast/>
    </div>
  </div>


</template>

<style scoped>

</style>