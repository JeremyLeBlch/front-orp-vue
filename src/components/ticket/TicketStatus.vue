<template>
  <Tag :severity="tagSeverity(props.status)" class="ml-2">{{ translate(props.status) }}</Tag>
</template>
<script setup lang="ts">

const props = defineProps({
  status: String
});

const tagSeverity = (status) => {
  switch (status) {
    case 'closed':
      return 'danger';
    case 'in_progress':
      return 'warning';
    case 'open':
      return 'success';
    default:
      return 'info';
  }
};

const translate = (status) => {
  switch (status) {
    case 'closed':
      return 'Fermé';
    case 'in_progress':
      return 'En cours';
    case 'open':
      return 'Ouvert';
    default:
      return 'Inconnu';
  }
};
</script>