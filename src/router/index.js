import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginSelection.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/loginerror",
    name: "loginerror",
    component: () => import("@/views/LoginError.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/citySignUp",
    name: "citySignUp",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/companySignUp",
    name: "companySignUp",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user != "error" && user != null) {
      if (to.name == "profile") {
        next();
      } else {
        if (user.role) {
          next();
        } else {
          next({
            name: "profile"
          });
        }
      }
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
