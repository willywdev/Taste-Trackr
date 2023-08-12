// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
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

export const createButton = document.querySelector('[data-js="createButton"]');

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
createButton.addEventListener("click", () => {
  contentBox.innerHTML = "";
  const newForm = document.createElement("form");
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  const nameInput = document.createElement("input");
  nameInput.required = true;
  const colorLabel = document.createElement("label");
  colorLabel.textContent = "Pick a color:";
  const colorSelect = document.createElement("select");
  colorSelect.required = true;
  const colorOption1 = document.createElement("option");
  colorOption1.textContent = "Green";
  const colorOption2 = document.createElement("option");
  colorOption2.textContent = "Yellow";
  const colorOption3 = document.createElement("option");
  colorOption3.textContent = "Red";
  colorSelect.append(colorOption1, colorOption2, colorOption3);
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Your Rating:";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.required = true;
  const submitButton = document.createElement("button");
  submitButton.textContent = "Save";

  newForm.append(
    nameLabel,
    nameInput,
    colorLabel,
    colorSelect,
    descriptionLabel,
    descriptionInput,
    submitButton
  );
  contentBox.append(newForm);

  newForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addDoc(colRef, {
      Bewertung: descriptionInput.value,
      Farbe:
        colorSelect.value === "Green"
          ? "lightgreen"
          : colorSelect.value === "Yellow"
          ? "yellow"
          : "red",
      Name: nameInput.value,
      CreatedByUserID: getUserUID(),
    })
      .then(() => newForm.reset())
      .then(() => {
        submitButton.style.backgroundColor = "lightgreen";
        submitButton.textContent = "Saved";
      });
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

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `<span class="material-symbols-outlined">
    delete
    </span>`;
    listItem.append(deleteButton);

    deleteButton.addEventListener("click", () => {
      const modal = document.createElement("modal");
      modal.classList.add("confirm-modal");
      modal.animate(fadeIn, fadeTiming);
      document.body.append(modal);

      const modalHeadline = document.createElement("h3");
      modalHeadline.textContent = "Are you sure about that?";
      modal.append(modalHeadline);

      const modalButtonsWrapper = document.createElement("div");
      modalButtonsWrapper.classList.add("modal-buttons-wrapper");
      const confirmButton = document.createElement("button");
      confirmButton.innerHTML = `<span class="material-symbols-outlined">
      delete
      </span> Delete Rating`;
      confirmButton.classList.add("confirm-button");

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.classList.add("cancel-button");

      modalButtonsWrapper.append(confirmButton, cancelButton);
      modal.append(modalButtonsWrapper);

      confirmButton.addEventListener("click", () => {
        const docRef = doc(db, "ratings", item.id);
        deleteDoc(docRef)
          .then(() => {
            location.reload();
          })
          .catch((error) => console.log(error));
      });

      cancelButton.addEventListener("click", () => {
        modal.animate(fadeOut, fadeTiming);
        setTimeout(() => {
          location.reload();
        }, 401);
      });
    });
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
