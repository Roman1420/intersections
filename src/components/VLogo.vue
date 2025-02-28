<template>
  <div class="v-logo">
    <Icon64LogoIntellisection />
  </div>
</template>

<script setup lang="ts">
import { Icon64LogoIntellisection } from "iss-ui-kit/icons";
</script>

<style scoped lang="scss">
.v-logo {
  $logo-size: 64px;
  width: $logo-size;
  height: $logo-size;
  color: var(--text-accent-primary, #4a95ff);

  svg {
    width: 100%;
    height: 100%;
  }

  & :deep(path:nth-child(2)) {
    color: var(--road-road, #a7b5c2);
    fill: var(--road-road, #a7b5c2);
    stroke: var(--road-road, #a7b5c2);
  }
}
</style>
