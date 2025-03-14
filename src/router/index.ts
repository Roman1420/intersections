import { ERouteNames } from "@/enums/ERouteNames";
import AuthView from "@/views/AuthView.vue";
import GeneralView from "@/views/GeneralView.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: ERouteNames.NOT_FOUND_ROUTE_NAME,
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/auth",
      name: ERouteNames.AUTH_ROUTE_NAME,
      component: AuthView,
    },
    {
      path: "/",
      name: ERouteNames.GENERAL_ROUTE_NAME,
      component: GeneralView,
      children: [
        {
          path: "/profile",
          name: ERouteNames.PROFILE_ROUTE_NAME,
          component: () => import("@/pages/ProfilePage.vue"),
        },
        {
          path: "/map",
          name: ERouteNames.MAP_ROUTE_NAME,
          component: () => import("@/pages/MapPage/index.vue"),
        },
        // {
        //   path: "/incidents",
        //   name: ERouteNames.INCIDENTS_ROUTE_NAME,
        //   component: () => import("@/pages/IncidentsPage/index.vue"),
        // },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const isAuthenticated = true;
  const isCurrentRouteAuth = to.name === ERouteNames.AUTH_ROUTE_NAME;
  const isGeneralView = to.name === ERouteNames.GENERAL_ROUTE_NAME;

  if (!isAuthenticated && !isCurrentRouteAuth) {
    return { name: ERouteNames.AUTH_ROUTE_NAME };
  }

  if (isAuthenticated && (isCurrentRouteAuth || isGeneralView)) {
    return { name: ERouteNames.PROFILE_ROUTE_NAME };
  }
});
