<script setup lang="ts">
import { computed, type Component } from "vue";

const props = defineProps<{
  label?: string;
  icon?: Component;
  secondary?: boolean;
  small?: boolean;
}>();

const priorityClasses = computed(() => {
  return props.secondary
    ? "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400"
    : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800";
});

const sizeClasses = computed(() => {
  return props.small ? "h-10 px-4 text-xs" : "h-12 px-5 text-sm";
});
</script>

<template>
  <button
    class="flex items-center justify-center whitespace-nowrap rounded-md tracking-wide"
    :class="[priorityClasses, sizeClasses]"
  >
    <component
      v-if="!!icon"
      :is="icon"
      class="w-5"
      :class="label ? '-ml-1 mr-2 w-5' : 'mx-1'"
    />
    {{ label }}
  </button>
</template>
