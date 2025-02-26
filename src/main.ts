import { createApp } from 'vue';
import { createPinia } from 'pinia';
import LocalizationService from './services/LocalizationService';
import { router } from './router';
import App from './App.vue';
import 'iss-ui-kit/dist/colors.css';
import 'iss-ui-kit/dist/iss-ui-kit.css';

const initApp = async () => {
  const pinia = createPinia();
  const i18n = await LocalizationService.createI18n();

  const app = createApp(App);

  app.use(pinia);
  app.use(i18n);
  app.use(router);
  app.mount('#app');

  app.provide('localization', {
    lang: LocalizationService.lang,
    setLang: LocalizationService.setLang
  });
};

initApp();
