<script setup lang="ts">
import { computed } from "vue";
import { useDataStore } from "@/stores/data";
import dayjs from "dayjs";

const dataStore = useDataStore();

const formattedPartySize = computed(() => {
  const partySize = dataStore.reservation.partySize;
  if (partySize === 1) return "1 person";
  return `${partySize} people`;
});

const formattedDate = computed(() => {
  return dayjs(dataStore.reservation.arrivalTime).format("D MMM");
});

const formattedTime = computed(() => {
  return dayjs(dataStore.reservation.arrivalTime).format("HH:mm");
});
</script>

<template>
  <div
    v-if="dataStore.restaurant"
    class="flex h-24 flex-col items-center justify-center bg-slate-800 px-6 text-center text-sm leading-relaxed text-slate-200"
  >
    <p>Book your table at {{ dataStore.restaurant.name }}</p>
    <p
      v-if="
        dataStore.reservation.partySize || dataStore.reservation.arrivalTime
      "
    >
      <span v-if="dataStore.reservation.partySize">
        for
        <span class="font-semibold text-white">{{ formattedPartySize }}</span>
      </span>
      <span v-if="dataStore.reservation.arrivalTime">
        on
        <span class="font-semibold text-white">{{ formattedDate }}</span>
        at
        <span class="font-semibold text-white">
          {{ formattedTime }}
        </span></span
      >.
    </p>
  </div>
</template>
