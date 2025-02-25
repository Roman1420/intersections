<template>
  <div class="not-found-view">
    <div class="not-found-view__title">Page not found</div>
    <div class="not-found-view__desc">Error: 404</div>
  </div>
</template>

<style lang="scss">
.not-found-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__title {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }

  &__desc {
    font-size: 16px;
  }
}
</style>
