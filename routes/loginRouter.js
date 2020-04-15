const fs = require("fs");
const express = require("express");
const bcrypt = require("bcrypt");
const conn = require("../models/connection");
const popup = require("../controllers/replaceTemplate");
const login = fs.readFileSync(`${__dirname}/../views/login.html`);
const session = require("../controllers/session");
const router = express.Router();

router
  .get("/", (req, res) => {
    //PREVENT LOGIN PAGE HERE
    if(req.session.loggedin) res.redirect("/dashboard");
    res.end(popup.replaceTemplate("{% POPUP %}", "", login));
  })
  .post("/", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    conn.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username],
      (error, results, fields) => {
        if (undefined !== results && results.length > 0) {
          if (bcrypt.compareSync(password, results[0].pass)) {
            req.session.loggedin = true;
            req.session.popup = true;
            req.session.username = username;
            req.session.fullname = results[0].fullname;
            req.session.avatar = results[0].avatar;
            //CHECK TO SHOW INITIAL PAGE
            res.redirect("/dashboard");
          } else {
            let content = "Incorrect password!";
            res.send(
              popup.replacePopupTemplate(false, "{% POPUP %}", content, login)
            );
          }
        } else {
          let content = "Incorrect username!";
          res.send(
            popup.replacePopupTemplate(false, "{% POPUP %}", content, login)
          );
        }
        res.end();
      }
    );
  });

module.exports = router;
