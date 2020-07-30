import firebase from "firebase/app";
const firebaseui = require("firebaseui");
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyCyyk5C2EroodL7zqf_K241D2V61HiKLkU",
  authDomain: "mountlock-e29ff.firebaseapp.com",
  databaseURL: "https://mountlock-e29ff.firebaseio.com",
  projectId: "mountlock-e29ff",
  storageBucket: "mountlock-e29ff.appspot.com",
  messagingSenderId: "57925845223",
  appId: "1:57925845223:web:672bf49ac199daf606e242",
  measurementId: "G-24NND7XB0R"
};

const app = firebase.initializeApp(config);
const auth = firebase.auth();
const functions = firebase.functions();

const authUI = new firebaseui.auth.AuthUI(auth);

const authUIConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: "select_account"
      }
    }
  ]
};

export default app;
export { auth, authUI, authUIConfig, functions };
