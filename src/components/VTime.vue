<template>
  <div class="v-time">
    <span>{{ moment().format('DD.MM.YYYY') }}</span>
    <WatchIcon class="v-time__icon" />
    <span>{{ lifeTime }}</span>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import WatchIcon from '@/components/icons/WatchIcon.vue';
import { onMounted, onUnmounted, ref, Ref } from 'vue';

let interval: string;
const INTERVAL: number = 10000;
let lifeTime: Ref<string> = ref(moment().format('HH:mm'));

const setTime = () => {
  setInterval(() => {
    interval = lifeTime.value = moment().format('HH:mm');
  }, INTERVAL);
};

onMounted(() => {
  setTime();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" scoped>
.v-time {
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: var(--text-primary, #DADFE5);

  &__icon {
    margin-left: 8px;
  }
}
</style>
