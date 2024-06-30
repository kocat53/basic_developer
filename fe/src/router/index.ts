import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/user/Login.vue"),
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("@/views/user/SignUp.vue"),
    },
  ],
});

export default router
