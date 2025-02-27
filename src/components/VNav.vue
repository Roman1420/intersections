<template>
  <div class="v-nav">
    <div class="v-nav__wrapper">
      <VLogo class="v-nav__logo" />
      <template v-if="store.navList.length > 0 && store.currentNav">
        <nav
          class="v-nav__list"
          :class="collapsed ? 'collapsed' : ''"
        >
          <RouterLink
            v-for="nav in store.navList"
            :key="nav.name"
            :to="nav.link"
            class="v-nav__list-item"
            :class="store.currentNav?.name === nav.name ? 'active' : ''"
          >
            <component
              :is="nav.icon"
              :active="store.currentNav?.name === nav.name"
            />
            <transition>
              <span v-if="collapsed">{{ $t(nav.title) }}</span>
            </transition>
          </RouterLink>
        </nav>
        <div
          class="v-nav__collapse v-nav__list-item"
          @click="collapse"
        >
          <CollapseIcon :active="collapsed" />
        </div>
      </template>
      <nav
        v-else
        class="v-nav__list"
      >
        <div class="v-nav__list-item skeleton active"></div>
        <div class="v-nav__list-item skeleton active"></div>
        <div class="v-nav__list-item skeleton active"></div>
        <div class="v-nav__list-item skeleton active"></div>
        <div class="v-nav__list-item skeleton active"></div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import VLogo from '@/components/VLogo.vue';
import { onMounted } from 'vue';
import CollapseIcon from './icons/CollapseIcon.vue';
import { Ref, ref } from 'vue';
import { useNavStore } from '@/store/useNavStore';
import { setCssParamValue } from '@/helpers/setCssParamValue';

const store = useNavStore();

const NAV_WIDTH = 87;
const NAV_WIDTH_COLLAPSED = 193;

onMounted(() => {
  // store.loadNavList();
  setCssParamValue('--nav-width', `${NAV_WIDTH}px`);
});

let collapsed: Ref<boolean> = ref(false);

const collapse = () => {
  if (collapsed.value) {
    setCssParamValue('--nav-width', `${NAV_WIDTH}px`);
  } else {
    setCssParamValue('--nav-width', `${NAV_WIDTH_COLLAPSED}px`);
  }

  collapsed.value = Boolean(!collapsed.value);
};
</script>

<style lang="scss" scoped>
.v-nav {
  padding: 8px 0 8px 8px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 16px 8px;
    background: var(--background-content, #1C232E);
    border-radius: 16px;
  }

  &__logo {
    align-self: flex-start;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: .3s;

    &.collapsed {
      .v-nav__list-item {
        padding: 16px 24px;
      }
    }

    &-item {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: flex-start;
      min-width: 56px;
      min-height: 56px;
      padding: 16px;
      text-decoration: none;
      border-radius: 8px;
      transition: .3s;

      svg {
        transition: .3s;
      }

      span {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: #9DA6B2;
      }

      &:hover {
        background-color: var(--button-icon-button-on-hover, #363E54)
      }

      &.active {
        background-color: var(--button-icon-button-content, #151C27);

        svg {
          transform: rotate(90deg);
        }
      }
    }
  }

  &__collapse {
    align-self: flex-start;
    margin-top: auto;
    margin-left: 3px;
    cursor: pointer;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity .1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
