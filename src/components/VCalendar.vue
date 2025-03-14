<template>
  <div class="v-calendar">
    <div
      class="v-calendar__wrapper"
      :class="[disabled ? 'disabled' : '']"
      @click="openCalendar"
    >
      <input
        v-model="selectedDate"
        class="v-calendar__input"
        type="text"
        disabled
      />
      <Icon24CalendarOutline
        class="v-calendar__icon"
        :color="disabled ? '--text-tertiary': '--text-secondary'"
      />
    </div>
    <div
      v-show="collapsed"
      class="v-calendar__calendar"
      @mouseenter="setCursorInDropedList(true)"
      @mouseleave="setCursorInDropedList(false)"
    >
      <DatePicker
        v-model.range="dateRange"
        mode="date"
        :locale="locale"
        :minDate="minDate"
        @dayclick="clickByCalendar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { useDropdown } from '@/composables/useDropdown';
import { format, set, isEqual } from 'date-fns';
import { Icon24CalendarOutline } from "iss-ui-kit/icons";
import { useI18n } from 'vue-i18n';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  datesInterval: {
    type: Object,
    required: false
  }
});

const { locale } = useI18n({ useScope: 'global' });
const { collapsed, collapse, setCursorInDropedList } = useDropdown(false);

const minDate = set(new Date(), {
  year: 2023,
  month: 0,
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
});

const dateRange = ref(props.datesInterval
  ? props.datesInterval
  : {
      start: new Date(),
      end: new Date()
    }
);

const openCalendar = (event: Event) => {
  if (props.disabled) return;
  collapse(event);
};

const emit = defineEmits(['selectDate', 'clickByCalendar']);

const clickByCalendar = () => {
  emit('clickByCalendar');
};

const selectedDate = computed(() => {
  if (props.datesInterval) {
    return `${format(props.datesInterval.start, 'dd.MM.yyyy')} - ${format(
      props.datesInterval.end,
      'dd.MM.yyyy'
    )}`;
  }

  return `${format(dateRange.value.start, 'dd.MM.yyyy')} - ${format(
    dateRange.value.end,
    'dd.MM.yyyy'
  )}`;
});

watch(dateRange, (newDate) => {
  const { start, end } = newDate;
  emit('selectDate', { start, end });
});

watch(() => props.datesInterval, () => {
  if (
    !isEqual(props.datesInterval?.start, dateRange.value.start) ||
    !isEqual(props.datesInterval?.end, dateRange.value.end)
  ) {
    dateRange.value = {
      start: props.datesInterval?.start,
      end: props.datesInterval?.end
    };
  }
});

onMounted(() => {
  const { start, end } = dateRange.value;
  emit('selectDate', { start, end });
});
</script>

<style lang="scss" scoped>
.v-calendar {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 210px;
  height: 40px;
  padding: 8px;
  color: var(--text-primary, #DADFE5);
  background: var(--fields-default, var(--fields-default, #23262b));
  border-radius: 8px;

  &__wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;

    &.disabled {
      pointer-events: none;

      .v-calendar__input {
        color: #5F656C;
        cursor: none;
      }
    }
  }

  &__input {
    color: var(--text-primary, #DADFE5);
    pointer-events: none;
  }

  &__icon {
    flex-grow: 2;
  }

  &__calendar {
    position: absolute;
    z-index: 9999;
    max-height: 300px;
    transform: translateY(59%) translateX(21px);
  }
}

:deep(.vc-container) {
  color: var(--text-primary, #DADFE5) !important;
  background-color: var(--fields-default, #23262b) !important; /* Фон календаря */
  border: 1px solid transparent;
  border-radius: 8px;
}

/* Заголовок календаря */
:deep(.vc-header) .vc-title {
  color: var(--text-primary, #DADFE5) !important;
  background-color: var(--fields-default, #23262b) !important;
}

/* Текст заголовка календаря */
:deep(.vc-header .vc-title span::first-letter) {
  text-transform: uppercase !important;
}

/* Стрелки предыдущей и следующий месяц */
:deep(.vc-header .vc-arrow) {
  background-color: var(--fields-default, #23262b) !important;
}

:deep(.vc-prev),
:deep(.vc-next) {
  background-image: url('../assets/images/chevron-icon.svg') !important;
  background-position: center;

  &:hover {
    background-color: var(--fields-default, #23262b) !important;
    background-image: url('../assets/images/chevron-icon-hover.svg') !important;
    background-position: center;
  }
}

:deep(.vc-prev) {
  transform: rotate(180deg);
  transform-origin: 50% 50%;
}

:deep(.vc-base-icon) {
  display: none;
}

:deep(.vc-nav-container) {
  .vc-base-icon {
    display: inline-block;
  }

  .vc-nav-arrow {
    color: var(--fields-default, #23262b);
  }
}

:deep(.vc-day-content:focus) {
  outline-color: red;
  border: #ff606e solid 1px;
}

:deep(.vc-focus:focus-within) {
  background-color: #ff606e;
  box-shadow: none;
}

:deep(.vc-focus:focus-within:hover) {
  background-color: #2e7ae5 !important;
  border: none;
}

:deep(.vc-day:hover) {
  background-color: #2e7ae5 !important;
  border-radius: 10px;
}

:deep(.vc-day.selected) {
  color: var(--text-primary, #DADFE5) !important; /* Цвет текста для выбранного дня */
  background-color: gray !important; /* Цвет фона для выбранного дня */
}

:deep(.vc-weekday) {
  color: #ff606e !important; /* Цвет текста для дней недели */
}
</style>
