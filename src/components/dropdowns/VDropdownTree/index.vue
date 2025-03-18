<template>
  <div class="v-dropdown-tree">
    <div
      v-if="label"
      class="label"
    >
      {{ props.localize ? $t(label) : label }}
    </div>
    <div
      :class="[
        selectedValues.length > 0 ? 'active' : '',
        disabled ? 'disabled' : '',
        error ? 'error' : '',
        'v-dropdown-tree__input'
      ]"
      @click="collapseDropdown"
    >
      <div class="v-dropdown-tree__input-text">
        <span class="ellipsis">{{ selectedValuesNames }}</span>
      </div>
      <Icon24ChevronDown
        class="v-dropdown-tree__input-icon"
        :class="{
          'v-dropdown-tree__input-icon--collapsed': collapsed
        }"
        :color="disabled ? '--text-tertiary': '--text-secondary'"
      />
    </div>
    <div
      v-show="collapsed"
      class="v-dropdown-tree__list"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <VDropdownTreeParent
        v-for="item of sortedList"
        :key="item.key"
        :item="item"
        :selectedValues="selectedValues"
        :localize="localize"
        @addChild="addChild"
        @removeChild="removeChild"
        @selectParent="handleParentClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  Ref,
  computed,
  PropType,
  onMounted
} from 'vue';
import { useDropdown } from '@/composables/useDropdown';
import { IDropdownTreeParent } from '@/interfaces/IDropdownTreeParent';
import { IDropdownTreeChild } from '@/interfaces/IDropdownTreeChild';
import { IObject } from '@/interfaces/IObject';
import { Icon24ChevronDown } from "iss-ui-kit/icons";
import VDropdownTreeParent from './VDropdownTreeParent.vue';
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  items: {
    type: Array as PropType<IDropdownTreeParent[]>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  // флаг multiply относится только к parent'ам, у children он всегда есть
  multiply: {
    type: Boolean,
    default: true
  },
  autoSelect: {
    type: Boolean,
    default: false
  },
  placeholderText: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  localize: {
    type: Boolean,
    default: true
  },
});

onMounted(() => {
  if (props.autoSelect) {
    handleParentClick(sortedList.value[0]);
  }
});

const { collapsed, collapse, setCursorInDropedList } = useDropdown(false);
const selectedValues: Ref<IObject[]> = ref([]);
const emit = defineEmits(['selectValues']);

const sortedList = computed(() => {
  return props.items
    .map((item) => {
      if (item.children && item.children.length) {
        item.children.sort((a: IDropdownTreeChild, b: IDropdownTreeChild) => Number(a.value || 0) - Number(b.value || 0));
      }

      return item;
    })
    .sort((a, b) => a.name === b.name
      ? Number(a.itsId || 0) - Number(b.itsId || 0)
      : a.name.localeCompare(b.name)
    );
});

const collapseDropdown = (event: Event) => {
  if (props.disabled) return;
  collapse(event);
};

const handleParentClick = (parent: IDropdownTreeParent) => {
  if (!parent?.children?.length) return;

  const parentData = {
    ...parent,
    children: [...parent.children]
  };

  if (props.multiply) {
    const selectedParent = selectedValues.value
      .find(element => element.key === parent.key);

    const parentIsSelectedWithAllChildren = selectedParent
      && selectedParent.children.length === parent.children.length;

    selectedValues.value = selectedValues.value
      .filter(element => element.key !== parent.key);

    if (!parentIsSelectedWithAllChildren) {
      selectedValues.value.push(parentData);
    }
  } else {
    selectedValues.value = [parentData];
  }

  emit('selectValues', selectedValues.value);
};

const addChild = (
  child: IDropdownTreeChild,
  parent: IDropdownTreeParent
) => {
  const selectedParent = selectedValues.value
    .find(element => element.key === parent.key);

  const parentData = {
    ...parent,
    children: [child]
  };

  if (selectedParent) {
    selectedParent.children.push(child);
  } else {
    props.multiply
      ? selectedValues.value.push(parentData)
      : selectedValues.value = [parentData];
  }

  emit('selectValues', selectedValues.value);
};

const removeChild = (
  child: IDropdownTreeChild,
  parent: IDropdownTreeParent
) => {
  const selectedParent = selectedValues.value
    .find(element => element.key === parent.key);

  if (selectedParent && selectedParent.children.length > 1) {
    selectedParent.children = selectedParent.children
      .filter((element: IDropdownTreeChild) => element.key !== child.key);
  } else {
    if (props.multiply) {
      selectedValues.value = selectedValues.value
        .filter((element: IObject) => element.key !== parent.key);
    }
  }

  emit('selectValues', selectedValues.value);
};

const selectedValuesNames = computed(() => {
  if (selectedValues.value.length === 0) {
    return t(
      props.placeholderText
        ?? 'global.notSelected'
    );
  };

  return selectedValues.value
    .map(element => {
      const camName = element.name;

      return camName
        + ' ('
        + element.children
          .map((child: IDropdownTreeChild) => {
            const value = child.value && Number(child.value) > 0
              ? (' ' + child.value)
              : '';

            const title = props.localize
              ? t(child.title ?? '')
              : child.title ?? '';

            return title + value;
          })
          .join(', ')
        + ')';
    })
      .join(', ');
});

const mouseEnter = () => {
  setCursorInDropedList(true);
};
const mouseLeave = () => {
  setCursorInDropedList(false);
};
</script>

<style lang="scss" scoped>
.v-dropdown-tree {
  @include style.dropdown;

  &__list {
    @include style.dropdown-list;
  }

  &__input-icon {
    transform-origin: 50% 50%;
    transition: .3s;

    &--collapsed {
      transform: rotate(180deg);
    }
  }
}
</style>
