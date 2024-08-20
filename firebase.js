// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebase} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "flashcardsaas-404d7.firebaseapp.com",
  projectId: "flashcardsaas-404d7",
  storageBucket: "flashcardsaas-404d7.appspot.com",
  messagingSenderId: "699525519846",
  appId: "1:699525519846:web:e6941ac10b20c338a1de27",
  measurementId: "G-TKK2PDRR3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app);

export {db};