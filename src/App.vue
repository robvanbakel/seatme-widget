<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import ViewStep1 from "@/views/ViewStep1.vue";
import ViewStep2 from "@/views/ViewStep2.vue";
import ViewStep3 from "@/views/ViewStep3.vue";
import SummaryHeader from "@/components/SummaryHeader.vue";
import { useNavigationStore } from "@/stores/navigation";
import { useDataStore } from "@/stores/data";

const dataStore = useDataStore();

const [showWidget, toggleShowWidget] = useToggle();
const navigationStore = useNavigationStore();

const transitionClasses = ref<{
  "enter-from-class": string;
  "leave-to-class": string;
}>();

const reset = () => {
  navigationStore.reset();
  dataStore.reset();
};

watch(
  () => showWidget.value,
  (value) => {
    if (navigationStore.currentStep === 3) {
      reset();
    }

    window.parent.postMessage(
      {
        open: value,
        width: 416,
        height: 733,
      },
      "*"
    );
  }
);

const goToStep = async (step: typeof navigationStore.currentStep) => {
  if (navigationStore.currentStep < step) {
    transitionClasses.value = {
      "enter-from-class": "translate-x-full",
      "leave-to-class": "-translate-x-full",
    };
  } else {
    transitionClasses.value = {
      "enter-from-class": "-translate-x-full",
      "leave-to-class": "translate-x-full",
    };
  }

  if (step === 3) {
    try {
      await dataStore.submit();
    } catch {
      console.log("An error beyond your greatest imagination has occured");
      return;
    }
  }

  navigationStore.currentStep = step;
};

onMounted(async () => {
  await dataStore.init();
});
</script>

<template>
  <div class="absolute bottom-0 right-0 m-4 flex flex-col items-end">
    <Transition
      enter-from-class="translate-y-full opacity-0 ease-out"
      leave-to-class="translate-y-full opacity-0 ease-in"
    >
      <div
        v-if="showWidget"
        class="mb-4 flex h-[621px] w-96 flex-col overflow-hidden overflow-y-scroll rounded-2xl bg-slate-50 text-slate-800 shadow-xl shadow-slate-950/10 transition-all"
      >
        <Transition
          leave-to-class="-translate-y-full ease-in"
          class="transition-transform"
        >
          <SummaryHeader v-if="!navigationStore.onSuccessScreen" />
        </Transition>
        <div class="grow p-6">
          <Transition
            mode="out-in"
            v-bind="transitionClasses"
            class="-mx-6 px-6 transition-transform"
          >
            <ViewStep1
              v-if="navigationStore.currentStep === 1"
              @next="goToStep(2)"
            />
            <ViewStep2
              v-else-if="navigationStore.currentStep === 2"
              @back="goToStep(1)"
              @confirm="goToStep(3)"
            />
            <ViewStep3 v-else-if="navigationStore.currentStep === 3" />
          </Transition>
        </div>
      </div>
    </Transition>
    <Transition
      enter-from-class="scale-50 opacity-0"
      class="transition-all duration-300 ease-[cubic-bezier(0,1,0.75,1.25)]"
    >
      <button
        v-if="dataStore.isReady"
        @click="toggleShowWidget()"
        class="size-16 rounded-full shadow-md transition-all"
        :class="
          !!showWidget
            ? 'bg-indigo-700 active:bg-indigo-800 -rotate-45'
            : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 '
        "
      >
        <span class="text-2xl leading-none text-white">+</span>
      </button>
    </Transition>
  </div>
</template>
