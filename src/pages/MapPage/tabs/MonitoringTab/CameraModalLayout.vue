<template>
  <div class="camera-modal-layout">
    <div class="camera-modal-layout__head">
      <div class="camera-modal-layout__head-title">
        {{ title }}
      </div>
      <div class="camera-modal-layout__head-icon" @click="$emit('close-modal')">
        <Icon24SmallSize />
      </div>
    </div>
    <div v-if="showCamera" class="camera-modal-layout__body">
      <img src="@/assets/images/video.png" alt="" />
    </div>
    <div v-else class="camera-modal-layout__error">
      <Icon80CameraSlashFilled />
      <span>Video retrieval error</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon24SmallSize, Icon80CameraSlashFilled } from "iss-ui-kit/icons";

defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  showCamera: {
    type: Boolean,
    default: false,
  }
});

defineEmits(['close-modal']);
</script>

<style scoped lang="scss">
.camera-modal-layout {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: var(--background-content, #FFF);
  border-radius: 16px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 4px 0 8px;

    &-title {
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: Golos;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 133.333% */
      color: var(--text-primary, #1B1D27);
      letter-spacing: 0.18px;
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  &__body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
  }

  &__error {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    span {
      font-family: Golos;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 100% */
      color: var(--text-secondary, #4E5A6C);
      text-align: center;
      letter-spacing: 0.24px;
    }
  }
}
</style>
