<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { watch } from "vue";

const [showWidget, setShowWidget] = useToggle();

const locationUrl = new URL(location.href);
const params = Object.fromEntries(locationUrl.searchParams);

watch(
  () => showWidget.value,
  (value) => {
    window.parent.postMessage(
      {
        open: value,
        width: 416,
        height: 374,
      },
      "*"
    );
  }
);
</script>

<template>
  <div class="absolute bottom-0 right-0 m-4 flex flex-col items-end">
    <Transition
      enter-from-class="translate-y-full opacity-0 ease-out"
      leave-to-class="translate-y-full opacity-0 ease-in"
      class="transition-all"
    >
      <div
        v-if="showWidget"
        class="mb-4 w-96 overflow-hidden rounded-2xl shadow-xl shadow-slate-950/10"
      >
        <div
          class="bg-slate-800 p-6 text-center text-sm leading-relaxed text-slate-200"
        >
          <p>Book your table at {{ params.restaurantId }}</p>
          <p>
            for <span class="font-semibold text-white">4 people</span> on
            <span class="font-semibold text-white">Nov 23, 2023</span> at
            <span class="font-semibold text-white">19:30</span>.
          </p>
        </div>
        <div class="bg-slate-50 p-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum id
          quisquam nihil. Quis ducimus quo eaque laudantium natus ut quod
          tenetur perspiciatis, dolorem, iure ipsam id totam autem facere
          beatae.
        </div>
      </div>
    </Transition>
    <button
      @click="setShowWidget()"
      class="h-16 w-16 rounded-full shadow-md transition-all"
      :class="
        !!showWidget
          ? 'bg-indigo-700 active:bg-indigo-800 -rotate-45'
          : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 '
      "
    >
      <span class="text-2xl leading-none text-white">+</span>
    </button>
  </div>
</template>
