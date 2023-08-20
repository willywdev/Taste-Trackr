import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, hideForm, loginElement } from "./main.js";

const errorElement = document.querySelector('[data-js="errorElement"]');
const userElement = document.querySelector('[data-js="userElement"]');
const logoutElement = document.querySelector('[data-js="logoutElement"]');
const userButtons = document.querySelector('[data-js="userButtons"]');
const registerListElement = document.querySelector(
  '[data-js="registerListElement"]'
);
export async function registerUser(email, password) {
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
      errorElement.style.display = "flex";
      if (error.message.includes("missing")) {
        errorElement.textContent = "Missing Password or Email";
      } else if (error.message.includes("exists")) {
        errorElement.textContent = "Your E-mail already exists";
      } else {
        errorElement.textContent = "Something went wrong";
      }
      // ..
    });
}

export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      handleUserLoggedIn(user);
      setPersistence(email, password);
    })
    .catch((error) => {
      const errorMessage = error.message;
      errorElement.style.display = "flex";
      if (errorMessage.includes("missing")) {
        errorElement.textContent = "Either your e-mail or password is missing";
      } else if (errorMessage.includes("attempts")) {
        errorElement.textContent = "Too many attempts. Please try again later";
      } else if (errorMessage.includes("wrong")) {
        errorElement.textContent = "Either your e-mail or password is wrong";
      } else if (errorMessage.includes("internal")) {
        errorElement.textContent = "Internal Error. Please try again later";
      } else {
        errorElement.textContent = "Something went wrong";
      }
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

export function setPersistence() {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function handleUserLoggedIn(user) {
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
  registerListElement.classList.add("hide");

  logoutElement.addEventListener("click", () => {
    logoutUser();
  });

  userButtons.classList.remove("hide");
}

export function checkUserLoggedIn() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      //do your logged in user crap here
      console.log("Logged in ");
    } else {
      console.log("Logged out");
    }
  });
}
