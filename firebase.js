// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj76zUihq_C_21SEV7o2xOJSaNvye3_7Y",
  authDomain: "ai-pantry-e0889.firebaseapp.com",
  projectId: "ai-pantry-e0889",
  storageBucket: "ai-pantry-e0889.appspot.com",
  messagingSenderId: "718062711",
  appId: "1:718062711:web:1a63572f330ea54da9b272",
  measurementId: "G-WF3TTBGC8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export {app, firestore};
