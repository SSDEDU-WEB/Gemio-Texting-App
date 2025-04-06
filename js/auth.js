// js/auth.js
import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Handle login button
const loginBtn = document.getElementById("googleLogin");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // Save user info to Realtime DB
        fetch(`https://github-9d1dc-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
          method: "PUT",
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            uid: user.uid
          })
        });

        // Redirect to chat page
        window.location.href = "chat.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
}
