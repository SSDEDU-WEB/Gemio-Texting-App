import { auth, db } from './firebase.js'; // Firebase initialization from firebase.js
import { getDatabase, ref, set, onChildAdded, push } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const sendMessageForm = document.getElementById('send-message-form');
const addFriendBtn = document.getElementById('add-friend-btn');
const friendListBtn = document.getElementById('friend-list-btn');
const friendsListDiv = document.getElementById('friends-list');
const logoutBtn = document.getElementById('logout-btn');

// Listen for new messages
onChildAdded(ref(db, 'messages'), snapshot => {
    const message = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${message.sender}: ${message.text}`;
    chatMessages.appendChild(messageDiv);
});

// Send message to Firebase
sendMessageForm.addEventListener('submit', e => {
    e.preventDefault();

    const messageText = messageInput.value;
    const messageRef = push(ref(db, 'messages'));

    set(messageRef, {
        sender: auth.currentUser.displayName,
        text: messageText,
        timestamp: Date.now()
    }).then(() => {
        messageInput.value = ''; // Clear input after sending
    }).catch(error => {
        alert('Error sending message: ' + error.message);
    });
});

// Add friend button functionality
addFriendBtn.addEventListener('click', () => {
    const friendUsername = prompt('Enter the username of the person you want to add as a friend:');
    if (friendUsername) {
        const friendRequestRef = push(ref(db, 'friendRequests'));
        set(friendRequestRef, {
            sender: auth.currentUser.displayName,
            receiver: friendUsername,
            status: 'pending',
            timestamp: Date.now()
        }).then(() => {
            alert(`Friend request sent to ${friendUsername}`);
        }).catch(error => {
            alert('Error sending friend request: ' + error.message);
        });
    }
});

// Friend list button functionality
friendListBtn.addEventListener('click', () => {
    friendsListDiv.innerHTML = ''; // Clear the previous list
    onChildAdded(ref(db, 'friendRequests'), snapshot => {
        const request = snapshot.val();
        if (request.receiver === auth.currentUser.displayName && request.status === 'pending') {
            const requestDiv = document.createElement('div');
            requestDiv.textContent = `Friend Request from: ${request.sender}`;

            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Accept';
            acceptBtn.addEventListener('click', () => acceptFriendRequest(snapshot.key));

            const rejectBtn = document.createElement('button');
            rejectBtn.textContent = 'Reject';
            rejectBtn.addEventListener('click', () => rejectFriendRequest(snapshot.key));

            requestDiv.appendChild(acceptBtn);
            requestDiv.appendChild(rejectBtn);
            friendsListDiv.appendChild(requestDiv);
        }
    });
});

// Accept friend request
function acceptFriendRequest(requestId) {
    const requestRef = ref(db, 'friendRequests/' + requestId);
    set(requestRef, {
        ...snapshot.val(),
        status: 'accepted'
    }).then(() => {
        alert('Friend request accepted!');
    }).catch(error => {
        alert('Error accepting request: ' + error.message);
    });
}

// Reject friend request
function rejectFriendRequest(requestId) {
    const requestRef = ref(db, 'friendRequests/' + requestId);
    set(requestRef, {
        ...snapshot.val(),
        status: 'rejected'
    }).then(() => {
        alert('Friend request rejected!');
    }).catch(error => {
        alert('Error rejecting request: ' + error.message);
    });
}

// Logout functionality
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html'; // Redirect to login page
    }).catch(error => {
        alert('Error logging out: ' + error.message);
    });
});
