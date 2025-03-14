<template>
  <div class="auth-view" @keydown.enter="handleForm">
    <div class="auth-view__wrapper">
      <div class="auth-view__info">
        <VLogo />
        <div class="auth-view__info-title">Intellisections</div>
      </div>
      <div class="auth-view__form">
        <div class="auth-view__form-title">
          {{ $t("auth.authorization") }}
        </div>
        <div class="auth-view__form-fields">
          <IssInput v-model="login" type="text" :placeholder="$t('auth.login')" />
          <VPasswordInput v-model="password" :placeholder="$t('auth.password')" />
        </div>
        <IssButton class="auth-view__form-button" mode="primary" size="l" @click="handleForm">
          {{ $t("auth.logIn") }}
        </IssButton>
      </div>
      <div class="auth-view__footer">by ISS</div>
    </div>
    <img class="auth-view__crossroad-image" src="@/assets/images/crossroad-auth.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import VLogo from "@/components/VLogo.vue";
import VPasswordInput from "@/components/VPasswordInput.vue";
import { router } from "@/router";
import { ERouteNames } from "@/enums/ERouteNames";
import { IssButton, IssInput } from "iss-ui-kit/components";
import { ref } from "vue";

const login = ref("");
const password = ref("");

const handleForm = () => {
  if (login.value === "admin" && password.value === "1") {
    router.push({ name: ERouteNames.MAP_ROUTE_NAME });
  }
};
</script>

<style lang="scss" scoped>
.auth-view {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  padding: 26px;
  overflow: hidden;
  background-color: var(--background-content, #1c232e);

  &::before,
  &::after {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    content: "";
    border-radius: 50%;
  }

  &__form,
  &__footer {
    z-index: 2;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    justify-content: space-between;
    width: 35%;
    height: 100%;
    padding: 0 32px;
    border-radius: 16px;
  }

  &__form {
    width: 300px;

    &-title {
      margin-bottom: 80px;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 32px; /* 133.333% */
      color: var(--text-primary, #1b1d27);
      text-align: center;
      letter-spacing: 0.24px;
    }

    &-fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    &-button {
      width: 100%;
    }
  }

  &__info {
    display: flex;
    gap: 0 4px;
    align-items: center;
    padding: 12px;
    margin-top: 80px;

    &-title {
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 40px; /* 125% */
      color: var(--text-accent-primary, #4a95ff);
      letter-spacing: 0.32px;
    }

    @media (width <= 1400px) {
      margin-top: 40px;
    }
  }

  &__footer {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-tertiary, #76879f);
    text-align: center;
  }

  &__crossroad-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 61%;
    max-height: 100%;
    object-fit: contain;
    object-position: right;
  }
}
</style>
