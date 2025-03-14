<template>
  <div
    class="v-dropdown-element"
  >
    <div
      v-if="$slots.icon"
      class="v-dropdown-element__icon"
    >
      <slot name="icon"></slot>
    </div>
    <span
      class="v-dropdown-element__text"
      :style="{ color: `var(${props.textColor})` }"
    >{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    default: '--text-primary'
  },
  iconColor: {
    type: String,
    required: false
  }
});
</script>

<style lang="scss" scoped>
.v-dropdown-element {
  @include style.dropdown-item;
  gap: 4px;

  padding: 4px 8px;
  border-radius: 9px;
  backdrop-filter: blur(5px);

  :slotted(svg) {
    * {
      fill: v-bind("props.iconColor ? `var(${props.iconColor})` : `var(${props.textColor})`");
      stroke: v-bind("props.iconColor ? `var(${props.iconColor})` : `var(${props.textColor})`");
    }
  }

  &:hover {
    background: var(--dropdown-item-on-hover, #19202D);
    border-radius: 9px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }

  &__text {
    @include style.ellipsis;

    padding: 8px 0;
    font-family: Golos;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-primary, #E3EBF3);
  }
}
</style>
