const express = require("express");
const fs = require("fs");
const login = fs.readFileSync(`${__dirname}/../views/login.html`);
const router = express.Router();

router.get("/", (req, res) => {
  res.end(login);
});

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {});

module.exports = router;