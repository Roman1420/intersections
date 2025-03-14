<template>
  <div class="incidents-filters">
    <div class="incidents-filters__block-filters">
      <VDropdown
        class="incidents-filters__input"
        multiply
        :items="incidentsTypesList"
        :placeholderText="t('lists.incidentsTypes.all')"
        :autoSelect="false"
        :localize="false"
        sorted
        @selectValues="handleSelectedTypesOfIncidents"
      />
      <VDropdown
        class="incidents-filters__input"
        multiply
        :items="camerasList"
        :placeholderText="t('lists.cameras.all')"
        :autoSelect="false"
        :localize="false"
        sorted
        @selectValues="handleSelectedCameras"
      />
      <VDropdown
        class="incidents-filters__input"
        multiply
        :items="objectsList"
        :placeholderText="t('lists.objects.all')"
        :autoSelect="false"
        :localize="false"
        sorted
        @selectValues="handleSelectedObjects"
      />
      <VDropdown
        class="incidents-filters__input"
        multiply
        :items="severityLevelsList"
        :placeholderText="t('lists.severityLevels.all')"
        :autoSelect="false"
        :localize="false"
        sorted
        @selectValues="handleSelectedSeverityLevels"
      />
    </div>
    <div class="incidents-filters__block-date">
      <span>Dates:</span>
      <VCalendar
        above
      />
      <span>Time from:</span>
      <VDropdownTime />
      <span>to:</span>
      <VDropdownTime />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import VDropdown from "@/components/dropdowns/VDropdown.vue";
import VDropdownTime from '@/components/dropdowns/VDropdownTime.vue';
import VCalendar from '@/components/VCalendar.vue';
import { IDropdownItem } from '@/interfaces/IDropdownItem';
import { INCIDENTS_TYPES_LIST } from '@/lists/incidentsTypesList';

const { t } = useI18n();
const selectedIncidentTypes: Ref<(string | number)[]> = ref([]);
const selectedCameras: Ref<(string | number)[]> = ref([]);
const selectedObjects: Ref<(string | number)[]> = ref([]);
const selectedSeverityLevels: Ref<(string | number)[]> = ref([]);

const camerasList = ref([
  {
    name: 'Camera 1',
    value: '1',
    id: '1'
  },
  {
    name: 'Camera 2',
    value: '2',
    id: '2'
  },
  {
    name: 'Camera 3',
    value: '3',
    id: '3'
  },
  {
    name: 'Camera 4',
    value: '4',
    id: '4'
  },
]);
const objectsList = ref([
  {
    name: 'Car',
    value: '1',
    id: '1'
  },
  {
    name: 'Truck',
    value: '2',
    id: '2'
  },
  {
    name: 'Motorcycle',
    value: '3',
    id: '3'
  },
  {
    name: 'Pedestrian',
    value: '4',
    id: '4'
  },
]);
const severityLevelsList = ref([
  {
    name: 'Low',
    value: '1',
    id: '1'
  },
  {
    name: 'Medium',
    value: '2',
    id: '2'
  },
  {
    name: 'High',
    value: '3',
    id: '3'
  },
]);

const incidentsTypesList = INCIDENTS_TYPES_LIST
  .map((item, index) => {
    return {
      name: t(item.localeValue),
      value: item.value,
      id: String(index)
    };
  });

const getGuaranteedValuesFromDropdown = (values: IDropdownItem[]): (number | string)[] => {
  return values
    .map(item => item?.value)
    .filter(element => element !== undefined) as (string | number)[];
};

const handleSelectedTypesOfIncidents = (selectedValues: IDropdownItem[]) => {
  selectedIncidentTypes.value = getGuaranteedValuesFromDropdown(selectedValues);
};
const handleSelectedCameras = (selectedValues: IDropdownItem[]) => {
  selectedCameras.value = getGuaranteedValuesFromDropdown(selectedValues);
};
const handleSelectedObjects = (selectedValues: IDropdownItem[]) => {
  selectedObjects.value = getGuaranteedValuesFromDropdown(selectedValues);
};
const handleSelectedSeverityLevels = (selectedValues: IDropdownItem[]) => {
  selectedSeverityLevels.value = getGuaranteedValuesFromDropdown(selectedValues);
};
</script>

<style scoped lang="scss">
.incidents-filters {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 16px;
  background: var(--background-content, #FFF);
  border-radius: 16px;

  &__block-filters,
  &__block-date {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
