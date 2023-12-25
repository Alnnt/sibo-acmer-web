import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/InfoView.vue'
import { useInfoStore } from '@/stores/info.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'info',
      component: HomeView
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('@/views/TaskView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const infoStore = useInfoStore()
  if (to.name === 'task' && infoStore.info.cdkey === '') {
    next({ name: 'info' })
  }
  next()
})

export default router
