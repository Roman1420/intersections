<template>
  <div class="incidents-page">
    <div class="incidents-page__header">
      <div class="incidents-page__header-title">{{ $t('incidents.title') }}</div>
    </div>
    <IncidentsFilters />
    <IncidentsTable
      class="incidents-page__table"
      :items="incidentsList"
      @open-card="openCard"
    >
      <div v-show="incidentsList.length === 0">
        <VEmptyPlaceholder
          :description="'pages.incidentsPage.notFound'"
          :text="'global.changeSearchParameters'"
        />
      </div>
    </IncidentsTable>
  </div>
  <VModalWrapper
    v-model="showModal"
    :has-blackout="false"
    modal-animation-name="slide-y"
    has-blur
  >
    <IncidentsModalLayout
      v-if="selectedIncident"
      :incident="selectedIncident"
    />
  </VModalWrapper>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue";
import { format } from "date-fns";
import { Icon24CarCrash, Icon24Pedestrian, Icon24TrafficJam, Icon24MaxSpeedFilled } from "iss-ui-kit/icons";
import { IIncident } from "@/interfaces/IIncident";
import IncidentsFilters from "./IncidentsFilters.vue";
import IncidentsTable from "./IncidentsTable.vue";
import IncidentsModalLayout from "./IncidentsModalLayout.vue";
import VModalWrapper from "@/components/modals/VModalWrapper.vue";

const incidentsList = ref<IIncident[]>([
  {
    incidentId: '1',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '1',
    severityLevel: '3',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24CarCrash),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Crash',
    direction: 'WN →  ES',
    isViewed: true,
  },
  {
    incidentId: '2',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '2',
    severityLevel: '3',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24CarCrash),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Crash',
    direction: 'WN →  ES',
  },
  {
    incidentId: '3',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '3',
    severityLevel: '3',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24Pedestrian),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Pedestrian on the road',
    direction: 'WN →  ES',
  },
  {
    incidentId: '4',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '4',
    severityLevel: '2',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24TrafficJam),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Traffic jam',
    direction: 'WN →  ES',
  },
  {
    incidentId: '5',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '5',
    severityLevel: '2',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24TrafficJam),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Traffic jam',
    direction: 'WN →  ES',
  },
  {
    incidentId: '6',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '6',
    severityLevel: '2',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24TrafficJam),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Traffic jam',
    direction: 'WN →  ES',
  },
  {
    incidentId: '7',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '7',
    severityLevel: '1',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24MaxSpeedFilled),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Speeding',
    direction: 'WN →  ES',
  },
  {
    incidentId: '8',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '8',
    severityLevel: '1',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24MaxSpeedFilled),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Speeding',
    direction: 'WN →  ES',
  },
  {
    incidentId: '9',
    action: '',
    cameraId:'0',
    cameraName: 'camera',
    itsId: '',
    uniqueIncidentId: '',
    generatedId: '9',
    severityLevel: '1',
    dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    coordinates: '',
    status: '',
    incidentNumber: '',
    icon: markRaw(Icon24MaxSpeedFilled),
    objects: 'Car X Car',
    image: '',
    incidentType: 'Speeding',
    direction: 'WN →  ES',
  },
]);

const selectedIncident = ref<IIncident | null>(null);
const showModal = ref(false);

const openCard = (incident: IIncident) => {
  selectedIncident.value = incident;
  showModal.value = true;
  incident.isViewed = true;
}
</script>

<style scoped lang="scss">
.incidents-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;

  &__header {
    display: flex;
    flex-shrink: 0;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;

    &-title {
      font-family: Golos;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 32px; /* 133.333% */
      color: var(--text-primary, #1B1D27);
      letter-spacing: 0.24px;
    }
  }
}
</style>
