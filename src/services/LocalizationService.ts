import { createI18n } from 'vue-i18n';
import type { LocalizationInterface } from '@/interfaces/ILocalization';
import { DEFAULT_LANGUAGE } from '@/interfaces/ILocalization';

class LocalizationService implements LocalizationInterface {
  private _lang: string = DEFAULT_LANGUAGE;
  readonly fallbackLocale: string = DEFAULT_LANGUAGE;

  get lang(): string {
    return this._lang;
  }

  set lang(lang: string) {
    if (lang === this._lang) return;
    this._lang = lang;
  }

  setLang = (lang: string): void => {
    this.lang = lang;
  };

  async getLocalization(): Promise<object> {
    const link: string = (import.meta.env?.VITE_DEV_ENV === 'LOCAL')
      ? '/localization.json'
      : './localization.json';
    const localization: any = await fetch(link);
    if (!localization.ok) return {};
    return await localization.json();
  }

  async createI18n(): Promise<any> {
    const messages: any = await this.getLocalization() || {};

    if (!Object.entries(messages).length) {
      console.log('ERROR: LocalizationService createI18n() messages: ', messages);
    }

    const locationSearch: string = window.location.search.substring(1) || '';

    const params: URLSearchParams = new URLSearchParams(locationSearch);
    const paramLanguage: string = params.get('language') || '';

    const allLocales: string[] = Object.keys(messages) || [];
    const isFindLocale: boolean = !!allLocales.find(locale => locale === paramLanguage);

    const startLocale: string = isFindLocale
      ? paramLanguage?.toLowerCase()
      : this.lang;

    this.setLang(startLocale);

    return createI18n({
      locale: this.lang,
      fallbackLocale: this.fallbackLocale,
      warnHtmlMessage: false,
      legacy: false,
      messages
    });
  }
}

export default new LocalizationService();
