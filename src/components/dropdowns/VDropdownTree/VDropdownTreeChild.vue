<template>
  <div
    class="v-dropdown-tree-child"
    @click.stop="handleChildClick"
  >
    <Icon24CheckedMinOutline
      v-if="selected"
      class="v-dropdown-tree-child__icon"
      color="#2E7AE5"
    />
    <span>{{ fullName }}</span>
  </div>
</template>

<script setup lang='ts'>
import { PropType, computed } from 'vue';
import { IDropdownTreeChild } from '@/interfaces/IDropdownTreeChild';
import { Icon24CheckedMinOutline } from "iss-ui-kit/icons";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  item: {
    type: Object as PropType<IDropdownTreeChild>,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  localize: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['selectChild']);

const handleChildClick = () => {
  emit('selectChild', props.item);
};

const fullName = computed(() => {
  const value = props.item.value && Number(props.item.value) > 0
    ? (' ' + props.item.value)
    : '';

  const title = props.localize
    ? t(props.item.title ?? '')
    : props.item.title ?? '';

  return title + value;
});
</script>

<style lang="scss" scoped>
.v-dropdown-tree-child {
  @include style.dropdown-tree-child;
}
</style>
