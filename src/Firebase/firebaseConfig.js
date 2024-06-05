// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByTcD8QKG8Htjgs_QGUInh0ix1vVEkJ-8",
    authDomain: "pruebas2damsosa.firebaseapp.com",
    projectId: "pruebas2damsosa",
    storageBucket: "pruebas2damsosa.appspot.com",
    messagingSenderId: "13387498995",
    appId: "1:13387498995:web:8ef06799dafe4a29307e86",
    //measurementId: "G-K6RH7K4MW9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };