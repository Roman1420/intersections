import { defineStore } from "pinia";
import {
  computed,
  defineAsyncComponent,
  shallowRef,
  type ComponentPublicInstance,
  type DefineComponent,
  type Ref
} from "vue";
import { useRouter } from "vue-router";
import { ERouteNames } from "@/enums/ERouteNames";


interface NavItem {
  name: string;
  link: string;
  icon: DefineComponent<{}, {}, ComponentPublicInstance>;
  title: string;
  desc?: string;
}

export const useNavStore = defineStore("Nav", () => {
  const mockData: NavItem[] = [
    {
      name: ERouteNames.MAP_ROUTE_NAME,
      link: '/map',
      icon: defineAsyncComponent(() => import("iss-ui-kit/icons").then(icons => icons.Icon24PlaceFilled)) as DefineComponent<{}, {}, ComponentPublicInstance>,
      title: 'menu.map',
      // desc: 'Отслеживание транспортного потока в режиме онлайн',
    },
    {
      name:  ERouteNames.INCIDENTS_ROUTE_NAME,
      link: "/incidents",
      icon: defineAsyncComponent(() =>
        import("iss-ui-kit/icons").then((icons) => icons.Icon24CarCrash),
      ) as DefineComponent<{}, {}, ComponentPublicInstance>,
      title: "menu.incidents",
    },
  ];

  const navList: Ref<NavItem[]> = shallowRef(mockData);

  const router = useRouter();
  const currentNav = computed(() => {
    return navList.value.find(
      (element: NavItem) => element.name === router.currentRoute.value.name,
    );
  });

  // async function loadNavList() {
  //   setTimeout(() => {
  //     navList.value = mockData;
  //   }, 2000);
  // }

  return { navList, currentNav };
});
