// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKjAvinkm_l2VeX-AbzmkaYBWrhPiTMUxo",
    authDomain: "galaxleaf.firebaseapp.com",
    projectId: "galaxleaf",
    storageBucket: "galaxleaf.firebasestorage.app",
    messagingSenderId: "272784789246",
    appId: "1:272784789246:web:528abdaedbf7a6c6b11faf",
    measurementId: "G-VRLPC6HYY5"
};

// Initialize Firebase (SSR Safe)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Analytics (Client-side only)
if (typeof window !== 'undefined') {
    isSupported().then(yes => yes && getAnalytics(app));
}

export { app, auth };
