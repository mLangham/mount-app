import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

var app = null;
firebase.auth().onAuthStateChanged(async () => {
  if (!app) {
    if (document.referrer.endsWith("citySignUp")) {
      await store.dispatch("setCity");
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    } else if (document.referrer.endsWith("companySignUp")) {
      await store.dispatch("setCompany");
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    } else {
      await store.dispatch("setUser");
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    }
  }
});
