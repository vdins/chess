import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA8sb5euLoLqplTpibrrSbSZKZi5DZec80",
  authDomain: "caturan-7226c.firebaseapp.com",
  databaseURL: "https://caturan-7226c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "caturan-7226c",
  storageBucket: "caturan-7226c.firebasestorage.app",
  messagingSenderId: "1327517230",
  appId: "1:1327517230:web:e2dfd617a576b70e9399bf",
  measurementId: "G-X0RZWGJR01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, auth, firestore, database };
