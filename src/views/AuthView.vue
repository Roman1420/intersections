<template>
  <div
    class="auth-view"
    @keydown.enter="handleForm"
  >
    <div class="auth-view__wrapper">
      <div class="auth-view__info">
        <VLogo />
        <div class="auth-view__info-title">Intellisections</div>
      </div>
      <div class="auth-view__form">
        <div class="auth-view__form-title">Авторизация</div>
        <div class="auth-view__form-fields">
          <IssInput
            v-model="login"
            type="text"
            :placeholder="'login'"
          />
          <VPasswordInput
            v-model="password"
            :placeholder="'password'"
          />
        </div>
        <IssButton
          class="auth-view__form-button"
          @click="handleForm"
          mode="primary"
        >
          Войти
        </IssButton>
      </div>
      <div class="auth-view__footer">
        by ISS
      </div>
    </div>
    <div class="auth-view__crossroad-image">
      <img src="@/assets/images/crossroad-auth.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IssButton, IssInput } from 'iss-ui-kit/components';
import VPasswordInput from '@/components/VPasswordInput.vue';
import VLogo from "@/components/VLogo.vue";

const login = ref('');
const password = ref('');

const handleForm = () => {
  console.log('handle form');
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
  background-color: var(--background-content, #1C232E);

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
      color: var(--text-primary, #1B1D27);
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
      color: var(--text-accent-primary, #4A95FF);
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
    color: var(--text-tertiary, #76879F);
    text-align: center;
  }

  &__crossroad-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
