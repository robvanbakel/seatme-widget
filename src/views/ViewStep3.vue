<script setup lang="ts">
import { computed } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { useDataStore } from "@/stores/data";
import { ClockIcon, UserIcon } from "@heroicons/vue/20/solid";
import dayjs from "dayjs";

const dataStore = useDataStore();

const reservationDetails = computed(() => {
  const formattedPartySize = `${dataStore.reservation.partySize} ${
    dataStore.reservation.partySize === 1 ? "person" : "people"
  }`;

  return [
    {
      icon: ClockIcon,
      value: dayjs(dataStore.reservation.arrivalTime).format("D MMM HH:mm"),
    },
    {
      icon: UserIcon,
      value: formattedPartySize,
    },
  ];
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

    <div class="mt-6 w-full rounded-lg bg-slate-200 p-4 text-sm">
      <h2 class="font-semibold">Reservation details</h2>

      <div class="mt-2 space-y-1">
        <div
          class="flex justify-center gap-2"
          v-for="(detail, index) in reservationDetails"
          :key="index"
        >
          <component :is="detail.icon" class="w-4" />
          <p>{{ detail.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
