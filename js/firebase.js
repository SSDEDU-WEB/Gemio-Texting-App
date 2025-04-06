// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1K8GwY5X94pd66W-l75S0D-ShajUg2h8",
  authDomain: "github-9d1dc.firebaseapp.com",
  databaseURL: "https://github-9d1dc-default-rtdb.firebaseio.com",
  projectId: "github-9d1dc",
  storageBucket: "github-9d1dc.appspot.com",
  messagingSenderId: "1050755592261",
  appId: "1:1050755592261:web:53a86501b3e6cbc558b32c",
  measurementId: "G-7W81L98W1X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
