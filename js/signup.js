import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

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

document.getElementById("signup-form").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const file = document.getElementById("profile-pic").files[0];
      const storage = getStorage();
      const storageRef = ref(storage, 'profile_pics/' + userCredential.user.uid);

      if (file) {
        uploadBytes(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(url => {
            updateProfile(userCredential.user, { displayName: username, photoURL: url });
            window.location.href = "chat.html";
          });
        });
      } else {
        updateProfile(userCredential.user, { displayName: username });
        window.location.href = "chat.html";
      }
    })
    .catch(error => {
      alert("Signup failed: " + error.message);
    });
});

// Google Signup
document.getElementById("google-signup").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Google Signup Error: " + error.message);
    });
});

// GitHub Signup
document.getElementById("github-signup").addEventListener("click", () => {
  signInWithPopup(auth, githubProvider)
    .then(result => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("GitHub Signup Error: " + error.message);
    });
});

// Yahoo Signup
document.getElementById("yahoo-signup").addEventListener("click", () => {
  signInWithPopup(auth, yahooProvider)
    .then(result => {
      window.location.href = "chat.html";
    })
    .catch(error => {
      alert("Yahoo Signup Error: " + error.message);
    });
});
