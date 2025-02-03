// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZYV5S_1jtRNwLsea4f3GkuPwBb4wTdNs",
  authDomain: "blogging-app-66f20.firebaseapp.com",
  projectId: "blogging-app-66f20",
  storageBucket: "blogging-app-66f20.firebasestorage.app",
  messagingSenderId: "952682997519",
  appId: "1:952682997519:web:a200e997d7aa5a29b6807a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);