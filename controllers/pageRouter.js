const express = require("express");
const fs = require("fs");
const session = require('express-session');
const conn = require("../models/connection");
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
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      conn.query(
        "SELECT * FROM accounts WHERE username = ? AND pass = ?",
        [username, password],
        (error, results, fields) => {
          if (undefined !== results && results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect("/dashboard");
          } else {
            res.send("Incorrect Username and/or Password!");
          }
          res.end();
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
  });

router
  .route("/register")
  .get((req, res) => {
    res.end(register);
  })
  .post((req, res) => {
    res.json(req.body);
  });

router.route("/dashboard").get((req, res) => {
  console.log(req.session)
  if(req.session.loggedin){
    res.send('Welcome back, ' + req.session.username + '!');
  }else{
    res.send('Please log in');
  }
  res.end();
});

module.exports = router;
