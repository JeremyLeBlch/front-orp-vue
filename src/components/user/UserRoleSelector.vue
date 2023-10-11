<!--Test 4-->
<template>
    <Dropdown v-model="selected"
              :options="selectable"
              option-label="title"
              option-value="id"
              placeholder="Sélection du rôle"
              class="w-full" />
</template>
<script setup lang="ts">
import {computed, ref} from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: string }>();

const selectable = ref([
  { id: "intervention", title: "Intervention" },
  { id: "planning", title: "Planning" },
  { id: "admin", title: "Administrateur" },
  { id: "user", title: "Utilisateur" }
]);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

</script>
