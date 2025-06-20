// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // if using Firebase Realtime DB
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnSEiZ48b6uYaX1qIr79Nq0tQc2RL6hxQ",
  authDomain: "foodorderapp-c7bca.firebaseapp.com",
  databaseURL: "https://foodorderapp-c7bca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodorderapp-c7bca",
  storageBucket: "foodorderapp-c7bca.firebasestorage.app",
  messagingSenderId: "895493783529",
  appId: "1:895493783529:web:803dabfb54a575ccf69578",
  measurementId: "G-01LR1Q0HEF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
export default app;
