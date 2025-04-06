// chat.js
import { auth, db } from './firebase.js';
import { getDatabase, ref, set, push, onChildAdded } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';

// Refs to Firebase Realtime Database
const messagesRef = ref(db, 'messages');
const friendsRef = ref(db, 'friends'); // For friends data

// DOM elements
const messageInput = document.getElementById('message-input');
const messageForm = document.getElementById('message-form');
const messagesDiv = document.getElementById('messages');
const logoutBtn = document.getElementById('logout-btn');
const addFriendBtn = document.getElementById('add-friend-btn');

// Function to send message
messageForm.addEventListener('submit', e => {
  e.preventDefault();

  const message = messageInput.value.trim();
  if (message) {
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      user: auth.currentUser.displayName,
      text: message,
      timestamp: Date.now(),
    });

    messageInput.value = ''; // Clear input
  }
});

// Real-time listener for new messages
onChildAdded(messagesRef, snapshot => {
  const messageData = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.textContent = `${messageData.user}: ${messageData.text}`;
  messagesDiv.appendChild(messageElement);

  // Show Notification for New Message
  if (Notification.permission === 'granted') {
    new Notification('New message', { body: `${messageData.user}: ${messageData.text}` });
  }
});

// Log out button functionality
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html'; // Redirect to login page
  });
});

// Add Friend button functionality (for now, just an alert)
addFriendBtn.addEventListener('click', () => {
  const friendUsername = prompt('Enter the username of the person you want to add as a friend:');
  if (friendUsername) {
    const newFriendRef = push(friendsRef);
    set(newFriendRef, {
      user: auth.currentUser.displayName,
      friend: friendUsername,
      status: 'pending', // Friend request is pending
      timestamp: Date.now(),
    });
    alert(`Friend request sent to ${friendUsername}`);
  }
});
