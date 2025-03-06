<template>
  <div class="v-header">
    <div class="v-header__title">
      <template v-if="store.currentNav">
        <div class="v-header__title-value">
          {{ $t(store.currentNav.title) }}
        </div>
        <div
          v-if="store.currentNav.desc"
          class="v-header__title-desc"
        >
          {{ store.currentNav.desc }}
        </div>
      </template>
      <template v-else>
        <div class="v-header__title-value skeleton skeleton__text--large"></div>
        <div class="v-header__title-desc skeleton skeleton__text--middle"></div>
      </template>
    </div>
    <div class="v-header__control">
      <VToggle
        :isActive="isActive"
        @click="toggleTheme"
      >
        <template #icon-left><Icon24Sun /></template>
        <template #icon-right><Icon24Moon /></template>
      </VToggle>
      <IssButton
        class="v-header__button"
        mode="bordered"
        @click="showLogoutModal = true"
      >
        <Icon24LogOut /> Log out
      </IssButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { useNavStore } from '@/store/useNavStore';
import { IssButton } from 'iss-ui-kit/components';
import { Icon24LogOut, Icon24Sun, Icon24Moon } from 'iss-ui-kit/icons';
import VToggle from '@/components/VToggle.vue';
import { useThemeStore } from '@/store/useThemeStore';

const store = useNavStore();
const showLogoutModal: Ref<boolean> = ref(false);
const themeStore = useThemeStore();

const isActive = computed(() =>{
  return themeStore.themeMode === 'dark'
    ? false
    : true;
});

const toggleTheme = () => {
  if (isActive.value) {
    themeStore.setTheme('dark');
  } else {
    themeStore.setTheme('light');
  }
};
</script>

<style lang="scss" scoped>
.v-header {
  position: relative;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px 0;

  &__title {
    display: flex;
    flex-direction: column;

    &-value {
      display: flex;
      font-size: 24px;
      font-weight: 700;
      line-height: 40px;
      color: var(--text-primary, #DADFE5);
      letter-spacing: 0.24px;

      &.skeleton {
        width: 130px;
      }
    }

    &-desc {
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      color: #9DA6B2;

      &.skeleton {
        width: 290px;
      }
    }
  }

  &__control {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__button,
  &__button:hover {
    color: var(--borders-destructive, #FF6875);
    border-color: var(--borders-destructive, #FF6875);
  }
}
</style>
