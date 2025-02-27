<template>
  <div
    v-if="user"
    class="v-user"
  >
    <VAvatar />
    <div class="v-user__info">
      <div class="v-user__name"></div>
    <!-- <div class="v-user__position">{{ user.position }}</div> -->
    </div>
  </div>
  <div
    v-else
    class="v-user"
  >
    <div class="v-user__avatar skeleton"></div>
    <div class="v-user__info">
      <div class="v-user__name skeleton skeleton__text--middle"></div>
      <div class="v-user__position skeleton skeleton__text--small"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VAvatar from './VAvatar.vue';

const user = ref(null);
</script>

<style lang="scss" scoped>
.v-user {
  display: flex;
  gap: 12px;
  align-items: center;

  &__avatar {
    width: 40px;
    height: 40px;
    background-color: #E1E6ED;
    border-radius: 50%;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    color: var(--text-primary, #DADFE5);

    &.skeleton {
      width: 120px;
    }
  }

  &__position {
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9DA6B2;

    &.skeleton {
      width: 100px;
    }
  }
}
</style>
