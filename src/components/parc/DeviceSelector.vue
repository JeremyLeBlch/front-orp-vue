<template>
  <Dropdown v-model="selected"
            :options="selectable"
            option-label="name"
            option-value="id"
            placeholder="Sélection de la machine"
            class="col-4" />
</template>
<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useAuthStore} from "@/stores/auth-store";
import {useDeviceStore} from "@/stores/device-store";

const authStore = useAuthStore();
const deviceStore = useDeviceStore();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: number }>();

const selectable = computed(() => deviceStore.devices);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emit("update:modelValue", value);
  }
});

onMounted(() => {
   deviceStore.getDeviceByClient(authStore.user.id);
});
</script>
