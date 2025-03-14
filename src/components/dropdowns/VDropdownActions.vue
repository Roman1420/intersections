<template>
  <div class="v-dropdown-actions">
    <div @click="openDropdown">
      <slot name="button"></slot>
    </div>
    <div class="v-dropdown-actions__wrapper">
      <div
        v-show="collapsed"
        class="v-dropdown-actions__list"
        @mouseenter="setCursorInDropedList(true)"
        @mouseleave="setCursorInDropedList(false)"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDropdown } from '@/composables/useDropdown';

const { collapsed, collapse, setCursorInDropedList } = useDropdown(true);

const openDropdown = (event: Event) => {
  collapse(event);
};
</script>

<style lang="scss" scoped>
.v-dropdown-actions {
  position: relative;
  display: flex;

  &__wrapper {
    @include style.dropdown;
    position: absolute;
    bottom: 0;
    z-index: 4;
    width: 264px;
    transform: translateY(100%);
  }

  &__list {
    @include style.dropdown-list;
    padding: 2px;
    background: var(--dropdown-background, #1D2532);
    border-radius: 11px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 8%), 0 0 0 0 rgba(0, 0, 0, 8%);
  }
}
</style>
