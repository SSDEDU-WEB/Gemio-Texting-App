import { auth, db } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      alert("Error logging out: " + error.message);
    });
});

// Send message functionality (add more as needed)
document.getElementById("send-message-btn").addEventListener("click", () => {
  const message = document.getElementById("message-input").value;
  if (message.trim()) {
    // Add message to Firebase Database (you can use Firebase Realtime Database or Firestore)
    const messageRef = db.ref("messages").push();
    messageRef.set({
      user: auth.currentUser.displayName,
      message: message,
      timestamp: new Date().toISOString(),
    });
    document.getElementById("message-input").value = ""; // Clear input field
  }
});

// Listen to new messages from Firebase (for real-time updates)
const chatMessagesRef = db.ref("messages");
chatMessagesRef.on("child_added", (snapshot) => {
  const messageData = snapshot.val();
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");
  messageElement.innerHTML = `<strong>${messageData.user}</strong>: ${messageData.message}`;
  document.getElementById("chat-messages").appendChild(messageElement);
});

// Add Friend functionality (you can expand this later with a real database)
document.getElementById("add-friend-btn").addEventListener("click", () => {
  alert("Friend Request sent!");
});
