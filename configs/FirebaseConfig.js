// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB90qLZekqY_bgyGBU6QsFZtCw5g0PAjDA",
  authDomain: "metflix-movieapp-reactnative.firebaseapp.com",
  projectId: "metflix-movieapp-reactnative",
  storageBucket: "metflix-movieapp-reactnative.appspot.com",
  messagingSenderId: "143324571636",
  appId: "1:143324571636:web:ba14f3c2dcda6982837ba1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);