<template>
  <div class="flex flex-column justify-content-center">
    <p class="m-8 p-4 text-2xl bg-blue-900 border-round-sm text-center hidden sm:block">
      Bienvenue sur ORP, le futur de la gestion des services clients à portée de main. Simplifiez la gestion de vos tickets
      d'incidents grâce à notre solution innovante. 
      Découvrez comment ORP redéfinit la gestion du support client pour une expérience plus moderne et performante, taillée sur mesure pour les
      entreprises de proximité et les artisans du quotidien.
    </p>
  </div>
  <footer class="flex justify-content-center ">
    <RouterLink :to="{name: RouteName.login}">
      <Button label="Connexion" />
    </RouterLink>
    </footer>
</template>
<script setup lang="ts">
import {RouteName} from "@/router";

</script>
