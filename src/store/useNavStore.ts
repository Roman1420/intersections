import { defineStore } from 'pinia';
import {
  shallowRef,
  type Ref,
  defineAsyncComponent,
  type DefineComponent,
  computed,
  type ComponentPublicInstance
} from 'vue';
import { useRouter } from 'vue-router';
import { Icon24PlaceFilled } from "iss-ui-kit/icons";

interface NavItem {
  name: string,
  link: string,
  icon: DefineComponent<{}, {}, ComponentPublicInstance>,
  title: string,
  desc?: string
};

export const useNavStore = defineStore('Nav', () => {
  const mockData: NavItem[] = [
    {
      name: 'Map',
      link: '/map',
      icon: defineAsyncComponent(Icon24PlaceFilled) as DefineComponent<{}, {}, ComponentPublicInstance>,
      title: 'Map',
      // desc: 'Отслеживание транспортного потока в режиме онлайн',
    },
  ];

  const navList: Ref<NavItem[]> = shallowRef(mockData);

  const router = useRouter();
  const currentNav = computed(() => {
    return navList.value.find((element: NavItem) => element.name === router.currentRoute.value.name);
  });

  // async function loadNavList() {
  //   setTimeout(() => {
  //     navList.value = mockData;
  //   }, 2000);
  // }

  return { navList, currentNav };
});
