// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE,
  messagingSenderId: process.env.MESSAGE,
  appId: process.env.API_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export  default db