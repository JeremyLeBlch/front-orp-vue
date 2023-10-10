//TODO
<!--<template>-->
<!--  <Dropdown v-model="selected"-->
<!--            :options="selectable"-->
<!--            option-label="title"-->
<!--            option-value="id"-->
<!--            placeholder="Sélectionnez une valeur"-->
<!--            class="w-full"/>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import {computed, ref} from "vue";-->

<!--const emit = defineEmits(["update:modelValue"]);-->
<!--const props = defineProps<{ modelValue: string }>();-->

<!--const selectable = ref([-->
<!--  {id: 1, title: "Test 1"},-->
<!--  {id: 2, title: "Test 2"},-->
<!--  {id: 3, title: "Test 3"},-->
<!--]);-->

<!--const selected = computed({-->
<!--  get() {-->
<!--    return props.modelValue;-->
<!--  },-->
<!--  set(value) {-->
<!--    emit("update:modelValue", value);-->
<!--  }-->
<!--});-->

<!--</script>-->