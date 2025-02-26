<template>
  <div
    class="auth-view"
    @keydown.enter="handleForm"
  >
    <div class="auth-view__form">
      <div class="auth-view__info">
        <div class="auth-view__info-block">
          <div class="auth-view__info-title">SecurOS Intersection</div>
          <div class="auth-view__info-desc">Intellisections</div>
        </div>
      </div>
      <div class="auth-view__form-title">Авторизация</div>
      <div class="auth-view__form-fields">
        <IssInput
          v-model="login"
          type="text"
          :placeholder="'login'"
        />
        <IssInput
          v-model="password"
          type="password"
          :placeholder="'pass'"
        />
      </div>
      <IssButton
        @click="handleForm"
        mode="primary"
      >Войти</IssButton>
    </div>
    <div class="auth-view__footer">
    </div>
    <div class="auth-view__decorative-background"></div>
    <div class="auth-view__logo">
    </div>
  </div>
</template>

<script setup lang="ts">
import { IssButton, IssInput } from 'iss-ui-kit/components';

const login = '';
const password = '';

const handleForm = () => {
  console.log('handle form');
};
</script>

<style lang="scss" scoped>
$animation-duration: 3s;
$animation-function: ease;

.auth-view {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-page, #121720);

  &::before, &::after {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    content: '';
    border-radius: 50%;
  }

  &__form, &__footer {
    z-index: 2;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    min-width: 400px;
    padding: 48px;
    background-color: var(--background-content, #1C232E);
    border-radius: 16px;
    box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 24%);
    animation: $animation-function animation-form $animation-duration;

    &-title {
      font-size: 22px;
      font-weight: 700;
      line-height: 26px;
      color: var(--text-primary, #DADFE5);
      text-align: center;
      letter-spacing: 0.01em;
    }

    &-fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  &__info {
    display: flex;
    align-items: center;

    &-block {
      display: flex;
      flex-direction: column;
      margin-left: 4px;
    }

    &-title {
      font-size: 14px;
      font-weight: 600;
      line-height: 16px;
      color: var(--text-primary, #DADFE5);
    }

    &-desc {
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      color: var(--text-tertiary, #5F656C);
    }
  }

  &__footer {
    position: absolute;
    bottom: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 24px;
    animation: $animation-function animation-opacity $animation-duration;
  }

  &__version {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: #6A7380;
  }

  &__logo {
    $logo-size: 100px;
    position: absolute;
    top: calc(50% - (#{$logo-size} / 2));
    left: calc(50% - (#{$logo-size} / 2));
    width: $logo-size;
    height: $logo-size;
    opacity: 0;
    animation: $animation-function animation-logo $animation-duration;
  }

}

@keyframes animation-decorate-top {
  0% {
    transform: translateY(-100%);
  }

  50% {
    transform: translateY(-25%);
  }

  100% {
    transform: translateY(-100%);
  }
}

@keyframes animation-decorate-bottom {
  0% {
    transform: translateY(100%);
  }

  50% {
    transform: translateY(25%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes animation-logo {
  0% {
    opacity: 0;
    transform: rotate(90deg) scale(.5);
  }

  10% {
    opacity: 0;
    transform: rotate(90deg) scale(.5);
  }

  50% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  100% {
    opacity: 0;
  }
}

@keyframes animation-form {
  0% {
    transform: translateY(-100vh);
  }

  50% {
    transform: translateY(-100vh);
  }

  100% {
    transform: translateY(0%);
  }
}

@keyframes animation-opacity {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
