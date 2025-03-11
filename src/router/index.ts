import { createRouter, createWebHistory } from 'vue-router';
import GeneralView from '@/views/GeneralView.vue';
import AuthView from '@/views/AuthView.vue';
import { ROUTE_NAMES } from "@/constants/routeNames";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: ROUTE_NAMES.NOT_FOUND_ROUTE_NAME,
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/auth',
      name: ROUTE_NAMES.AUTH_ROUTE_NAME,
      component: AuthView
    },
    {
      path: '/',
      name: ROUTE_NAMES.GENERAL_ROUTE_NAME,
      component: GeneralView,
      children: [
        {
          path: '/profile',
          name: ROUTE_NAMES.PROFILE_ROUTE_NAME,
          component: () => import('@/pages/ProfilePage.vue')
        },
        {
          path: '/map',
          name: ROUTE_NAMES.MAP_ROUTE_NAME,
          component: () => import('@/pages/MapPage/index.vue')
        }
      ]
    },
  ]
});

router.beforeEach((to) => {
  const isAuthenticated = true;
  const isCurrentRouteAuth = to.name === ROUTE_NAMES.AUTH_ROUTE_NAME;
  const isGeneralView = to.name === ROUTE_NAMES.GENERAL_ROUTE_NAME;

  if (!isAuthenticated && !isCurrentRouteAuth) {
      return { name: ROUTE_NAMES.AUTH_ROUTE_NAME };
  }

  if (isAuthenticated && (isCurrentRouteAuth || isGeneralView)) {
      return { name: ROUTE_NAMES.PROFILE_ROUTE_NAME };
  }
});
