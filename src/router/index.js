import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/LandingPage.vue";
import Workoutfill from "../views/Workoutfill.vue";
import Loginpage from "../views/Loginpage.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "landingpage",
    component: HomeView,
  },
  {
    path: "/fill",
    name: "fillworkout",
    component: Workoutfill, // Now eager
  },
  {
    path: "/login",
    name: "loginpage",
    component: Loginpage, // Now eager
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile, // Now eager
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
