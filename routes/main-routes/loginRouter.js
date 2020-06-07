const fs = require("fs");
const express = require("express");
const bcrypt = require("bcrypt");
const { query } = require("../../models/connection");
const popup = require("../../controllers/replaceTemplate");
const login = fs.readFileSync(`${__dirname}/../../views/login.html`);
const router = express.Router();

router
  .get("/", (req, res) => {
    //PREVENT LOGIN PAGE HERE
    if (req.session.loggedin) res.redirect("/dashboard");
    res.end(popup.replaceTemplate("{% POPUP %}", "", login));
  })
  .post("/", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const queryaccounts = await query(
      "SELECT * FROM accounts WHERE username = ?",
      [username]
    );
    if (undefined !== queryaccounts && queryaccounts.length > 0) {
      if (bcrypt.compareSync(password, queryaccounts[0].pass)) {
        req.session.loggedin = true;
        req.session.popup = true;
        req.session.username = username;
        req.session.fullname = queryaccounts[0].fullname;
        req.session.avatar = queryaccounts[0].avatar;
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
  });

module.exports = router;
