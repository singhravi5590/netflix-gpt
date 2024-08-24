// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWCoPu1Py_6_G1vgE6Y3EgzMOHVn7rzPs",
  authDomain: "netflix2-gpt.firebaseapp.com",
  projectId: "netflix2-gpt",
  storageBucket: "netflix2-gpt.appspot.com",
  messagingSenderId: "252769221366",
  appId: "1:252769221366:web:9774a9b3c4cbf2e7700ad7",
  measurementId: "G-DQY55V4J78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();