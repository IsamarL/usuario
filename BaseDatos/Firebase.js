// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- Importa Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMDoPfpL2b2BOpUHw1-PBykjZphDhqe1A",
  authDomain: "clientes-1760c.firebaseapp.com",
  projectId: "clientes-1760c",
  storageBucket: "clientes-1760c.firebasestorage.app",
  messagingSenderId: "677151986707",
  appId: "1:677151986707:web:18f267064ea66089359be6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
