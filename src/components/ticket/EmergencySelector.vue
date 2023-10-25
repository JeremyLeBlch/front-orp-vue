<template>
    <Dropdown v-model="selected"
              :options="selectable"
              option-label="name"
              option-value="code"
              placeholder="Niveau d'urgence"
              class="w-full" />
</template>
<script setup lang="ts">
import {computed, ref} from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: number }>();

const selectable = ref([
  {name: 'Non-urgent', code: 1},
  {name: 'Modéré', code: 2},
  {name: 'Urgent', code: 3},
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
