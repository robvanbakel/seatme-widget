<script setup lang="ts">
import { useDataStore } from "@/stores/data";
import { type Component } from "vue";

defineOptions({ inheritAttrs: false });

const dataStore = useDataStore();

defineProps<{
  field?: keyof typeof dataStore.reservation;
  icon: Component;
  label: string;
}>();
</script>

<template>
  <div>
    <label
      :for="field"
      class="flex justify-between pb-3 text-sm text-slate-800"
    >
      <div class="flex space-x-2 whitespace-nowrap">
        <slot name="icon">
          <component :is="icon" class="w-4" />
        </slot>
        <span>{{ label }} </span>
      </div>
    </label>
    <slot></slot>
  </div>
</template>
