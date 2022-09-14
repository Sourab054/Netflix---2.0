import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuu0YHXOcgmqWLZl-fiMn6lG2wUhdPg8k",
  authDomain: "next-firebase-stripe-39bf8.firebaseapp.com",
  databaseURL: "https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com",
  projectId: "next-firebase-stripe-39bf8",
  storageBucket: "next-firebase-stripe-39bf8.appspot.com",
  messagingSenderId: "777709922250",
  appId: "1:777709922250:web:134e5aa40137b7b006d133",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
