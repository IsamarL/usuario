
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVV47Xd3mJZwJ0wVAoQX0I27wCUW0AsE4",
  authDomain: "usuario-fcb2c.firebaseapp.com",
  projectId: "usuario-fcb2c",
  storageBucket: "usuario-fcb2c.firebasestorage.app",
  messagingSenderId: "360246724343",
  appId: "1:360246724343:web:4c04552599a8fa076775f2"
};

// Initialize Firebase
const appFirebase= initializeApp(firebaseConfig);
export default appFirebase;