<script setup lang="ts">
import InputWrapper from "@/components/InputWrapper.vue";
import { type ReservationField, useDataStore } from "@/stores/data";
import type { Component } from "vue";

defineOptions({ inheritAttrs: false });

const dataStore = useDataStore();

defineProps<{
  field: ReservationField;
  icon: Component;
  label: string;
  textarea?: boolean;
  fillHeight?: boolean;
}>();
</script>

<template>
  <input-wrapper
    :class="{ grow: fillHeight }"
    class="flex flex-col"
    v-bind="{ field, icon, label }"
  >
    <textarea
      v-if="textarea"
      v-bind="$attrs"
      :id="field"
      v-model="dataStore.reservation[field]"
      class="w-full grow rounded-md border-slate-200 px-4 text-slate-800 hover:ring-1 focus:ring-indigo-600"
    ></textarea>
    <input
      v-else
      v-bind="$attrs"
      :id="field"
      v-model="dataStore.reservation[field]"
      class="h-12 w-full rounded-md border-slate-200 px-4 text-slate-800 hover:ring-1 focus:ring-indigo-600"
    />
  </input-wrapper>
</template>
