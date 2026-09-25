
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaNQGcHe0nLnZKo7iTfGkh30zIPIPYAn4",
  authDomain: "insurance-billing-5244a.firebaseapp.com",
  projectId: "insurance-billing-5244a",
  storageBucket: "insurance-billing-5244a.firebasestorage.app",
  messagingSenderId: "288640194417",
  appId: "1:288640194417:web:85872b68b4214667c9c8d0",
  measurementId: "G-H9Y0GLMY2R"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app)