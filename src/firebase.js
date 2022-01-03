import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBPlUUoZRP4LhuXUsv_0WgSMtj2du5DI5k",
    authDomain: "trackman-bysavio.firebaseapp.com",
    projectId: "trackman-bysavio",
    storageBucket: "trackman-bysavio.appspot.com",
    messagingSenderId: "540424581903",
    appId: "1:540424581903:web:1149938fd35dccc859047a",
    measurementId: "G-LPHWV1CQWG",
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const auth = firebase.auth();


  export default {firebase, auth};
