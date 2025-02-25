export const DEFAULT_LANGUAGE = 'ru';

export interface LocalizationInterface {
  lang: string,
  setLang: (lang: string) => void,
  getLocalization:  () => Promise<object>,
  createI18n: () => Promise<any>,
};
