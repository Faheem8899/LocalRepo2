const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
    console.log(
        `[${new Date().toLocaleString()}] ${req.method} ${req.url}`
    );
    next();
});

// Home Route
app.get("/", (req, res) => {
    res.send(`
        <h1>🚀 Express Server</h1>
        <p>Welcome to my Express application</p>

        <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/health">Health</a></li>
            <li><a href="/api/users">Users API</a></li>
            <li><a href="/hello/Faheem">Dynamic Route</a></li>
        </ul>
    `);
});

// About Route
app.get("/about", (req, res) => {
    res.send("<h2>This is the About Page.</h2>");
});

// Health Check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date(),
    });
});

// Fake Database
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];

// Get Users
app.get("/api/users", (req, res) => {
    res.json(users);
});

// Get User by ID
app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Add User
app.post("/api/users", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// Dynamic Route
app.get("/hello/:name", (req, res) => {
    res.send(`Hello ${req.params.name}! 👋`);
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Export app for testing; listen only when run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;