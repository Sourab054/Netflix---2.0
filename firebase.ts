// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDd4KAtLuVNL1gYtd_lfLOdjqOSOIyeBj8",
//   authDomain: "netflix2-cfa86.firebaseapp.com",
//   projectId: "netflix2-cfa86",
//   storageBucket: "netflix2-cfa86.appspot.com",
//   messagingSenderId: "633181432924",
//   appId: "1:633181432924:web:cb609631a83216c85b4a99",
//   measurementId: "G-4Y3DGBD6Z4",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBuu0YHXOcgmqWLZl-fiMn6lG2wUhdPg8k",
  authDomain: "next-firebase-stripe-39bf8.firebaseapp.com",
  databaseURL: "https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com",
  projectId: "next-firebase-stripe-39bf8",
  storageBucket: "next-firebase-stripe-39bf8.appspot.com",
  messagingSenderId: "777709922250",
  appId: "1:777709922250:web:134e5aa40137b7b006d133",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
