import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1K8GwY5X94pd66W-l75S0D-ShajUg2h8",
  authDomain: "github-9d1dc.firebaseapp.com",
  projectId: "github-9d1dc",
  storageBucket: "github-9d1dc.appspot.com",
  messagingSenderId: "1050755592261",
  appId: "1:1050755592261:web:53a86501b3e6cbc558b32c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
});

// Google Login
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(() => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Google Login Error: " + error.message);
    });
});

// GitHub Login (Firebase custom OAuth or 3rd-party OAuth)
document.getElementById("github-login").addEventListener("click", () => {
  alert("GitHub Login feature not implemented. Use Google or Email login.");
});

// Yahoo Login (Firebase custom OAuth or 3rd-party OAuth)
document.getElementById("yahoo-login").addEventListener("click", () => {
  alert("Yahoo Login feature not implemented. Use Google or Email login.");
});
