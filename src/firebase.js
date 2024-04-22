import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTu0CL6Brmv7Bc5Cd74DyzylGSEG8TrwA",
  authDomain: "yoko-206a5.firebaseapp.com",
  projectId: "yoko-206a5",
  storageBucket: "yoko-206a5.appspot.com",
  messagingSenderId: "457535399204",
  appId: "1:457535399204:web:6d4b8bab8c6d86b325bfb1",
  measurementId: "G-VX8W8H0FFQ",
};

firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export default firebase;
