import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import("@/views/Login") },
  { path: '/register', component: () => import("@/views/Register"), meta: { authorization: true } },
  { path: '/personal', component: () => import("@/views/Personal"), meta: { authorization: true } },
  { path: '/edit-profile', component: () => import("@/views/EditProfile"), meta: { authorization: true } },
  { path: '/follow', component: () => import("@/views/Follow"), meta: { authorization: true } },
  { path: '/comment', component: () => import("@/views/Comment"), meta: { authorization: true } },
  { path: '/star', component: () => import("@/views/Star"), meta: { authorization: true } },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
