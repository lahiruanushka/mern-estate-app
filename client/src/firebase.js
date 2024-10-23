// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-68345.firebaseapp.com",
  projectId: "mern-estate-68345",
  storageBucket: "mern-estate-68345.appspot.com",
  messagingSenderId: "508069795471",
  appId: "1:508069795471:web:9bdd8c4f6a388314a042fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);