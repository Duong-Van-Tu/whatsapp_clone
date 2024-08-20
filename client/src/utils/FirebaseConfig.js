// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCedzhDNLYu7fsFhZTqmaSK4iyLnciWnM",
  authDomain: "whatsapp-clone-bac7e.firebaseapp.com",
  projectId: "whatsapp-clone-bac7e",
  storageBucket: "whatsapp-clone-bac7e.appspot.com",
  messagingSenderId: "988847269690",
  appId: "1:988847269690:web:dcdb98ef0974a890db9203",
  measurementId: "G-QNH8B6XW6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);