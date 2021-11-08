import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
//const firebase=require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Please Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCg8sRa9kvsrSPnO8_oUkQLKHHKDRB-78c",
  authDomain: "note-1612.firebaseapp.com",
  projectId: "note-1612",
  storageBucket: "note-1612.appspot.com",
  messagingSenderId: "381439147644",
  appId: "1:381439147644:web:06422cb3dee309e2ec93f9",
  measurementId: "G-19YEBK16DP"
});


ReactDOM.render(

  <App />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
