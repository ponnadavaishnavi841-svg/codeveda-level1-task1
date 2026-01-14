// URL of your backend
const apiUrl = "http://localhost:3000/users";

// Get the <ul> element
const usersList = document.getElementById("usersList");

// Fetch users from backend
fetch(apiUrl)
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.id}. ${user.name} - ${user.email}`;
            usersList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error fetching users:", error);
        usersList.textContent = "Failed to load users.";
    });