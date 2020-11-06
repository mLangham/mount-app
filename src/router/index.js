import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: false
    }
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
    path: "/profile/:uid",
    name: "otherprofile",
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
    path: "/resetPw",
    name: "resetPw",
    component: () => import("@/views/ResetPw.vue"),
    meta: {
      requiresAuth: false
    }
  },

  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignUp.vue"),
    meta: {
      requiresAuth: false
    }
  },

  {
    path: "/finishsignup",
    name: "finishsignup",
    component: () => import("@/views/FinishSignUp.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/dataview",
    name: "dataview",
    component: () => import("@/views/DataView.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let user = store.state.user;
  if (user && to.name == "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  let user = store.state.user;
  if (user && to.name != "finishsignup" && user.role == null) {
    next({ name: "finishsignup" });
    // if the user is already finished with signing up they can't go back to finish sign up page
  } else if (user && to.name == "finishsignup" && user.role != null) {
    next({ name: "home" });
  } else {
    next();
  }
});

// if user tries to go to secure page without auth, takes them to login
// if user tries to go to secure page while logged in, takes them to page
// if page is not secure, user can go to page without logged in

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user.role == "approved" || user.role == "admin") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
