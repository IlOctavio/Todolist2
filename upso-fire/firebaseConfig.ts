// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA52tD1Cls_aAsnYVRq8jGdliAiVLpQYy8",
  authDomain: "upso-fire.firebaseapp.com",
  projectId: "upso-fire",
  storageBucket: "upso-fire.appspot.com",
  messagingSenderId: "234502283803",
  appId: "1:234502283803:web:3f670866acdd8d6f52cebe",
  measurementId: "G-XJ2GH55EV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };