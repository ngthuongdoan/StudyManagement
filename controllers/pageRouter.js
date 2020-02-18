const express = require("express");
const fs = require("fs");
const url = require("url");
const login = fs.readFileSync(`${__dirname}/../views/login.html`);
const register = fs.readFileSync(`${__dirname}/../views/register.html`);

const router = express.Router();

router.route("/").get((req, res) => {
  res.end(login);
});

router
  .route("/login")
  .get((req, res) => {
    res.end(login);
  })
  .post((req, res) => {
    res.json(req.body);
  });

router
  .route("/register")
  .get((req, res) => {
    res.end(register);
  })
  .post((req, res) => {
    res.json(req.body);
  });

module.exports = router;
