<template>
  <div v-if="imgUrl">
    <img
      :src="imgUrl"
      alt="avatar"
    >
  </div>
  <div
    v-else
    class="avatar"
  >
    <Icon24UserFilled />
  </div>
</template>

<script setup lang="ts">
import { Icon24UserFilled } from 'iss-ui-kit/icons';

defineProps({
  imgUrl: {
    type: String,
    required: false
  }
});
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  overflow: hidden;
  background-color: #E1E6ED;
  border-radius: 50%;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
