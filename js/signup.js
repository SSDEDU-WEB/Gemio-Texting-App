// js/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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
const provider = new GoogleAuthProvider();

document.getElementById("signup-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return updateProfile(userCredential.user, {
        displayName: username
      });
    })
    .then(() => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
});

document.getElementById("google-signup").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Google Sign Up Error: " + error.message);
    });
});

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

// Inside createUserWithEmailAndPassword success
const file = document.getElementById("profile-pic").files[0];
const storage = getStorage();
const storageRef = ref(storage, 'profile_pics/' + auth.currentUser.uid);

if (file) {
  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then(url => {
      updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: url
      });
      window.location.href = "chat.html";
    });
  });
} else {
  updateProfile(auth.currentUser, { displayName: username });
  window.location.href = "chat.html";
}
