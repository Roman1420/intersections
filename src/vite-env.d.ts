/// <reference types="vite/client" />

declare module 'd3';
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_HTTP_SERVER: string;
  readonly VITE_WS_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
