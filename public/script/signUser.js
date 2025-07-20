// Import the functions you need from the SDKs you need
import { initializeApp } from "./firebase/app";
import { getDatabase, get, set, update, remove, push, ref } from "./firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAburJ6okm23c264u5qiBoX9WJpEnYuVjA",
    authDomain: "rickandmortyapp-664e0.firebaseapp.com",
    projectId: "rickandmortyapp-664e0",
    storageBucket: "rickandmortyapp-664e0.firebasestorage.app",
    messagingSenderId: "761766734494",
    appId: "1:761766734494:web:9ab29a86cdc1d0ed88298f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const DB_COMPLETED_SUCCESS = 0;
const DB_COMPLETED_FAILED = 1;
const DB_ERROR = 2;

const LK_USERNAME = "Username";

document.getElementById("submit").addEventListener('touchstart', (e) => {
    e.preventDefault();
    pressedSubmit();
});

document.getElementById("submit").addEventListener('click', (e) => {
    e.preventDefault();
    pressedSubmit();
});

function pressedSubmit(){
    console.log("hello");
    
}

async function registerUser(username, email, password){
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const key = set(ref(database, `users/${uid}`), username);
    if(key){
        localStorage.setItem(LK_USERNAME, username);
        ret = DB_COMPLETED_SUCCESS;
    }
    else{
        ret = DB_COMPLETED_FAILED;
    }
}

async function validateUser(email, password){
    const userCred = await signInWithEmailAndPassword(email, password);
    
}