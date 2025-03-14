<template>
  <div class="profile-page">
    <div class="profile-page__header">
      <div class="profile-page__header-title">Human Workovich</div>
      <IssButton
        class="profile-page__header-button"
        mode="bordered"
        size="l"
        @click="logOut"
      >
        <Icon24LogOut /> Log out
      </IssButton>
    </div>
    <div class="profile-page__content">
      Profile settings coming soon
    </div>
  </div>
</template>

<script setup lang="ts">
import { ERouteNames } from "@/enums/ERouteNames";
import { router } from "@/router";
import { IssButton } from 'iss-ui-kit/components';
import { Icon24LogOut } from 'iss-ui-kit/icons';

const logOut = () => {
  router.push({ name: ERouteNames.AUTH_ROUTE_NAME });
}
</script>

<style scoped lang="scss">
.profile-page {
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

    &-button,
    &-button:hover {
      color: var(--borders-destructive, #FF6875);
      border-color: var(--borders-destructive, #FF6875);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: Golos;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 133.333% */
    color: var(--text-tertiary, #76879F);
    letter-spacing: 0.24px;
  }
}
</style>
