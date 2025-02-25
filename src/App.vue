<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>


<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  background: var(--background-page, #121720);
}

.skeleton {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: var(--background-skeleton);

  &__text {
    border-radius: 8px;

    &--large {
      height: 40px;
      border-radius: 8px;
    }

    &--middle {
      height: 24px;
      border-radius: 5px;
    }

    &--small {
      height: 14px;
      border-radius: 3px;
    }
  }
  
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: "";
    background: linear-gradient(90deg, var(--gradients-skeleton-from), var(--gradients-skeleton-to), var(--gradients-skeleton-from));
    transform: translateX(-100%);
    animation: skeleton-gradient .9s infinite;
  }
}

@keyframes skeleton-gradient {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(120%);
  }
}
</style>
