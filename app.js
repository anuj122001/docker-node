const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
    console.log("App is running...");
    res.json({ status: "Hello from Docker Container" });
});

app.get("/health", (req, res) => {
    console.log("Health from Docker");
    res.json({ status: "ok from k8s pods " });
});

app.get("/hello", (req, res) => {
    console.log("Hello, I am inside Docker Container from ECS");
    console.log(`IP : ${req.headers["x-forwarded-for"] || req.socket.remoteAddress}`);
    res.json({ message: "Hello friends, how are you ?" });
});

app.listen(PORT, () => {
    console.log(`------- Server running on port ${PORT} ---------`);
});
