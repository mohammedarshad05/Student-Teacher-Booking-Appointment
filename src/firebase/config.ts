import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdSBmIaW71Ib1y82chlsxliVtRG2ZdsDk",
  authDomain: "student-teacher-booking-e55fb.firebaseapp.com",
  projectId: "student-teacher-booking-e55fb",
  storageBucket: "student-teacher-booking-e55fb.appspot.com", // ✅ fixed here
  messagingSenderId: "940033250306",
  appId: "1:940033250306:web:27c8e55c26040d88cdc31b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
