<template>
  <div class="v-empty-placeholder">
    <div class="v-empty-placeholder__icon-wrap">
      <component :is="icon" />
    </div>
    <div class="v-empty-placeholder__desc">{{ description }}</div>
    <div class="v-empty-placeholder__text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  description: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped lang="scss">
.v-empty-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  height: -webkit-fill-available;
  padding: 24px;
  line-height: 24px;
  text-align: center;

  &__icon-wrap {
    margin-bottom: 12px;
  }

  &__desc {
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary, #DADFE5);
  }

  &__text {
    max-width: 261px;
    font-size: 14px;
    color: #9DA6B2;
  }
}
</style>
