// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import {
    getDatabase, ref, child, get, set,
} from 'firebase/database';
import { async } from '@firebase/util';
import {
    displayPosts, showAdmin, hideAdmin,
} from './styledblogdisplay';

import {
    getPosts, setPosts,
} from './blogstorage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCMccmIw7h6gxFJq0yMSSWjLVxr8ChRoE0',
    authDomain: 'cse134b-hw5-6385f.firebaseapp.com',
    databaseURL: 'https://cse134b-hw5-6385f-default-rtdb.firebaseio.com',
    projectId: 'cse134b-hw5-6385f',
    storageBucket: 'cse134b-hw5-6385f.appspot.com',
    messagingSenderId: '753381856992',
    appId: '1:753381856992:web:bc8c993a402241d7e02285',
    measurementId: 'G-40B1P1XF6K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://localhost:9099');

let admin = 0;

function sendPosts() {
    const localPosts = getPosts();
    set(ref(db, 'posts'), localPosts);
}

function updatePosts() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'posts')).then((snapshot) => {
        if (snapshot.exists()) {
            setPosts(snapshot.val());
            displayPosts(admin);
        } else {
            console.log('No data available');
        }
    }).catch((error) => {
        console.error(error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const getBtn = document.getElementById('get');
    getBtn.addEventListener('click', () => {
        updatePosts();
    });

    const postBtn = document.getElementById('post');
    postBtn.addEventListener('click', () => {
        sendPosts();
    });

    const email = document.getElementById('email-signin');
    const pass = document.getElementById('pass-signin');
    const btnLogin = document.getElementById('btn-signin');
    const btnLogout = document.getElementById('btn-signout');
    const msg = document.getElementById('msg-signin');

    const loginEmailPassword = async () => {
        const loginEmail = email.value;
        const loginPassword = pass.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            email.value = '';
            pass.value = '';
            msg.innerText = '';
            console.log(userCredential.user);
        } catch (error) {
            console.log(error);
            if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
                msg.innerHTML = 'Wrong password';
            } else if (error.code == AuthErrorCodes.USER_DELETED) {
                msg.innerHTML = 'User not found';
            } else {
                msg.innerHTML = `Error: ${error.message}`;
            }
        }
    };

    btnLogin.addEventListener('click', loginEmailPassword);

    const monitorAuthState = async () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                displayPosts(1);
                showAdmin();
                admin = 1;
            } else {
                admin = 0;
                hideAdmin();
                displayPosts(0);
            }
        });
    };

    monitorAuthState();

    const logout = async () => {
        console.log('Log out');
        await signOut(auth);
    };

    btnLogout.addEventListener('click', logout);

    updatePosts();
});
