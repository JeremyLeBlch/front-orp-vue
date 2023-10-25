<template>
    <Dropdown v-model="selected"
              :options="selectable"
              option-label="name"
              option-value="code"
              placeholder="Type d'intervention"
              class="w-full" />
</template>
<script setup lang="ts">
import {computed, ref} from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: number }>();

const selectable = ref([
  {name: 'Revision', code: 1},
  {name: 'Climatisation', code: 2},
  {name: 'Réparation', code: 3},
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
