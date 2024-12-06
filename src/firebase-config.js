import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Ensure this is imported

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWIp3zH_XewDqf-9oB6Kfzb9tQDy5PITE",
  authDomain: "bookstore-eb8b4.firebaseapp.com",
  projectId: "bookstore-eb8b4",
  storageBucket: "bookstore-eb8b4.appspot.com",
  messagingSenderId: "310735558099",
  appId: "1:310735558099:web:330593276ddcc8d4150b26",
  measurementId: "G-LZ4GXPD8PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth
const provider = new GoogleAuthProvider(); // Google Auth Provider
const db = getFirestore(app); // Initialize Firestore database

export { auth, provider, db }; // Make sure db is exported
