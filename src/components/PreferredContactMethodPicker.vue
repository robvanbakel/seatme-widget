<script setup lang="ts">
import InputWrapper from "@/components/InputWrapper.vue";
import { useDataStore } from "@/stores/data";
import type { Component } from "vue";

defineOptions({ inheritAttrs: false });

const dataStore = useDataStore();

defineProps<{
  icon: Component;
  label: string;
  textarea?: boolean;
}>();

const contactMethods = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Phone",
    value: "phone",
  },
] as const;
</script>

<template>
  <input-wrapper v-bind="{ icon, label }">
    <div class="flex space-x-6">
      <div
        class="flex items-center"
        v-for="{ label, value } in contactMethods"
        :key="value"
      >
        <input
          v-model="dataStore.reservation.prefferedContactMethod"
          type="radio"
          name="preffered-contact-method"
          :id="`prefer-${value}`"
          :value="value"
        />
        <label class="ml-2" :for="`prefer-${value}`">{{ label }}</label>
      </div>
    </div>
  </input-wrapper>
</template>
