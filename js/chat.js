// js/chat.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1K8GwY5X94pd66W-l75S0D-ShajUg2h8",
  authDomain: "github-9d1dc.firebaseapp.com",
  databaseURL: "https://github-9d1dc-default-rtdb.firebaseio.com",
  projectId: "github-9d1dc",
  storageBucket: "github-9d1dc.appspot.com",
  messagingSenderId: "1050755592261",
  appId: "1:1050755592261:web:53a86501b3e6cbc558b32c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const messageList = document.getElementById("messages");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");

onAuthStateChanged(auth, user => {
  if (user) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const message = input.value;
      if (message.trim() !== "") {
        push(ref(db, "messages"), {
          user: user.displayName || user.email,
          text: message,
          time: new Date().toLocaleTimeString()
        });
        input.value = "";
      }
    });

    onChildAdded(ref(db, "messages"), snapshot => {
      const msg = snapshot.val();
      const msgElement = document.createElement("div");
      msgElement.textContent = `[${msg.time}] ${msg.user}: ${msg.text}`;
      messageList.appendChild(msgElement);
    });
  } else {
    window.location.href = "login.html";
  }
});

document.getElementById("signout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
