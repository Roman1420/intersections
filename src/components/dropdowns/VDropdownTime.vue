<template>
  <div class="v-dropdown-time">
    <VDropdown
      :localize="false"
      :items="hoursList"
      :error="props.error"
      :autoSelectLast="props.autoSelectLast"
      :autoSelectedIndex="getIndexHour"
      :disabled="props.disabled"
      @selectValues="handleSelectedHours"
      @clickByDropdown="handleClick"
    />
    <span>:</span>
    <VDropdown
      :localize="false"
      :items="minutesList"
      :error="props.error"
      :autoSelectLast="props.autoSelectLast"
      :autoSelectedIndex="getIndexMinute"
      :disabled="props.disabled"
      @selectValues="handleSelectedMinutes"
      @clickByDropdown="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import VDropdown from '@/components/dropdowns/VDropdown.vue';
import { IDropdownItem } from '@/interfaces/IDropdownItem';
import { Ref, ref, computed } from 'vue';

const enum ETime {
  MINUTES = 60,
  HOURS = 24
};

const props = defineProps({
  error: {
    type: Boolean,
    default: false
  },
  minHoursRule: {
    type: Number,
    required: false
  },
  minMinutesRule: {
    type: Number,
    required: false
  },
  autoSelectLast: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  currentTime: {
    type: String,
    required: false
  },
  isFiveInterval: {
    type: Boolean,
    default: false
  }
});

const hoursList = computed(() => getNumbersList(ETime.HOURS, props.minHoursRule));
const minutesList = computed(() => props.isFiveInterval
  ? getMinutesListByFiveInterval(props.minMinutesRule)
  : getNumbersList(ETime.MINUTES, props.minMinutesRule));
const getIndexHour = computed(() => {
  const hour = props.currentTime?.split(':')[0];
  const index = getNumbersList(ETime.HOURS, props.minHoursRule).findIndex(h => h.name === hour);
  return index !== -1 ? index : 0;
});

const getIndexMinute = computed(() => {
  const minutes = props.currentTime?.split(':')[1];
  const index = minutesList.value.findIndex(m => m.name === minutes);
  return index !== -1 ? index : 0;
});

const emit = defineEmits(['selectTime', 'clickByDropdown']);
const currentTimeArray: Ref<string[]> = ref([]);

const getNumbersList = (maxValue: number, minValueRule?: number) => {
  return [...Array(maxValue).keys()]
    .filter(item => (minValueRule === undefined || item >= minValueRule))
    .map(item => ({
      id: String(item),
      name: getTruthyFormat(item)
    }) as IDropdownItem);
};

const getMinutesListByFiveInterval = (minValueRule?: number) => {
  return [...Array(ETime.MINUTES).keys()]
    .filter(item => (item % 5 === 0 && (minValueRule === undefined || item >= minValueRule)))
    .map(item => ({
      id: String(item),
      name: getTruthyFormat(item)
    }) as IDropdownItem);
};

const getTruthyFormat = (value: number): string => {
  return value.toString().padStart(2, '0');
};

const handleClick = () => {
  emit('clickByDropdown');
};

const emitCurrentTime = () => {
  emit('selectTime', currentTimeArray.value.join(':'));
};

const setHours = (value: string) => {
  currentTimeArray.value[0] = (value);
};

const setMinutes = (value: string) => {
  currentTimeArray.value[1] = (value);
};

const handleSelectedHours = (values: IDropdownItem[]) => {
  setHours(values[0].name);
  emitCurrentTime();
};

const handleSelectedMinutes = (values: IDropdownItem[]) => {
  setMinutes(values[0].name);
  emitCurrentTime();
};
</script>

<style lang="scss" scoped>
.v-dropdown-time {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
}
</style>