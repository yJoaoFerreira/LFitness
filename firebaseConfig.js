// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7TaSnJJWlU2g1EHlw_U0NvKTosSo7xMc",
  authDomain: "lfitness-e421c.firebaseapp.com",
  projectId: "lfitness-e421c",
  storageBucket: "lfitness-e421c.appspot.com",
  messagingSenderId: "239375261689",
  appId: "1:239375261689:web:cc882f3aa439a677aba728",
  measurementId: "G-ZBQ56JE3EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);