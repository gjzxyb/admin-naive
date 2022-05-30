import { createRouter, createWebHashHistory, RouteRecordRaw, RouterView } from 'vue-router'
import applayout from '@/layout/index.vue'
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect/:path(.*)*',
    name: 'Redirect',
    meta: { hidden: true, ignoreAuth: true },
    redirect: (to) => {
      const path = to.params.path
      return {
        path: `/${Array.isArray(path) ? path.join('/') : path}`,
        query: to.query,
        replace: true,
      }
    },
  },
  {
    path: '/error-page',
    name: 'error-page',
    redirect: '/error-page/404',
    component: RouterView,
    meta: { title: 'error-page', hidden: true, ignoreAuth: true },
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: { title: '404', ignoreAuth: true },
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/error-page/500.vue'),
        meta: { title: '500', ignoreAuth: true },
      },
    ],
  },
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    meta: { hidden: true, ignoreAuth: true },
    redirect: (to) => {
      return { name: '404', query: { path: to.path }, replace: true }
    },
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: applayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '仪表盘', affixTab: true, sort: -1 },
      },
    ],
  },
]

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // hash 模式
  // history: createWebHistory(import.meta.env.BASE_URL), // HTML5 模式
  routes: constantRoutes,
})

// 自定义添加路由守卫等

export default router
