<template>
  <div
    ref="incidentsTable"
    class="incidents-table"
  >
    <div
      class="incidents-table__wrapper"
      :style="{ 'height': `${getTableHeight}` }"
    >
      <div
        class="incidents-table__header-row"
      >
        <div class="incidents-table__header-cell incidents-table__header-cell--small">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.id') }}</span>
            <div class="header-cell-sort" />
          </div>
        </div>
        <div class="incidents-table__header-cell">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.incident') }}</span>
            <div class="header-cell-sort" />
          </div>
        </div>
        <div class="incidents-table__header-cell">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.camera') }}</span>
            <div class="header-cell-sort" />
          </div>
        </div>
        <div class="incidents-table__header-cell">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.objects') }}</span>
            <div class="header-cell-sort" />
          </div>
        </div>
        <div class="incidents-table__header-cell">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.direction') }}</span>
            <div class="header-cell-sort" />
          </div>
        </div>
        <div class="incidents-table__header-cell">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.dateAndTime') }}</span>
            <div class="header-cell-sort">
              <Icon16ArrowUp />
            </div>
          </div>
        </div>
        <div class="incidents-table__header-cell">
          <div class="header-cell-content">
            <span class="header-cell-name">{{ $t('tableHeader.severityLevel') }}</span>
            <div class="header-cell-sort">
              <Icon16ArrowUp />
            </div>
          </div>
        </div>
        <div class="right-padding"></div>
      </div>
      <div
        v-if="!props.items.length && !isLoading"
        class="incidents-table__empty"
      >
        <slot></slot>
      </div>
      <div
        v-show="!props.items.length && isLoading"
        class="incidents-table__loading"
      >
        <div
          class="incidents-table__loading-wrapper"
          :style="{ 'padding-top': '178px' }"
        >
          <PCircular />
        </div>
      </div>
      <DynamicScroller
        ref="scroller"
        class="scroller"
        :items="incidents"
        :minItemSize="72"
        :itemSize="72"
        :buffer="30"
        keyField="generatedId"
      >
        <template #default="{ item: entry, index, active }">
          <DynamicScrollerItem
            :item="entry"
            :active="active"
            :data-index="index"
          >
            <div
              v-if="!entry.scroll"
              :key="entry.generatedId"
              class="incidents-table__body-row"
              :class="{ 'incidents-table__body-row--not-viewed': !entry.isViewed }"
              @click="selectEntry(entry)"
            >
              <div class="incidents-table__body-cell incidents-table__body-cell--small left-cell">
                <div class="body-cell-content">
                  <span class="body-cell-content__text">{{ entry.incidentId }}</span>
                </div>
              </div>
              <div class="incidents-table__body-cell">
                <div class="body-cell-content">
                  <div class="body-cell-content__icon type-icon">
                    <component :is="entry.icon" />
                  </div>
                  <span class="body-cell-content__text incident-type">{{ entry.incidentType }}</span>
                </div>
              </div>
              <div class="incidents-table__body-cell">
                <div class="body-cell-content">
                  <span class="body-cell-content__text">
                    {{ entry.cameraName + ' ' + entry.cameraId }}
                  </span>
                </div>
              </div>
              <div class="incidents-table__body-cell">
                <div class="body-cell-content">
                  {{ entry.objects }}
                </div>
              </div>
              <div class="incidents-table__body-cell">
                <div class="body-cell-content">
                  {{ entry.direction }}
                </div>
              </div>
              <div class="incidents-table__body-cell">
                <div class="body-cell-content date-time">
                  <span class="incident-time">{{ formatDate(entry.dateTime).time }}</span>
                  <span class="incident-date">{{ formatDate(entry.dateTime).date }}</span>
                </div>
              </div>
              <div class="incidents-table__body-cell right-cell">
                <div
                  class="body-cell-content severity-level"
                  :class="`severity-level--${entry.severityLevel}`"
                >
                  <div class="body-cell-content__icon severity-icon">
                    <Icon16ArrowDown v-show="entry.severityLevel === '1'" />
                    <Icon16ArrowTopBottomOutward v-show="entry.severityLevel === '2'" />
                    <Icon16ArrowUp v-show="entry.severityLevel === '3'" />
                  </div>
                  <span>
                    {{
                      entry.severityLevel === '1' ? 'Low' :
                        entry.severityLevel === '2' ? 'Medium' :
                        'High'
                    }}
                  </span>
                </div>
              </div>
              <div class="right-padding"></div>
            </div>

            <div
              v-else
              class="incidents-table__loading-row"
            >
              <div
                class="incidents-table__loading-wrapper"
                :style="{ 'padding-top': '0px' }"
              >
                <PCircular />
              </div>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, onMounted, onBeforeUnmount } from 'vue';
import { Icon16ArrowDown, Icon16ArrowUp, Icon16ArrowTopBottomOutward, Icon24CarCrash } from "iss-ui-kit/icons";
import { IIncident } from '@/interfaces/IIncident';
import PCircular from '@/components/preloaders/PCircular.vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { type DefineComponent } from 'vue';
import { setCssParamValue } from '@/helpers/setCssParamValue';
import { format, parseISO } from 'date-fns';

const emit = defineEmits(['openCard']);

const props = defineProps<{
  items: IIncident[];
}>();

const scroller: Ref<DefineComponent | null> = ref(null);
const incidentsTable = ref<HTMLElement | null>(null);
const clientHeight: Ref<number> = ref(0);
const HEADER_MARGIN = 8;
const MIN_WIDTH_ROW = 800;
const isLoading: Ref<boolean> = ref(false);

// Фейковый инцидент, необходим для корректной работы прелоадера в виртуальном скролле
const fakeIncident: IIncident = {
  incidentId: '',
  cameraId:'0',
  cameraName: 'camera',
  itsId: '',
  uniqueIncidentId: '',
  generatedId: '',
  severityLevel: '',
  dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  coordinates: '',
  status: '',
  incidentNumber: '',
  icon: Icon24CarCrash,
  image: '',
  incidentType: '',
  scroll: true
};

const incidents = computed(() => {
  if (isLoading.value && props.items.length > 0) {
    return [...props.items, fakeIncident];
  }

  return props.items;
});

const formatDate = (date: string) => {
  const parsedDate = parseISO(date);
  return {
    date: format(parsedDate, 'dd.MM.yyyy'),
    time: format(parsedDate, 'HH:mm'),
  };
};

const selectEntry = async (entry: IIncident) => {
  emit('openCard', entry);
};

const handleScrollEnd = () => {
  console.log("scroll end");
};

const getTableHeight = computed((): string => {
  return clientHeight.value
    ? `${clientHeight.value}px`
    : '100%';
});

const updateTableHeight = (): void => {
  clientHeight.value = incidentsTable.value?.clientHeight || 0;
};

onMounted(() => {
  setCssParamValue('--table-header-margin-bottom', `${HEADER_MARGIN}px`);
  const headerRowElement = document.querySelector('.incidents-table__header-row') as HTMLElement | null;
  const scrollerElement = document.querySelector('.vue-recycle-scroller') as HTMLElement | null;
  const scrollWrapperElement = document.querySelector('.vue-recycle-scroller__item-wrapper') as HTMLElement | null;

  if (headerRowElement && scrollerElement) {
    if (scrollWrapperElement) {
      scrollWrapperElement.style.setProperty('min-width', `${MIN_WIDTH_ROW}px`);
      scrollerElement.prepend(headerRowElement);
    }
  }

  updateTableHeight();
  window.addEventListener('resize', updateTableHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight);
});
</script>

<style lang="scss" scoped>
.container {
  max-height: 40vh;
}

.scroller {
  width: 100%;
  height: 100%;
  overflow-x: auto;

  @include style.main-scroll;
}

.incidents-table {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Golos;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: var(--text-primary, #DADFE5);

  &__wrapper {
    width: 100%;
  }

  &__header-row, &__body-row {
    display: flex;
    width: 100%;
  }

  &__body-row--not-viewed {
    .incidents-table__body-cell {
      background: var(--accents-destructive-transparent, rgba(255, 104, 117, 20%));
    }
  }

  &__header-row {
    position: sticky!important;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-width: 800px;
    margin-bottom: var(--table-header-margin-bottom);
  }

  &__header-cell, &__body-cell {
    display: flex;
    align-items: center;
    width: calc((100% - 64px) / 6);
    min-width: 80px;
    height: 64px;

    &--small {
      width: 64px;
      min-width: 64px;
    }
  }

  &__header-cell {
    gap: 4px;
    padding: 12px 0 12px 12px;
    background-color: var(--background-page, #121720);

    &:last-child .cell-content {
      border: none;
    }
  }

  &__body-cell {
    flex: 1 0 0;
    gap: 8px;
    align-self: stretch;
    padding: 8px 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: var(--background-table-default, #141923);

    &--small {
      flex: none;
    }
  }

  &__empty {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 178px;
  }


  &__loading, &__loading-row {
    height: 64px;
    vertical-align: middle;
    text-align: center;
    border: none;

    &:hover {
      cursor: default;
      background-color: transparent;
    }
  }

  &__loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 178px;
  }

  &__loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.header-cell-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: Golos;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: var(--text-secondary, #76879F);
  text-align: left;
  border-right: 1px solid var(--borders-neutral, #212834);
}

.header-cell-name {
  display: -webkit-box;
  padding-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  word-break: break-word;
  -webkit-box-orient: vertical;
}


.header-cell-sort {
  display: flex;
  align-items: center;
  align-self: stretch;
  min-width: 12px;
  height: 48px;
  padding-right: 12px;
  cursor: pointer;
}

.incidents-table__body-row:hover>.incidents-table__body-cell {
  cursor: pointer;
  background: var(--background-table-on-hover, #1C232E);
  transition: 0.3s;
}

.incidents-table__body-cell>span,
.body-cell-content,
.body-cell-content>span
 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.body-cell-content {
  display: flex;
  gap: 8px;
  align-items: center;

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }
}

.severity-level {
  font-weight: 600;

  &--1 {
    color: var(--text-accent-positive, #42C777);
  }

  &--2 {
    color: var(--text-accent-warning, #FA0);
  }

  &--3 {
    color: var(--text-accent-destructive, #FF6875);;
  }
}

.severity-icon {
  width: 24px;
}

.type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: var(--icon-secondary-default, #4E5A6C);
  background: var(--button-icon-button-content, #DCE4EC);
  border-radius: 12px;
}

.incident-type {
  /* Body Medium 500 */
  font-family: Golos;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  color: var(--text-primary, #1B1D27);
}

.date-time {
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
  justify-content: center;
}

.incident-time {
  font-weight: 600;
}

.incident-date {
  color: var(--text-tertiary, #5F656C);
}

.incident-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-cell {
  border-radius: 16px 0 0 16px;
}

.right-cell {
  border-radius: 0 16px 16px 0;
}

.right-padding {
  width: 12px;
}
</style>
