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
// Initialize Firebase
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
export const contentBox = document.querySelector('[data-js="content"]');
const registerForm = document.querySelector('[data-js="registerForm"]');
const loginForm = document.querySelector('[data-js="loginForm"]');
const connectButton = document.querySelector('[data-js="connectButton"]');

// Saving animation in variable
const fadeIn = [{ opacity: 0 }, { opacity: 1 }];
const fadeOut = [{ opacity: 1 }, { opacity: 0 }];
const fadeTiming = { duration: 400, iterations: 1 };

// Calling functions on DOM Loaded
async function fetchAndDisplayData(user) {
  await retrieveDatabase();
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
connectButton.addEventListener("click", () => {
  contentBox.innerHTML = "";
  const newForm = document.createElement("form");
  const label = document.createElement("label");
  label.textContent = "Your User ID:";
  const input = document.createElement("input");
  const uid = getUserUID();
  input.value = uid;
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  newForm.append(label, input, copyButton);
  contentBox.append(newForm);
  copyButton.addEventListener("click", () => {
    // Select the text field
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(input.value);
  });

  newForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const partnerForm = document.createElement("form");
  const partnerLabel = document.createElement("label");
  partnerLabel.textContent = "Set your partners ID:";
  const partnerInput = document.createElement("input");
  const partnerButton = document.createElement("button");
  partnerButton.textContent = "Save";
  partnerForm.append(partnerLabel, partnerInput, partnerButton);
  contentBox.append(partnerForm);

  partnerForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  partnerButton.addEventListener("click", () => {
    connectPeople(partnerInput.value);
  });
});

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
    const color = document.createElement("div");
    color.classList.add("color-div");
    color.style.backgroundColor = item.Farbe;
    listItem.append(color);
    const description = document.createElement("p");
    description.textContent = item.Bewertung;
    listItem.append(description);
  });
}

function getUserUID() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const uid = user.uid;
    return uid;
  }
}

function connectPeople(partnerID) {
  const userID = getUserUID();
  console.log(userID);
  console.log(partnerID);
}
