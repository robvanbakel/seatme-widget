<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

defineProps<{
  selfCenter?: boolean;
}>();
</script>

<template>
  <div :class="{ 'grid place-items-center': selfCenter }">
    <ArrowPathIcon class="animate-spin" />
  </div>
</template>
