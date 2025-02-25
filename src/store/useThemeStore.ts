import { defineStore } from 'pinia';
import { useIssTheme, type UseIssTheme } from 'iss-ui-kit/composables';

export type ThemeMode = UseIssTheme['selectedMode']['value'];

export const useThemeStore = defineStore('Theme', () => {
  const { setThemeMode, themeMode } = useIssTheme(true);

  const setTheme = (value: ThemeMode) => {
    window.localStorage['THEME'] = value;
    setThemeMode(value);
  };

  return { themeMode, setTheme };
});
