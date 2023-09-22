<script setup lang="ts">
import Button from 'primevue/button';
import logoORP from '../components/logoOrp.vue'

</script>

<template>
  <div class="flex flex-column justify-content-center">
    <logoORP />
    <p class=" m-8 p-4 text-2xl	bg-blue-900	 border-round-sm	text-center hide-paragraph-on-mobile	">Bienvenue sur ORP, le futur de la gestion des services clients à portée de main. Simplifiez la gestion de vos tickets
      d'incidents grâce à notre solution innovante. Découvrez comment ORP redéfinit la gestion du support client pour une expérience plus moderne et performante, taillée sur mesure pour les
      entreprises de proximité et les artisans du quotidien.
    </p>
  </div>
  <footer class="flex justify-content-center ">
    <router-link to="/login">
      <Button label="Connexion" size="large" class="bg-blue-900 hover:bg-blue-200"/>
    </router-link>
  </footer>
</template>

<style scoped>
@media (max-width: 768px) {
  .hide-paragraph-on-mobile {
    display: none;
  }
}
</style>