import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBUKG8JI-toXKbrc9LFVsNS3ElKxATGBns",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;

// initially sets app to null
var app = null;

// on user login/logout sets app variable
firebase.auth().onAuthStateChanged(async () => {
  if (!app) {
    await store.dispatch("getUser");
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
