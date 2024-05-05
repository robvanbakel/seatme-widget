<script setup lang="ts">
import { computed } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { useDataStore } from "@/stores/data";
import MainButton from "@/components/MainButton.vue";
import { ClockIcon, UserIcon } from "@heroicons/vue/20/solid";
import dayjs from "dayjs";

const dataStore = useDataStore();

const emit = defineEmits<{
  close: [];
}>();

const formattedPartySize = computed(() => {
  const partySize = dataStore.reservation.partySize;
  if (partySize === 1) return "1 person";
  return `${partySize} people`;
});

const formattedDate = computed(() => {
  return dayjs(dataStore.reservation.arrivalTime).format("D MMM HH:mm");
});
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center text-center">
    <CheckCircleIcon class="w-12 text-emerald-600" />
    <h2 class="mt-2 text-lg font-semibold">Success!</h2>
    <div class="mt-4">
      Your reservation has successfully been made and a confirmation has been
      sent to you.
    </div>

    <div class="mt-6 w-full rounded-lg bg-slate-200 p-4 text-sm shadow">
      <h2 class="font-semibold">Reservation details</h2>

      <div class="mt-2 space-y-1">
        <div class="flex justify-center gap-2">
          <ClockIcon class="w-4" />
          <p>{{ formattedDate }}</p>
        </div>
        <div class="flex justify-center gap-2">
          <UserIcon class="w-4" />
          <p>
            {{ formattedPartySize }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <MainButton small @click="emit('close')" label="Close" />
    </div>
  </div>
</template>
