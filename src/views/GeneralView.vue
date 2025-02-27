<template>
  <div class="general-view">
    <VNav />
    <div class="general-view__content">
      <VHeader />
      <div class="general-view__preloader-wrapper">
        <PCircular />
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import VHeader from "@/components/VHeader.vue";
import VNav from "@/components/VNav.vue";


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
    padding: 0 36px 32px;
    transition: .3s;
  }
}
</style>
