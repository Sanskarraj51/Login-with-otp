import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import firebase from "firebase/app";
import "firebase/auth";

const App = () => {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [user, setUser] = useState(false);
  const [title, setTitle] = useState("Sign In");

  const firebaseConfig = {
    apiKey: "AIzaSyBPlUUoZRP4LhuXUsv_0WgSMtj2du5DI5k",
    authDomain: "trackman-bysavio.firebaseapp.com",
    projectId: "trackman-bysavio",
    storageBucket: "trackman-bysavio.appspot.com",
    messagingSenderId: "540424581903",
    appId: "1:540424581903:web:1149938fd35dccc859047a",
    measurementId: "G-LPHWV1CQWG",
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  }, []);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setTitle("Sign Out");
    }
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    let phone_number = "+91" + e.target.phone.value;
    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        console.log("otp sent");
        setViewOtpForm(true);
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();
    let opt_number = e.target.otp_value.value;
    window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        console.log("success");
        window.open("/", "_self");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.open("/signin", "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      <Routes>
        <Route
          path="/"
          element={<Home signOut={signOut} user={user} title={title} />}
        />

        <Route
          path="/signin"
          element={
            <SignIn
              loginSubmit={loginSubmit}
              otpSubmit={otpSubmit}
              viewOtpForm={viewOtpForm}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
