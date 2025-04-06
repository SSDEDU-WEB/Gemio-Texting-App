import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const auth = getAuth();
const db = getDatabase();
const myUid = auth.currentUser.uid;

// Function to send a friend request
function sendFriendRequest(targetUid) {
  set(ref(db, `friendRequests/${targetUid}/${myUid}`), {
    from: myUid,
    status: "pending"
  });
}

// Function to accept a friend request
function acceptFriendRequest(fromUid) {
  const updates = {};
  updates[`friends/${myUid}/${fromUid}`] = true;
  updates[`friends/${fromUid}/${myUid}`] = true;
  updates[`friendRequests/${myUid}/${fromUid}`] = null;
  update(ref(db), updates);
}

// Display profile info (e.g. profile picture)
function displayProfile() {
  const profilePic = auth.currentUser.photoURL || 'default.jpg';
  const username = auth.currentUser.displayName;
  document.getElementById("profile-pic").src = profilePic;
  document.getElementById("username").textContent = username;
}

// Call displayProfile after auth state change
auth.onAuthStateChanged(displayProfile);
