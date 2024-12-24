// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAlMvZk77F_yTB1TNSPT8mpyz69_coSsB8",
  authDomain: "futball-hausa.firebaseapp.com",
  projectId: "futball-hausa",
  storageBucket: "futball-hausa.appspot.com",
  messagingSenderId: "225270487605", 
  appId: "1:225270487605:web:2caec9cf4aa426648cef7c",
  measurementId: "G-LNJ2MXJXVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app,
    auth,
    db
}