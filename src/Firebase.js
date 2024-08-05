// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCs70ZsMY6JsYtt49B6vTLyNbz3bv8hlj4",
    authDomain: "apnachatt-302a8.firebaseapp.com",
    projectId: "apnachatt-302a8",
    storageBucket: "apnachatt-302a8.appspot.com",
    messagingSenderId: "360015365202",
    appId: "1:360015365202:web:c93bb01d2d61a3aecccb8b",
    measurementId: "G-HBYERGQB1Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();