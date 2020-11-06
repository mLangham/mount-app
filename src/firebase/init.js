import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/performance";
import "firebase/analytics";

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
const db = firebase.firestore();
firebase.performance();
firebase.analytics();

const arrayUnion = array => firebase.firestore.FieldValue.arrayUnion(array);
const arrayRemove = array => firebase.firestore.FieldValue.arrayRemove(array);

export default app;
export { auth, db, functions, arrayUnion, arrayRemove };
