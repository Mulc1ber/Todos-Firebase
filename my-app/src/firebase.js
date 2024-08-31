import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDNi4W-izWTd4q38DxnO9l6er0g70IXGD4',
    authDomain: 'todo-firebase-27eb4.firebaseapp.com',
    projectId: 'todo-firebase-27eb4',
    storageBucket: 'todo-firebase-27eb4.appspot.com',
    messagingSenderId: '130735663731',
    appId: '1:130735663731:web:19f83f3bf277dfd6221806',
    databaseURL: 'https://todo-firebase-27eb4-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
