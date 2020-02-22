const express = require("express");
const fs = require("fs");
const conn = require("../models/connection");
const Swal = require("sweetalert2");
const popup = require("./replaceTemplate");

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
            // let content = `
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Success <3',
            // })`;
            // res.write(popup.replaceTemplate(false, content, login));
            res.redirect("/dashboard");
          } else {
            let content = `
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Incorrect username or password!'
            })`;
            res.send(popup.replaceTemplate(false, content, login));
          }
          res.end();
        }
      );
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
    conn.query(
      "INSERT INTO accounts VALUES(?,?,?,?,?);",
      [username, password, fullname, email, education],
      (error, results, fields) => {
        if (error) {
          let content = `
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Already have!'
            })`;
            res.send(popup.replaceTemplate(false, content, register));
        } else {
          res.redirect("/login");
        }
      }
    );
  });
router.route("/notfound").get((req, res) => {
  res.end(notfound);
});
router.route("/dashboard").get((req, res) => {
  if (req.session.loggedin) {
    res.end(dashboard);
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
