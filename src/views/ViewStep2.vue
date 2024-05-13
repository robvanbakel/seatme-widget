<script setup lang="ts">
import { ref } from "vue";
import { ArrowUturnLeftIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import MainButton from "@/components/MainButton.vue";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/vue/20/solid";
import MainTextField from "@/components/MainTextField.vue";
import { useDataStore } from "@/stores/data";

const dataStore = useDataStore();

const loading = ref(false);

const emit = defineEmits<{
  back: [];
  confirm: [];
}>();

const onConfirm = async () => {
  loading.value = true;

  await dataStore.submit();
  emit("confirm");
};
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <div class="flex flex-col space-y-5">
      <MainTextField label="Name" :icon="UserIcon" field="name" />
      <MainTextField label="Email" :icon="EnvelopeIcon" field="email" />
      <MainTextField label="Phone" :icon="PhoneIcon" field="phone" />
    </div>
    <div class="mt-6 flex space-x-3">
      <MainButton @click="emit('back')" secondary :icon="ArrowUturnLeftIcon" />
      <MainButton
        @click="onConfirm"
        :loading
        class="grow"
        label="Book your table"
        :icon="CheckCircleIcon"
        :disabled="!dataStore.isStep2Valid"
      />
    </div>
  </div>
</template>
