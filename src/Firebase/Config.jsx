import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//     apiKey: "AIzaSyCMVU4U98dHJTcSkeIGbJ7xBmP89W6_kFQ",
//     authDomain: "khss-88ea0.firebaseapp.com",
//     projectId: "khss-88ea0",
//     storageBucket: "khss-88ea0.appspot.com",
//     messagingSenderId: "1071997017382",
//     appId: "1:1071997017382:web:83a9878ed38d9f6018f5e7",
//     measurementId: "G-WTZ5073SWM"
// };

const firebaseConfig = {
    apiKey: "AIzaSyD730LSeb6wRHKZIUrjjfdKxY5CvgyQWwo",
    authDomain: "attender-32f31.firebaseapp.com",
    projectId: "attender-32f31",
    storageBucket: "attender-32f31.appspot.com",
    messagingSenderId: "515809390623",
    appId: "1:515809390623:web:34942ea0cc8f2bd754252a",
    measurementId: "G-0Y7K9QGLFB"
  };

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
