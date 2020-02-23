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

//ROOT
router.route("/").get((req, res) => {
  res.end(login);
});

//LOGIN
router
  .route("/login")
  .get((req, res) => {
    res.end(login);
  })
  .post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    conn.query(
      "SELECT * FROM accounts WHERE username = ? AND pass = ?",
      [username, password],
      (error, results, fields) => {
        if (undefined !== results && results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/dashboard");
        } else {
          let content = `
            <script>
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Incorrect username or password!'
              })
            </script>`;
          res.send(popup.replaceTemplate(false, "{% POPUP %}", content, login));
        }
        res.end();
      }
    );
  });

//REGISTER
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
      "INSERT INTO accounts VALUES(?,?,?,?,?,?);",
      [username, password, fullname, email, education, true],
      (error, results, fields) => {
        //POPUP ERROR IN REGISTER
        if (error) {
          let content = `
          <script>
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Already have!'
            })
          </script>`;
          res.send(
            popup.replaceTemplate(false, "{% POPUP %}", content, register)
          );
        } else {
          //SUCCESS RETURN LOGIN PAGE
          res.redirect("/login");
        }
      }
    );
  });

//404 NOTFOUND
router.route("/notfound").get((req, res) => {
  res.end(notfound);
});

//DASHBOARD
router.route("/dashboard").get((req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  if (req.session.loggedin) {
    //CHECK TO SHOW INITIAL PAGE
    conn.query(
      "SELECT firsttime FROM accounts WHERE username = ?",
      [req.session.username],
      (error, results, fields) => {
        console.log(results[0].firsttime);
      }
    );
    res.end(dashboard);
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
});

///LOGOUT
router.route("/logout").get((req, res) => {
  //REMOVE SESSION
  req.session.loggedin = false;
  res.redirect("/login");
});

module.exports = router;
