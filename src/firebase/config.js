// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiSWRESACq6Hjm_1857EjfmoL06qd5798",
  authDomain: "muso-bella.firebaseapp.com",
  projectId: "muso-bella",
  storageBucket: "muso-bella.appspot.com",
  messagingSenderId: "490765989267",
  appId: "1:490765989267:web:028046405dcd1f2e976466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getFirestore()
const auth = getAuth()
const storage = getStorage()
const timestamp = serverTimestamp

export { app, store, auth, storage, timestamp }