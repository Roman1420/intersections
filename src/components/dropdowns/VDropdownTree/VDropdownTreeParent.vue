<template>
  <div
    class="v-dropdown-tree-parent"
    @click="handleItemClick"
  >
    <div
      :class="[
        collapsed ? 'collapsed' : '',
        'v-dropdown-tree-parent__info'
      ]"
    >
      <Icon24CheckedMinOutline
        v-if="isSelectedItem"
        class="v-dropdown-tree-parent__icon"
        color="#2E7AE5"
      />
      <span>{{ item.name }}</span>
      <div
        v-if="item.children && item.children.length"
        class="v-dropdown-tree-parent__button"
        @click.stop="collapseList"
      >
        <Icon24MinusOutline v-if="collapsed" />
        <Icon24PlusOutline v-else />
      </div>
    </div>
    <div
      v-if="collapsed"
      class="v-dropdown-tree-parent__list"
    >
      <VDropdownTreeChild
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :localize="localize"
        :selected="isSelectedChild(child)"
        @selectChild="handleChildClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, ref, computed } from 'vue';
import { IDropdownTreeParent } from '@/interfaces/IDropdownTreeParent';
import { IDropdownTreeChild } from '@/interfaces/IDropdownTreeChild';
import { Icon24CheckedMinOutline, Icon24MinusOutline, Icon24PlusOutline } from "iss-ui-kit/icons";
import VDropdownTreeChild from './VDropdownTreeChild.vue';
import { IObject } from '@/interfaces/IObject';

const props = defineProps({
  item: {
    type: Object as PropType<IDropdownTreeParent>,
    required: true
  },
  selectedValues: {
    type: Array as PropType<IObject[]>,
    required: true
  },
  localize: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(
  [
    'addChild',
    'removeChild',
    'selectParent'
  ]
);

const handleItemClick = () => {
  emit('selectParent', props.item);
};

const collapsed: Ref<boolean> = ref(false);

const collapseList = () => {
  collapsed.value = !collapsed.value;
};

const getCurrentSelectedParent = () => {
  const currentParent = props.selectedValues
    .find(parent => parent.key === props.item.key);

  if (!currentParent) return {};
  return currentParent;
};

const getCurrentSelectedChildren = () => {
  return getCurrentSelectedParent()?.children ?? [];
};

const handleChildClick = (child: IDropdownTreeChild) => {
  const isRemoving = getCurrentSelectedChildren().length
    && getCurrentSelectedChildren()
      .find((element: IDropdownTreeChild) => element.key === child.key);

  emit(isRemoving ? 'removeChild' : 'addChild', child, props.item);
};

const isSelectedChild = (child: IDropdownTreeChild) => {
  if (!getCurrentSelectedChildren().length) return false;

  return Boolean(
    getCurrentSelectedChildren()
      .find((element: IDropdownTreeChild) => element.key === child.key)
  );
};

const isSelectedItem = computed(() => {
  if (!getCurrentSelectedChildren().length) return false;

  return getCurrentSelectedChildren()
    .length === props.item.children?.length;
});
</script>

<style lang="scss" scoped>
.v-dropdown-tree-parent {
  @include style.dropdown-tree-parent;
}
</style>
