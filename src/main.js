import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// initially sets app to null
var app = null;

/** on user login/logout sets app variable
 *  sets userType on sign up based on URL (see store)
 */
firebase.auth().onAuthStateChanged(async () => {
  if (!app) {
    if (document.referrer.endsWith("citySignUp")) {
      await store.dispatch("createCityUser");
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    } else if (document.referrer.endsWith("companySignUp")) {
      await store.dispatch("createCompanyUser");
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    } else {
      await store.dispatch("loginUser");
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    }
  }
});
