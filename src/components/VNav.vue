<template>
  <div class="v-nav">
    <div class="v-nav__wrapper">
      <VLogo class="v-nav__logo" />
      <template v-if="navList.length > 0">
        <nav class="v-nav__list">
          <RouterLink
            v-for="nav in navList"
            :key="nav.name"
            :to="nav.link"
            class="v-nav__list-item"
            :class="currentNav?.name === nav.name ? 'active' : ''"
          >
            <component
              :is="nav.icon"
              :active="currentNav?.name === nav.name"
            />
            <span>{{ $t(nav.title) }}</span>
          </RouterLink>
        </nav>
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
      <RouterLink
        :to="{ name: PROFILE_ROUTE_NAME }"
        class="v-nav__user v-nav__list-item"
      >
        <VUser/>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import VLogo from '@/components/VLogo.vue';
import VUser from "@/components/VUser.vue";
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
// import { Ref, ref } from 'vue';
import { useNavStore } from '@/store/useNavStore';
import { setCssParamValue } from '@/helpers/setCssParamValue';
import { PROFILE_ROUTE_NAME } from "@/constants/routeNames";

const { navList, currentNav } = storeToRefs(useNavStore());

const NAV_WIDTH = 132;
// const NAV_WIDTH_COLLAPSED = 193;

onMounted(() => {
  setCssParamValue('--nav-width', `${NAV_WIDTH}px`);
});

// let collapsed: Ref<boolean> = ref(false);

/* const collapse = () => {
  if (collapsed.value) {
    setCssParamValue('--nav-width', `${NAV_WIDTH}px`);
  } else {
    setCssParamValue('--nav-width', `${NAV_WIDTH_COLLAPSED}px`);
  }

  collapsed.value = Boolean(!collapsed.value);
}; */
</script>

<style lang="scss" scoped>
.v-nav {
  width: var(--nav-width);
  padding: 26px 0;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 16px 8px;
    background: var(--background-content, #1C232E);
    border-radius: 0 16px 16px 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: .3s;

    &-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      justify-content: center;
      min-width: 88px;
      min-height: 88px;
      padding: 16px 8px;
      text-decoration: none;
      border-radius: 12px;
      transition: .3s;

      svg {
        color: var(--text-secondary, #4E5A6C);
        transition: .3s;
      }

      span {
        /* Body Small 500 */
        font-family: Golos;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        color: var(--text-secondary, #4E5A6C);
        text-align: center;
      }

      &:hover {
        background-color: var(--background-page, #F5F7F9);
      }

      &.active {
        background-color: var(--background-page, #F5F7F9);

        span {
          color: var(--text-accent-primary, #4A95FF);
        }

        svg {
          color: var(--text-accent-primary, #4A95FF);
        }
      }
    }
  }

  &__user {
    margin-top: auto;
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
