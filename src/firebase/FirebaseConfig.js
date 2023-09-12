import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAgQsocDyW7FT4Uwagm8BqE7WdzTuyWhJs",
    authDomain: "sample-project-85754.firebaseapp.com",
    projectId: "sample-project-85754",
    storageBucket: "sample-project-85754.appspot.com",
    messagingSenderId: "31425415824",
    appId: "1:31425415824:web:c2ddd5d477117d243fa615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore()
export const auth = getAuth()

export const provider = new GoogleAuthProvider();

export default firestore