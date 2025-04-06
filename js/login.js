import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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
const githubProvider = new OAuthProvider('github.com');
const yahooProvider = new OAuthProvider('yahoo.com');

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

// GitHub Login
document.getElementById("github-login").addEventListener("click", () => {
  signInWithPopup(auth, githubProvider)
    .then(() => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("GitHub Login Error: " + error.message);
    });
});

// Yahoo Login
document.getElementById("yahoo-login").addEventListener("click", () => {
  signInWithPopup(auth, yahooProvider)
    .then(() => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Yahoo Login Error: " + error.message);
    });
});
