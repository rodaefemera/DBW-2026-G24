// get elements from HTML
const friendsList = document.getElementById("friendsList");
const addFriendForm = document.getElementById("addFriendForm");
const friendUsernameInput = document.getElementById("friendUsername");
const friendMessage = document.getElementById("friendMessage");


// current friends shown on the page
let friends = [
    { name: "Ana", status: "online" },
    { name: "Bruno", status: "offline" },
    { name: "Carla", status: "online" },
    { name: "Diogo", status: "offline" }
];


// users that can be added
const availableUsers = [
    { name: "Eva", status: "online" },
    { name: "Filipe", status: "offline" },
    { name: "Goncalo", status: "online" },
    { name: "Helena", status: "offline" },
    { name: "Ines", status: "online" }
];


// function to sort friends alphabetically (A-Z)
function sortFriendsAZ(list) {
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
}


// function to display friends on screen
function renderFriends() {
    friendsList.innerHTML = "";

    const sortedFriends = sortFriendsAZ(friends);

    sortedFriends.forEach(friend => {
        const card = document.createElement("div");
        card.className = "friend-card";

        card.innerHTML = `
            <div class="friend-avatar"></div>
            <div class="friend-info">
                <p class="friend-title">${friend.name}</p>
                <span class="friend-status">${friend.status}</span>
            </div>
        `;

        friendsList.appendChild(card);
    });
}


// function to show a small message
function showMessage(text) {
    friendMessage.textContent = text;
}


// event to add friend
addFriendForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = friendUsernameInput.value.trim();

    if (username === "") {
        showMessage("Write a username.");
        return;
    }

    // check if already in friends list
    const alreadyFriend = friends.some(friend =>
        friend.name.toLowerCase() === username.toLowerCase()
    );

    if (alreadyFriend) {
        showMessage("This user is already your friend.");
        friendUsernameInput.value = "";
        return;
    }

    // search in available users
    const foundUser = availableUsers.find(user =>
        user.name.toLowerCase() === username.toLowerCase()
    );

    if (foundUser) {
        friends.push(foundUser);
        renderFriends();
        showMessage(foundUser.name + " added to friends.");
    } else {
        showMessage("User not found.");
    }

    friendUsernameInput.value = "";
});


// initial render when page loads
renderFriends();