// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgxGi_0IIx-I-H1W6jmkRo_4YdO6tmrk8",
  authDomain: "cpsc304project-group40.firebaseapp.com",
  projectId: "cpsc304project-group40",
  storageBucket: "cpsc304project-group40.appspot.com",
  messagingSenderId: "949817377151",
  appId: "1:949817377151:web:db07e5c18c238a4bfe5a4a",
  measurementId: "G-KQ77P0MQKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const analytics = getAnalytics(app);

export {app,auth, provider}