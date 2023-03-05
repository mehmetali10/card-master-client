// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

export const firebaseConfig = {
  apiKey: "AIzaSyBb4DIJr2LOP3xESACB_4RUJdb-wSuTyC0",
  authDomain: "card-master-8464b.firebaseapp.com",
  projectId: "card-master-8464b",
  storageBucket: "card-master-8464b.appspot.com",
  messagingSenderId: "837809690231",
  appId: "1:837809690231:web:a72353cb5f0187d13b1872",
  measurementId: "G-TSQWHBB93N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);