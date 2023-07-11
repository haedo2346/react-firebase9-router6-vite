// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCReL7poarcFh3VNV3zAbWNXRk_EpYVIEM",
  authDomain: "react-2022-4e85e.firebaseapp.com",
  projectId: "react-2022-4e85e",
  storageBucket: "react-2022-4e85e.appspot.com",
  messagingSenderId: "389878242584",
  appId: "1:389878242584:web:f60496eefb8b49f2f4526d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}