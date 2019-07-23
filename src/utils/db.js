import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyCuMclYf2KfGsi3NWbZ2ObQ2mAQOro2aik",
  authDomain: "fir-32b8f.firebaseapp.com",
  databaseURL: "https://fir-32b8f.firebaseio.com",
  projectId: "fir-32b8f",
  storageBucket: "fir-32b8f.appspot.com",
  messagingSenderId: "413648148099"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth, firebase };
