const express = require("express");
const fs = require("fs");
const conn = require("../models/connection");
// const validate = require("./validate");

const login = fs.readFileSync(`${__dirname}/../views/login.html`);
const register = fs.readFileSync(`${__dirname}/../views/register.html`);
const dashboard = fs.readFileSync(`${__dirname}/../views/dashboard.html`);
const notfound = fs.readFileSync(`${__dirname}/../views/notfound.html`);


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
    let username = req.body.username;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let education = req.body.education;
    console.log(username, password);

    // if (!validate.isValid(username, password)) {
    //   res.status(404)
    //   res.end(notfound);
    //   return;
    // }

    conn.query(
      "select username from accounts where username = ?",
      [username],
      (error, results, fields) => {
        if (!error) {
          res.send("All ready have");
          res.end();
        } else {
          conn.query(
            "insert into accounts value(?,?,?,?,?);",
            [username, password, fullname, email, education],
            (error, results, fields) => {
              if (error) {
                res.send("Something went wrong");
                res.end();
              } else {
                res.redirect("/login");
              }
            }
          );
        }
      }
    );
  });

router
  .route("/notfound")
  .get((req, res) => {
    res.end(notfound);
  })
router.route("/dashboard").get((req, res) => {
  if (req.session.loggedin) {
    res.end(dashboard);
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
