import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const auth = getAuth();
const user = auth.currentUser;
const friendList = document.getElementById("friend-list");
const addFriendBtn = document.getElementById("add-friend-btn");
const addFriendInput = document.getElementById("add-friend");
const sendMessageBtn = document.getElementById("send-message-btn");
const messageInput = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

// Add friend functionality
addFriendBtn.addEventListener("click", () => {
  const friendEmail = addFriendInput.value;
  if (friendEmail) {
    const listItem = document.createElement("li");
    listItem.textContent = friendEmail;
    friendList.appendChild(listItem);
    addFriendInput.value = "";
  }
});

// Send message functionality
sendMessageBtn.addEventListener("click", () => {
  const message = messageInput.value;
  if (message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.textContent = `${user.email}: ${message}`;
    messagesDiv.appendChild(messageDiv);
    messageInput.value = "";
  }
});
