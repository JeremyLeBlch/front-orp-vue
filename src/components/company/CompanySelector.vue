<template>
  <Dropdown v-model="selected"
            :options="selectable"
            option-label="name"
            option-value="id"
            placeholder="Sélection de l'entreprise"
            class="w-full" />
</template>
<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useCompanyStore} from "@/stores/company-store";

const companyStore = useCompanyStore();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: number }>();

const selectable = computed(() => companyStore.companies);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emit("update:modelValue", value);
  }
});

onMounted(() => {
   companyStore.getCompanies();
});


</script>
