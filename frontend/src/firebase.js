// Firebase initialization for the client app.
// NOTE: These web config values are not secrets — Firebase web API keys are
// safe to expose in client code. Access is controlled via Firestore security
// rules, not by hiding this config.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

// Analytics relies on `window` and must not run during the SSG build step,
// so initialise it lazily in the browser only.
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((supported) => {
        if (supported) getAnalytics(app);
      }),
    )
    .catch(() => {
      /* analytics is non-critical; ignore failures */
    });
}

export default app;
