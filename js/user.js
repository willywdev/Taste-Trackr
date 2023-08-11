import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, hideForm, loginElement, registerElement } from "./main.js";
const auth = getAuth(app);
const errorElement = document.querySelector('[data-js="errorElement"]');
const userElement = document.querySelector('[data-js="userElement"]');
const logoutElement = document.querySelector('[data-js="logoutElement"]');
const registerIcon = document.querySelector('[data-js="registerIcon"]');
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      errorElement.className = "success";
      errorElement.textContent = "Thank you for registering!";
      hideForm();
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      if (error.message.includes("missing-password")) {
        errorElement.style.display = "flex";
        errorElement.textContent = "Missing Password!";
      } else if (error.message.includes("missing-email")) {
        errorElement.style.display = "flex";
        errorElement.textContent = "Missing E-Mail!";
      }
      // ..
    });
}

export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      userElement.textContent = user.email;
      errorElement.className = "success";
      errorElement.style.display = "flex";
      errorElement.textContent = "You're logged in.";
      setTimeout(() => {
        errorElement.style.display = "none";
      }, 1000);
      hideForm();
      loginElement.classList.add("hide");
      logoutElement.classList.remove("hide");
      registerIcon.classList.add("hide");
      registerElement.classList.add("hide");

      logoutElement.addEventListener("click", () => {
        logoutUser();
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function logoutUser() {
  signOut(auth)
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
}
