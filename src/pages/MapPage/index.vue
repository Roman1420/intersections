<template>
  <div class="map-page">
    <div class="map-page__header">
      <div class="map-page__header-title">{{  $t('map.title') }}</div>
      <div class="map-page__header-toggle">
        <VToggle isIconOnTop @click="changeTab">
          <template #icon-left><Icon24PollOutline /></template>
          <template #icon-right><Icon24CameraOutline /></template>
        </VToggle>
      </div>
    </div>
    <div class="map-page__content">
      <component :is="tabs[activeTab]"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, type DefineComponent } from "vue";
import { Icon24PollOutline, Icon24CameraOutline } from 'iss-ui-kit/icons';
import VToggle from "@/components/VToggle.vue";
import MonitoringTab from "./tabs/MonitoringTab/index.vue";
import TableTab from "./tabs/TableTab.vue";

type Tabs = {
  [key: string]: DefineComponent<{}, {}, {}, {}, {}>;
}

const tabs = shallowRef<Tabs>({
  monitoring: MonitoringTab,
  table: TableTab,
});

const activeTab = ref<'monitoring' | 'table'>("table");

const changeTab = () => {
  activeTab.value = activeTab.value === "table" ? "monitoring" : "table";
}
</script>

<style scoped lang="scss">
.map-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;

  &__header {
    display: flex;
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

  &__content {
    width: 100%;
    height: 100%;
    padding-right: 24px;
    overflow-y: auto;

    @include style.main-scroll;
  }
}
</style>
