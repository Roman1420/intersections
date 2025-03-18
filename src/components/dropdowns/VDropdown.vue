<template>
  <div class="v-dropdown">
    <div
      v-if="label"
      class="label"
    >
      {{ localize ? $t(label) : label }}
    </div>
    <div
      :class="[
        selectedValues.length > 0 ? 'active' : '',
        disabled ? 'disabled' : '',
        error ? 'error' : '',
        'v-dropdown__input'
      ]"
      @click="openDropdown"
    >
      <div class="v-dropdown__input-text">
        <span :class="[multiply ? 'multiply' : '', 'ellipsis']">{{ selectedValuesNames }}</span>
      </div>
      <Icon24ChevronDown
        class="v-dropdown__input-icon"
        :class="{
          'v-dropdown__input-icon--collapsed': collapsed
        }"
        :color="disabled ? 'var(--text-tertiary)': 'var(--text-secondary)'"
      />
    </div>
    <div
      v-show="collapsed"
      class="v-dropdown__list"
      :class="{ 'v-dropdown__list-above' : above}"
      @mouseenter="setCursorInDropedList(true)"
      @mouseleave="setCursorInDropedList(false)"
    >
      <div
        v-for="item of itemsList()"
        :key="item.id"
        class="v-dropdown__item"
        @click="handleItemClick(item)"
      >
        <Icon24CheckedMinOutline
          v-if="isSelectedValue(item.id) && multiply"
          class="v-dropdown__item-icon"
          color="#2E7AE5"
        />
        <Icon24RadioMinOutline
          v-if="isSelectedValue(item.id) && !multiply"
          class="v-dropdown__item-icon"
          color="#2E7AE5"
        />
        <span :class="[multiply ? 'multiply' : '', 'ellipsis']">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  type Ref,
  computed,
  onMounted,
  PropType,
  watch
} from 'vue';
import { useDropdown } from '@/composables/useDropdown';
import { IDropdownItem } from '@/interfaces/IDropdownItem';
import { Icon24ChevronDown, Icon24CheckedMinOutline, Icon24RadioMinOutline } from "iss-ui-kit/icons";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  items: {
    type: Array as PropType<IDropdownItem[]>,
    required: true
  },
  multiply: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  placeholderText: {
    type: String,
    default: 'global.notSelected'
  },
  autoSelect: {
    type: Boolean,
    default: true
  },
  autoSelectLast: {
    type: Boolean,
    default: false
  },
  autoSelectedIndex: {
    type: Number,
    default: 0
  },
  localize: {
    type: Boolean,
    default: true
  },
  above: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: false
  },
  sorted: {
    type: Boolean,
    default: false
  }
});

const { collapsed, collapse, setCursorInDropedList } = useDropdown(!props.multiply);
const selectedValues: Ref<IDropdownItem[]> = ref([]);
const emit = defineEmits(['selectValues', 'clickByDropdown']);

onMounted(() => {
  if (props.items && props.autoSelect) {
    setByAutoSelect(props.autoSelectLast);
  }
});

const updateAutoSelect = computed(() => props.autoSelectedIndex);

watch(updateAutoSelect, () => {
  setByAutoSelect(false);
});

// Computed для вотчера
const itemsListLength = computed(() => {
  return props.items.length;
});

// При изменении числа items проставляем автоселект
watch(itemsListLength, () => {
  const selectedValue = selectedValues.value[0];

  if (
    props.autoSelect
    && !props.items.find(item => item.name === selectedValue.name)
  ) {
    setByAutoSelect(false);
  }
});

/**
 * Устанавливает элемент из списка
 * @param {boolean} autoSelectLast - параметр, определяющий, какой элемент установить из списка (последний или первый)
 */
const setByAutoSelect = (autoSelectLast: boolean = false) => {
  return selectItem(
    autoSelectLast
      ? props.items[props.items.length - 1]
      : props.items[props.autoSelectedIndex]
  );
};

const openDropdown = (event: Event) => {
  if (props.disabled) return;
  collapse(event);
};

const isSelectedValue = (id: number | string) => {
  return selectedValues.value.some((item) => item.id === id);
};

const refreshSelectedValue = () => {
  selectedValues.value = [];
  emit('selectValues', selectedValues.value);
};

const handleItemClick = (item: IDropdownItem) => {
  emit('clickByDropdown');
  selectItem(item);
};

const selectItem = (item: IDropdownItem) => {
  if (!props.multiply) {
    selectedValues.value = [item];
  } else {
    !isSelectedValue(item.id)
      ? selectedValues.value.push(item)
      : (
        selectedValues.value = selectedValues.value.filter(
          (value) => value.id !== item.id
        )
      );
  }
  emit('selectValues', selectedValues.value);
};

const selectedValuesNames = computed(() => {
  if (selectedValues.value.length === 0) {
    return props.localize
      ? t(props.placeholderText)
      : props.placeholderText;
  }
  if (!props.multiply) {
    return props.localize
      ? t(selectedValues.value[0].name)
      : selectedValues.value[0].name;
  }
  return selectedValues.value
      .map((item) => props.localize
        ? t(item.name)
        : item.name
      )
      .join(', ');
});

const itemsList = (): IDropdownItem[] => {
  const list = props.items.map(item => {
    return {
      ...item,
      name: props.localize
        ? t(item.name)
        : item.name
    };
  });

  if (!props.sorted) return list;

  return list
    .sort(
      (a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }
  );
};

defineExpose({
  refreshSelectedValue
});
</script>

<style lang="scss" scoped>
.v-dropdown {
  @include style.dropdown;

  &__list {
    @include style.dropdown-list;
  }

  &__item {
    @include style.dropdown-item;
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
