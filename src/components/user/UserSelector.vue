<template>
  <Dropdown v-model="selected"
            :options="selectable"
            option-label="Name"
            option-value="id"
            placeholder="Sélection du client"
            class="col-4" />
</template>
<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useAuthStore} from "@/stores/auth-store";
import {useUserStore} from "@/stores/user-store";

const authStore = useAuthStore();
const userStore = useUserStore();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: number }>();

const selectable = computed(() => userStore.clients);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emit("update:modelValue", value);
  }
});

onMounted(() => {
  userStore.getAllClients();
  console.log("onmunted", userStore.getAllClients())
});


</script>
