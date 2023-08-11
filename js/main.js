// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { registerForm } from "./createForms";

const firebaseConfig = {
  apiKey: "AIzaSyDOqXT90KaOECDCxOx-AZagJHG6NsWFIsY",
  authDomain: "taste-trackr-d6c61.firebaseapp.com",
  projectId: "taste-trackr-d6c61",
  storageBucket: "taste-trackr-d6c61.appspot.com",
  messagingSenderId: "736616958411",
  appId: "1:736616958411:web:61bd0fe536cd97eb1e0e4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const contentBox = document.querySelector('[data-js="content"]');
const registerElement = document.querySelector('[data-js="registerElement"]');

registerElement.addEventListener("click", () => {
  registerForm();
});
