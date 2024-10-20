import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7TaSnJJWlU2g1EHlw_U0NvKTosSo7xMc",
  authDomain: "lfitness-e421c.firebaseapp.com",
  projectId: "lfitness-e421c",
  storageBucket: "lfitness-e421c.appspot.com",
  messagingSenderId: "239375261689",
  appId: "1:239375261689:web:cc882f3aa439a677aba728",
  measurementId: "G-ZBQ56JE3EG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };