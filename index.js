const fs = require("fs");
const express = require("express");
const app = express();

let config = {};
try {
  const rawConfig = fs.readFileSync("/app/config/config.json");
  config = JSON.parse(rawConfig);
} catch (err) {
  console.log("No config file found, using defaults");
}

const dbUser = process.env.DB_USER || "default_user";
const dbPassword = process.env.DB_PASSWORD || "default_password";

app.get("/", (req, res) => {
  res.json({
    message: config.message || "Hello World",
    database: {
      user: dbUser,
      password: dbPassword ? "******" : "not set",
    },
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
