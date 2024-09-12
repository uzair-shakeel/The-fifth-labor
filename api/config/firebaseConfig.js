import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzxc-0TcuIV8UIJo4D6P0HY0kn0ScS1Y8",
  authDomain: "the-fifth-labor.firebaseapp.com",
  projectId: "the-fifth-labor",
  storageBucket: "the-fifth-labor.appspot.com",
  messagingSenderId: "121781348768",
  appId: "1:121781348768:web:d414122134b92727dc5cc5",
  measurementId: "G-J1V97V66DR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
