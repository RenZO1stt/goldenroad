// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuHIHvMFji89is1XVetH_4DiaK_utwaPA",
  authDomain: "golden-road-a8ec9.firebaseapp.com",
  projectId: "golden-road-a8ec9",
  storageBucket: "golden-road-a8ec9.firebasestorage.app",
  messagingSenderId: "94351327740",
  appId: "1:94351327740:web:c8936e12c8a755d7fbf279",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
  app,
};
