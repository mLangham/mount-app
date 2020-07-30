import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import { functions } from "@/firebase/init.js";

Vue.use(Vuex);

const state = {
  user: null
};

const getters = {
  getUser: state => state.user
};

const mutations = {
  setUser: (state, payload) => {
    state.user = payload;
  },
  setCity: (state, payload) => {
    state.user = payload;
  },
  setCompany: (state, payload) => {
    state.user = payload;
  }
};

const actions = {
  setUser: async context => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    var raid = await functions.httpsCallable("getUserData")({
      uid: user.uid
    });
    if (!raid.data) {
      context.commit("setUser", "error");
    } else {
      context.commit("setUser", raid.data);
    }
  },
  setCity: async context => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    var raid = await functions.httpsCallable("getUserData")({
      uid: user.uid
    });
    if (!raid.data) {
      await functions.httpsCallable("createCityUser")({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      });
      raid = await functions.httpsCallable("getUserData")({
        uid: user.uid
      });
      context.commit("setCity", raid.data);
    } else {
      context.commit("setCity", raid.data);
    }
  },
  setCompany: async context => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    var raid = await functions.httpsCallable("getUserData")({
      uid: user.uid
    });
    if (!raid.data) {
      await functions.httpsCallable("createCompanyUser")({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      });
      raid = await functions.httpsCallable("getUserData")({
        uid: user.uid
      });
      context.commit("setCompany", raid.data);
    } else {
      context.commit("setCompany", raid.data);
    }
  },
  getUser: async context => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    var raid = await functions.httpsCallable("getUserData")({
      uid: user.uid
    });
    context.commit("setUser", raid.data);
  },
  logOut: async context => {
    await firebase.auth().signOut();
    context.commit("setUser", null);
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
