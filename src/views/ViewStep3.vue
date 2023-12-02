<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";

import MainButton from "@/components/MainButton.vue";

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center text-center">
    <CheckCircleIcon class="w-12 text-emerald-600" />
    <h2 class="mt-2 text-lg font-semibold">Success!</h2>
    <div class="mt-4">
      Your reservation has successfully been made and a confirmation has been
      sent to you.
    </div>
    <div class="mt-6 flex justify-center">
      <MainButton small @click="emit('close')" label="Close" />
    </div>
  </div>
</template>
