declare module 'vue-virtual-scroller' {
  import { DefineComponent } from 'vue';
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  export const RecycleScroller: DefineComponent<{}, {}, any>;
  export const DynamicScroller: DefineComponent<{}, {}, any>;
  export const DynamicScrollerItem: DefineComponent<{}, {}, any>;
}
