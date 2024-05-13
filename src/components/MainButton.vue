<script setup lang="ts">
import { computed, type Component } from "vue";
import MainLoader from "@/components/MainLoader.vue";

const props = defineProps<{
  label?: string;
  icon?: Component;
  secondary?: boolean;
  small?: boolean;
  loading?: boolean;
}>();

const priorityClasses = computed(() => {
  return props.secondary
    ? "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400"
    : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:pointer-events-none disabled:bg-indigo-200";
});

const sizeClasses = computed(() => {
  return props.small ? "h-10 px-4 text-xs" : "h-12 px-5 text-sm";
});
</script>

<template>
  <button
    class="relative flex items-center justify-center whitespace-nowrap rounded-md tracking-wide transition-colors"
    :class="[priorityClasses, sizeClasses]"
  >
    <div
      class="flex items-center justify-center transition-all"
      :class="{ '-translate-y-2 opacity-0': loading }"
    >
      <component
        v-if="!!icon"
        :is="icon"
        class="w-5"
        :class="label ? '-ml-1 mr-2 w-5' : 'mx-1'"
      />
      {{ label }}
    </div>
    <Transition
      enter-from-class="translate-y-2 opacity-0"
      leave-to-class="translate-y-2 opacity-0"
      class="transition-all"
    >
      <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <MainLoader class="w-5" />
      </div>
    </Transition>
  </button>
</template>
