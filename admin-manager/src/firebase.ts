// Firebase initialization for the admin dashboard.
//
// This points at the SAME Firebase project as the public registration site
// (frontend/src/firebase.js) so the dashboard reads the participant records
// the form writes. The web config values are not secrets — Firebase web API
// keys are safe to expose in client code; access is controlled by Firestore
// security rules, not by hiding this config.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2Qi1M2YvkX3aesFIUbFn89_v7R8KG90c",
  authDomain: "icfcui.firebaseapp.com",
  projectId: "icfcui",
  storageBucket: "icfcui.firebasestorage.app",
  messagingSenderId: "459002534105",
  appId: "1:459002534105:web:2d77a6b1462c9d3305c6c8",
  measurementId: "G-6Q7RQEV8CX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
