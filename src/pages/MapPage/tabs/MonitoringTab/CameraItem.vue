<template>
  <div class="camera-item">
    <div class="camera-item__head">
      <div class="camera-item__head-title">
        {{ title }}
      </div>
      <div class="camera-item__head-icon" @click="$emit('open-modal')">
        <Icon24FullSize />
      </div>
    </div>
    <div v-if="showCamera" class="camera-item__body">
      <img src="@/assets/images/camera.png" alt="" />
    </div>
    <div v-else class="camera-item__error">
      <Icon80CameraSlashFilled />
      <span>Video retrieval error</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon24FullSize, Icon80CameraSlashFilled } from "iss-ui-kit/icons";

defineProps({
  title: {
    type: String,
    required: true
  },
  showCamera: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped lang="scss">
.camera-item {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  width: 584px;
  height: 382px;
  padding: 16px;
  background: var(--background-content, #FFF);
  border-radius: 16px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

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
