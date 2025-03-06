<template>
  <div class="monitoring-tab">
    <CameraItem
      v-for="camera in cameraItems"
      :key="camera.id"
      :title="camera.title"
      :show-camera="camera.showCamera"
      @open-modal="openModal(camera)"
    />
  </div>
  <VModalWrapper
    v-model="showModal"
    :has-close-button="false"
    :has-blackout="false"
    modal-animation-name="slide-y"
    has-blur
  >
    <CameraModalLayout
      :title="choosedCamera?.title"
      :show-camera="choosedCamera?.showCamera"
      @close-modal="closeModal"
    />
  </VModalWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CameraItem from "./CameraItem.vue";
import CameraModalLayout from "./CameraModalLayout.vue";
import VModalWrapper from "@/components/modals/VModalWrapper.vue";

interface CameraItem {
  id: number;
  title: string;
  showCamera: boolean;
}

const showModal = ref(false);
const choosedCamera = ref<CameraItem | null>(null);
const cameraItems = ref<CameraItem[]>([
  {
    id: 1,
    title: "Camera 1",
    showCamera: true,
  },
  {
    id: 2,
    title: "Camera 2",
    showCamera: true,
  },
  {
    id: 3,
    title: "Camera 3",
    showCamera: true,
  },
  {
    id: 4,
    title: "Camera 4",
    showCamera: false,
  },
  {
    id: 5,
    title: "Camera 5",
    showCamera: true,
  },
  {
    id: 6,
    title: "Camera 6",
    showCamera: true,
  },
  {
    id: 7,
    title: "Camera 7",
    showCamera: true,
  },
  {
    id: 8,
    title: "Camera 8",
    showCamera: false,
  },
  {
    id: 9,
    title: "Camera 9",
    showCamera: false,
  },
]);

const openModal = (camera: CameraItem) => {
  choosedCamera.value = camera;
  showModal.value = true;
};

const closeModal = () => {
  choosedCamera.value = null;
  showModal.value = false;
};
</script>

<style scoped lang="scss">
.monitoring-tab {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
}
</style>
