<script setup lang="ts">
import { ArrowUturnLeftIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import MainButton from "@/components/MainButton.vue";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/20/solid";
import MainTextField from "@/components/MainTextField.vue";
import PreferredContactMethodPicker from "@/components/PreferredContactMethodPicker.vue";
import { useDataStore } from "@/stores/data";

const dataStore = useDataStore();

const emit = defineEmits<{
  back: [];
  confirm: [];
}>();
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <div class="flex flex-col space-y-5">
      <MainTextField label="Name" :icon="UserIcon" field="name" />
      <MainTextField label="Email" :icon="EnvelopeIcon" field="email" />
      <MainTextField label="Phone" :icon="PhoneIcon" field="phone" />
      <PreferredContactMethodPicker
        v-if="dataStore.reservation.email && dataStore.reservation.phone"
        label="Preffered contact method"
        :icon="ChatBubbleLeftEllipsisIcon"
      />
    </div>
    <div class="mt-6 flex space-x-3">
      <MainButton @click="emit('back')" secondary :icon="ArrowUturnLeftIcon" />
      <MainButton
        @click="emit('confirm')"
        class="grow"
        label="Book your table"
        :icon="CheckCircleIcon"
        :disabled="!dataStore.isValid"
      />
    </div>
  </div>
</template>
