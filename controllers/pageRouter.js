const express = require("express");
const fs = require("fs");
const url = require("url");
const conn = require("../models/connection");
const popup = require("./replaceTemplate");

const login = fs.readFileSync(`${__dirname}/../views/login.html`);
const register = fs.readFileSync(`${__dirname}/../views/register.html`);
const dashboard = fs.readFileSync(`${__dirname}/../views/dashboard.html`);
const notfound = fs.readFileSync(`${__dirname}/../views/notfound.html`);
const firsttime = fs.readFileSync(`${__dirname}/../views/firsttime.html`);
const common = fs.readFileSync(`${__dirname}/../views/common.html`);

const router = express.Router();

//ROOT
router.route("/").get((req, res) => {
  res.end(popup.replaceTemplate("{% POPUP %}", "", login));
});

//LOGIN
router
  .route("/login")
  .get((req, res) => {
    res.end(popup.replaceTemplate("{% POPUP %}", "", login));
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
          req.session.firsttime = results[0].firsttime;
          //CHECK TO SHOW INITIAL PAGE
          res.redirect('/dashboard');
        } else {
          let content = `
            <script>
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Incorrect username or password!'
              })
            </script>`;
          res.send(popup.replaceTemplate("{% POPUP %}", content, login));
        }
        res.end();
      }
    );
  });

//REGISTER
router
  .route("/register")
  .get((req, res) => {
    res.end(popup.replaceTemplate("{% POPUP %}", "", register));
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
          res.send(popup.replaceTemplate("{% POPUP %}", content, register));
        } else {
          //SUCCESS RETURN LOGIN PAGE
          res.redirect("/login");
        }
      }
    );
  });

//FORGET PAGE
//404 NOTFOUND
router.route("/notfound").get((req, res) => {
  res.end(notfound);
});

//DASHBOARD
router.route("/dashboard").get((req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  if (req.session.loggedin) {
    if (req.session.firsttime) {
      res.end(popup.replaceTemplate("{% CONTENT %}", firsttime, dashboard));
    }
    res.end(res.end(popup.replaceTemplate("{% CONTENT %}", common, dashboard)));
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
