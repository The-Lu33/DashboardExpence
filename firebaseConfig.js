// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLeL4z4gPsGjqJzvj5t74EtU3gpovGfIQ",
  authDomain: "personal-dashoboard.firebaseapp.com",
  projectId: "personal-dashoboard",
  storageBucket: "personal-dashoboard.firebasestorage.app",
  messagingSenderId: "160144609693",
  appId: "1:160144609693:web:9a9e8d9d1de46d9296df74",
  measurementId: "G-EC8W2GWP0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);