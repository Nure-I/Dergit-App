// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCCI0RMCTf24Lwfl99b2tX3APaHKKdL3OU",
	authDomain: "dergit.firebaseapp.com",
	projectId: "dergit",
	storageBucket: "dergit.appspot.com",
	messagingSenderId: "184518140695",
	appId: "1:184518140695:web:4090f63d4c32f56c46cd52",
};

// Initialize Firebase
const Fire = initializeApp(firebaseConfig);

const auth = getAuth(Fire);
const db = getFirestore(Fire);

export { Fire, auth, db };
