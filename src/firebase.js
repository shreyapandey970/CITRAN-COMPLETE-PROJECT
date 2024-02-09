import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAwwPjkgDP977oGrSWDyVwXC0QKgCAhs-k",
  authDomain: "fir-otp-e4f23.firebaseapp.com",
  projectId: "fir-otp-e4f23",
  storageBucket: "fir-otp-e4f23.appspot.com",
  messagingSenderId: "125907317711",
  appId: "1:125907317711:web:ed91cdcd75b2e9d52bd8ba",
  measurementId: "G-JJ2Q7QMZE9"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const storage = getStorage();
  export const db = getFirestore();


  /* apiKey: "AIzaSyB9_dmZssd9WFcnnlpfbmpRiLh7hiZEptQ",
  authDomain: "finaltry-7a7d3.firebaseapp.com",
  projectId: "finaltry-7a7d3",
  storageBucket: "finaltry-7a7d3.appspot.com",
  messagingSenderId: "208225002353",
  appId: "1:208225002353:web:c1fbf91be944b191e78cd0",
  measurementId: "G-RPDQ5XELES"*/