// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔥 added

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDyvW_qe05ugepIwMBqsKbiIm-z-l3UrlU",
  authDomain: "career-craft-d9fda.firebaseapp.com",
  projectId: "career-craft-d9fda",
  storageBucket: "career-craft-d9fda.firebasestorage.app",
  messagingSenderId: "322073770984",
  appId: "1:322073770984:web:8bb6ef8d7f6332a918825d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // 🔥 added Firestore init

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { auth, db, googleProvider, appleProvider };


