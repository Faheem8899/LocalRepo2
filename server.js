const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>Hello, World!</h1>
        <p>Welcome to my Node.js web server.</p>
    `);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
