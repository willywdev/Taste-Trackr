// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { handleUserLoggedIn, loginUser, registerUser } from "./user.js";
const firebaseConfig = {
  apiKey: "AIzaSyDOqXT90KaOECDCxOx-AZagJHG6NsWFIsY",
  authDomain: "taste-trackr-d6c61.firebaseapp.com",
  projectId: "taste-trackr-d6c61",
  storageBucket: "taste-trackr-d6c61.appspot.com",
  messagingSenderId: "736616958411",
  appId: "1:736616958411:web:61bd0fe536cd97eb1e0e4e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore();
const colRef = collection(db, "ratings");
let ratings = [];

// Getting DOM Elements
export const registerElement = document.querySelector(
  '[data-js="registerElement"]'
);
export const loginElement = document.querySelector('[data-js="loginElement"]');
const contentBox = document.querySelector('[data-js="content"]');
const registerForm = document.querySelector('[data-js="registerForm"]');
const loginForm = document.querySelector('[data-js="loginForm"]');

// Saving animation in variable
const fadeIn = [{ opacity: 0 }, { opacity: 1 }];
const fadeOut = [{ opacity: 1 }, { opacity: 0 }];
const fadeTiming = { duration: 400, iterations: 1 };

// Calling functions on DOM Loaded
async function fetchAndDisplayData(user) {
  await retrieveDatabase();
  console.log(ratings);
  createList(user.uid);
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    //do your logged in user crap here
    handleUserLoggedIn(user);
    await fetchAndDisplayData(user);
  } else {
  }
});
// Adding Event Listeners
registerElement.addEventListener("click", () =>
  renderForm(registerForm, registerElement)
);
loginElement.addEventListener("click", () =>
  renderForm(loginForm, loginElement)
);

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleRegister(event);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin(event);
});

function renderForm(formElement, textElement) {
  hideForm();
  textElement.classList.toggle("selected");
  if (formElement.classList.contains("hide")) {
    formElement.animate(fadeIn, fadeTiming);
    formElement.classList.remove("hide");
  } else {
    formElement.animate(fadeOut, fadeTiming);
    setTimeout(() => {
      formElement.classList.add("hide");
    }, 401);
  }
}

export function hideForm() {
  registerForm.classList.add("hide");
  loginForm.classList.add("hide");
  loginElement.classList.remove("selected");
  registerElement.classList.remove("selected");
}
function handleRegister(event) {
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  registerUser(data.email, data.password);
}

function handleLogin(event) {
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  loginUser(data.email, data.password);
}

async function retrieveDatabase() {
  try {
    const snapshot = await getDocs(colRef);
    const uniqueRatings = new Set();
    snapshot.docs.forEach((doc) => {
      uniqueRatings.add({ ...doc.data(), id: doc.id });
    });

    ratings = [...uniqueRatings];
  } catch (error) {
    console.error("Error retrieving database:", error);
  }
}

async function createList(uid) {
  let filteredList = ratings.filter((rating) => {
    return rating.CreatedByUserID === uid;
  });
  filteredList.forEach((item) => {
    const listItem = document.createElement("li");
    const name = document.createElement("h2");
    name.textContent = item.Name;
    contentBox.append(listItem);
    listItem.append(name);
  });
}
