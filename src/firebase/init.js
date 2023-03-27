import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBRPXWkKIBJwuPHwNr5jAeQotFbvEdQoH0",
    authDomain: "mushaf-game.firebaseapp.com",
    projectId: "mushaf-game",
    storageBucket: "mushaf-game.appspot.com",
    messagingSenderId: "598931044604",
    appId: "1:598931044604:web:4fb0e36629bc1337127f79",
    measurementId: "G-BJM0YE4FHS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
export default db