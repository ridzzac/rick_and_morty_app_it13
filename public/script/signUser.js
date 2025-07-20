import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, get, ref, set, push, remove } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyAburJ6okm23c264u5qiBoX9WJpEnYuVjA",
    authDomain: "rickandmortyapp-664e0.firebaseapp.com",
    databaseURL: "https://rickandmortyapp-664e0-default-rtdb.firebaseio.com",
    projectId: "rickandmortyapp-664e0",
    storageBucket: "rickandmortyapp-664e0.firebasestorage.app",
    messagingSenderId: "761766734494",
    appId: "1:761766734494:web:9ab29a86cdc1d0ed88298f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const DB_COMPLETED_SUCCESS = 0;
const DB_COMPLETED_FAILED = 1;
const DB_ERROR = 2;

const LK_USERNAME = "Username";

const btnSubmit = document.getElementById("submit");

let isSubmitLocked = false;

btnSubmit.addEventListener('touchstart', (e) => {
    e.preventDefault();
    pressedSubmit();
});

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    pressedSubmit();
});

async function animateBtnSubmit() {
    btnSubmit.classList.toggle("text-white");
    btnSubmit.classList.toggle("bg-rmGreen-normal");
    setTimeout(() => {
        btnSubmit.classList.toggle("text-white");
        btnSubmit.classList.toggle("bg-rmGreen-normal");
    }, 150);
}

function pressedSubmit() {
    animateBtnSubmit();
    if (isSubmitLocked)
        return;
    console.log("hello");
    isSubmitLocked = true;
    registerUser();
}

function createUser(username, email, password){

}

async function registerUser(username, email, password){
    const key = push(ref(database, "users"), createUser(username, email, password));
    if(key){

    }
    else{
        alert("")
    }
}











async function registerUser_auth(username, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const key = set(ref(database, `users/${uid}`), username);
    if (key) {
        localStorage.setItem(LK_USERNAME, username);
        ret = DB_COMPLETED_SUCCESS;
    }
    else {
        ret = DB_COMPLETED_FAILED;
    }
}

async function validateUser_auth(email, password) {
    const userCred = await signInWithEmailAndPassword(email, password);

}