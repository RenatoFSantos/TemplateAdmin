import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjhB6n0uVIdzOqAXykzEA-b-9WnFaAtE8",
  authDomain: "admintemplate-305ac.firebaseapp.com",
  projectId: "admintemplate-305ac",
  storageBucket: "admintemplate-305ac.appspot.com",
  messagingSenderId: "529914231942",
  appId: "1:529914231942:web:1b5dde6e7010a86876e507",
};

// Initialize Firebase
console.log("Inicializando Firebase");
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
