// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/homePage.vue'
import UserDetails from '@/pages/userDetails.vue'
import EditUser from "@/pages/EditUser.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails,
    props: true
  },
    {
    path: "/edit/:id",
    name: "EditUser",
    component: EditUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
