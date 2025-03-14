<template>
  <div class="incidents-modal-layout">
    <div class="incidents-modal-layout__camera">
      <img src="@/assets/images/video.png" alt="" />
    </div>
    <div class="incidents-modal-layout__info">
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.id") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{ incident.incidentId }}
        </div>
      </div>
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.incidentType") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{ incident.incidentType }}
        </div>
      </div>
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.camera") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{ incident.cameraName + ' ' + incident.cameraId }}
        </div>
      </div>
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.objects") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{ incident.objects }}
        </div>
      </div>
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.direction") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{ incident.direction }}
        </div>
      </div>
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.dataTime") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{ incident.dateTime }}
        </div>
      </div>
      <div class="incidents-modal-layout__row">
        <div class="incidents-modal-layout__label">
          {{ $t("incidentsModal.severityLevel") }}
        </div>
        <div class="incidents-modal-layout__value">
          {{
            incident.severityLevel === '1' ? 'Low' :
              incident.severityLevel === '2' ? 'Medium' :
              'High'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  incident: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.incidents-modal-layout {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  padding: 16px;
  background: var(--background-content, #FFF);
  border-radius: 16px;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__row {
    display: flex;
    font-family: Golos;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__label {
    width: 180px;
    color: var(--text-secondary, #4E5A6C);
  }

  &__value {
    flex-grow: 1;
    color: var(--text-primary, #1B1D27);
  }
}
</style>
