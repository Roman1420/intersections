<template>
  <div class="general-view">
    <VNav />
    <div class="general-view__content">
      <!-- <VHeader /> -->
      <RouterView v-if="navList.length > 0" v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
      <div v-else class="general-view__preloader-wrapper">
        <PCircular />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import VHeader from "@/components/VHeader.vue";
import VNav from "@/components/VNav.vue";
import PCircular from '@/components/preloaders/PCircular.vue';
import { storeToRefs } from 'pinia';
import { useNavStore } from '@/store/useNavStore';

const { navList, currentNav } = storeToRefs(useNavStore());
</script>

<style lang="scss" scoped>
.general-view {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__preloader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - #{var(--nav-width)});
    padding: 26px 26px 26px 16px;
    transition: .3s;
  }
}
</style>
