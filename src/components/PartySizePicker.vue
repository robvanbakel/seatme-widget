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
</script>

<template>
  <input-wrapper v-bind="{ icon, label }">
    <div class="grid grid-cols-4 gap-3">
      <button
        v-for="i in 8"
        :key="i"
        class="h-9 rounded-md text-sm"
        :disabled="dataStore.reservation.partySize === i"
        :class="
          dataStore.reservation.partySize === i
            ? 'bg-indigo-600 text-white'
            : 'bg-indigo-200 text-slate-800 hover:bg-indigo-300 active:bg-indigo-400'
        "
        @click="dataStore.reservation.partySize = i"
      >
        {{ i }}
      </button>
    </div>
    <p class="mt-2 text-center text-xs text-slate-400">
      For parties over 8 people, please
      <span
        role="button"
        class="underline underline-offset-4 transition-colors hover:text-slate-800"
        >contact us</span
      >.
    </p>
  </input-wrapper>
</template>
