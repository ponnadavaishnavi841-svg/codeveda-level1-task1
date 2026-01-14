// Import Express
const express = require("express");
const cors = require("cors");
const app = express();

//  To read JSON body
app.use(express.json());
app.use(cors());

//  Fake database
let users = [
    { id: 1, name: "Ravi", email: "ravi@gmail.com" },
    { id: 2, name: "Sita", email: "sita@gmail.com" }
];

// HOME route (optional)
app.get("/", (req, res) => {
    res.send("Welcome to My REST API!");
});

// GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

//  GET single user by ID
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

//  POST - add a new user
app.post("/users", (req, res) => {
    const user = req.body;
    if (!user.id || !user.name || !user.email) {
        return res.status(400).json({ message: "ID, Name, Email required" });
    }
    users.push(user);
    res.status(201).json({ message: "User added", user });
});

// PUT - update user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json({ message: "User updated", user });
});

// DELETE - remove user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: "User not found" });
    users.splice(index, 1);
    res.json({ message: "User deleted" });
});

//  Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});