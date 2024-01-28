// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQcJvIgidYB51hRJafqBOpbdIJlnejVwk",
  authDomain: "todo-app-134e0.firebaseapp.com",
  projectId: "todo-app-134e0",
  storageBucket: "todo-app-134e0.appspot.com",
  messagingSenderId: "677209122034",
  appId: "1:677209122034:web:745fe73ca1fdb1630e1c6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);