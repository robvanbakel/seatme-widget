<script setup lang="ts">
import { computed } from "vue";
import {
  ArrowRightCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline";
import MainButton from "@/components/MainButton.vue";
import { ClockIcon, UserIcon, PencilSquareIcon } from "@heroicons/vue/20/solid";
import MainTextField from "@/components/MainTextField.vue";
import PartySizePicker from "@/components/PartySizePicker.vue";
import { useDataStore } from "@/stores/data";

const dataStore = useDataStore();

const emit = defineEmits<{
  help: [];
  next: [];
}>();

const isValid = computed(() => {
  return (
    !!dataStore.reservation.arrivalTime && !!dataStore.reservation.partySize
  );
});
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <div class="flex flex-col space-y-5">
      <MainTextField
        type="datetime-local"
        label="Arrival time"
        :icon="ClockIcon"
        field="arrivalTime"
      />
      <PartySizePicker label="Party size" :icon="UserIcon" />
      <MainTextField
        label="Notes"
        textarea
        :icon="PencilSquareIcon"
        field="notes"
      />
    </div>
    <div class="mt-6 flex space-x-3">
      <MainButton
        @click="emit('help')"
        secondary
        :icon="QuestionMarkCircleIcon"
      />
      <MainButton
        @click="emit('next')"
        class="grow"
        label="Contact details"
        :icon="ArrowRightCircleIcon"
        :disabled="!isValid"
      />
    </div>
  </div>
</template>
