import { createRouter, createWebHistory } from 'vue-router';
import GeneralView from '@/views/GeneralView.vue';
import AuthView from '@/views/AuthView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthView
    },
    {
      path: '/',
      name: 'General',
      component: GeneralView,
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/pages/ProfilePage.vue')
        },
        {
          path: 'map',
          name: 'Map',
          component: () => import('@/pages/MapPage/index.vue')
        }
      ]
    },
  ]
});
