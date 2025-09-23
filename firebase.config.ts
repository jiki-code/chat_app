// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQhYbuRluMLp53AhpwsT0nZiZqcLm45CA",
  authDomain: "chat-tutorial-987a0.firebaseapp.com",
  projectId: "chat-tutorial-987a0",
  storageBucket: "chat-tutorial-987a0.firebasestorage.app",
  messagingSenderId: "740682268318",
  appId: "1:740682268318:web:389aac499a444a31cfc58f",
  measurementId: "G-G2RPWBZ8TY"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };