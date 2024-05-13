<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

defineProps<{
  selfCenter?: boolean;
  size?: number;
}>();
</script>

<template>
  <div :class="{ 'grid place-items-center': selfCenter }">
    <ArrowPathIcon :size="size || 36" class="animate-spin" />
  </div>
</template>
