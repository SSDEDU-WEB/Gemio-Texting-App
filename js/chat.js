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

// Send message functionality
document.getElementById("send-message-btn").addEventListener("click", () => {
  const message = document.getElementById("message-input").value;
  if (message.trim()) {
    // Add message to Firebase
    const messageRef = db.ref("messages").push();
    messageRef.set({
      user: auth.currentUser.displayName,
      message: message,
      timestamp: new Date().toISOString(),
    });
    document.getElementById("message-input").value = ""; // Clear input
  }
});

// Listen for new messages
const chatMessagesRef = db.ref("messages");
chatMessagesRef.on("child_added", (snapshot) => {
  const messageData = snapshot.val();
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");
  messageElement.innerHTML = `<strong>${messageData.user}</strong>: ${messageData.message}`;
  document.getElementById("chat-messages").appendChild(messageElement);
});

// Add Friend functionality (Firebase Integration)
document.getElementById("add-friend-btn").addEventListener("click", () => {
  const friendEmail = prompt("Enter the email of the person you want to add:");
  if (friendEmail) {
    const friendRef = db.ref("friends/" + auth.currentUser.uid).push();
    friendRef.set({
      friendEmail: friendEmail,
      status: "pending",
    }).then(() => {
      alert("Friend request sent to " + friendEmail);
    }).catch((error) => {
      alert("Error sending friend request: " + error.message);
    });
  }
});
