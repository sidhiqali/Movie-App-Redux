
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChryqz8BmEAHxYlRv2V8zm1_INYaBtqAU",
  authDomain: "flixverse-movie.firebaseapp.com",
  projectId: "flixverse-movie",
  storageBucket: "flixverse-movie.appspot.com",
  messagingSenderId: "948791417606",
  appId: "1:948791417606:web:976f12d3ae653f358f1c87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const  db = getFirestore(app)