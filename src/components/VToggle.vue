<template>
  <div
    class="v-toggle"
    @click="toggle"
  >
    <div
      class="v-toggle__icon-left"
      :class="{
        'left-active': !isActive,
        'ontop-icon': isIconOnTop
      }"
    >
      <slot name="icon-left"></slot>
    </div>
    <div
      class="v-toggle__icon-right"
      :class="{
        'right-active': isActive,
        'ontop-icon': isIconOnTop
      }"
    >
      <slot name="icon-right"></slot>
    </div>
    <div
      class="v-toggle__circle"
      :class="isActive ? 'active' : ''"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  isIconOnTop: {
    type: Boolean,
    default: false
  }
});

const isActive: Ref<boolean> = ref(props.isActive);

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
	isActive.value = !isActive.value;
	emit('update:modelValue', isActive.value);
};
</script>

<style lang="scss" scoped>
.v-toggle {
	position: relative;
	display: flex;
	gap: 4px;
	align-items: center;
	width: 76px;
	height: 40px;
	padding: 4px;
	cursor: pointer;
	background: var(--button-icon-button-default, #293042);
	border-radius: 20px;
	transition: .3s;

	&:hover {
		.v-toggle__circle {
			box-shadow: 0 0 0 0 rgba(57, 58, 61, 25%);
      transition: .1s;
		}
	}

	&__circle {
		position: absolute;
    left: 4px;
		z-index: 2;
		flex-shrink: 0;
		width: 32px;
		height: 32px;
    background: var(--accents-primary, #2E7AE5);
		border-radius: 30px;
		box-shadow: 0 0 5px 0 rgba(57, 58, 61, 25%);
		transition: .1s;

    &.active {
      left: 40px;
    }
	}

  &__icon-left,
	&__icon-right {
		position: absolute;
		display: flex;
		transition: left 0.3s, right 0.3s;
	}

  &__icon-left {
		left: 12px;

		&.ontop-icon {
			left: 8px;
		}
	}

  &__icon-right {
		right: 12px;

    &.ontop-icon {
			right: 8px;
		}
	}

  .left-active,
  .right-active {
    color: var(--icon-accent, #FFF)
  }
}

.ontop-icon {
	z-index: 3;
}
</style>
