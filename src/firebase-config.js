// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVdeCbY1Rqk2CPQUpGJuvxDnMxNLMCUkU",
  authDomain: "gamer-room-56152.firebaseapp.com",
  projectId: "gamer-room-56152",
  storageBucket: "gamer-room-56152.appspot.com",
  messagingSenderId: "138016005362",
  appId: "1:138016005362:web:cc18a4bb840aa71a27446b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();