// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkjoQwW4EEMfUJnNBerqyZSkRSx56Pmww",
  authDomain: "chat-app-500c1.firebaseapp.com",
  projectId: "chat-app-500c1",
  storageBucket: "chat-app-500c1.appspot.com",
  messagingSenderId: "441542777397",
  appId: "1:441542777397:web:1b55c930b2379a05caaf7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provoider = new GoogleAuthProvider()
export const db =getFirestore(app)