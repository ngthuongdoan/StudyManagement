const express = require("express");
const bcrypt = require("bcrypt");
const sendEmail = require("../../controllers/sendEmail");
const fs = require("fs");
const conn = require("../../models/connection");
// const ActivationCode = require("../../controllers/classes/ActivationCode");
const forgetPage = fs.readFileSync(`${__dirname}/../../views/forget.html`);

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    if (req.session.loggedin) res.redirect("/dashboard");
    res.end(forgetPage);
  })
  .post((req, res) => {
    const email = req.body.email;
    conn.query(
      "SELECT accountEmail FROM accounts WHERE accountEmail = ?",
      [email],
      (error, results, fields) => {
        if (undefined !== results && results.length > 0) {
          const code = Math.floor(100000 + Math.random() * 900000);
          // const activation = new ActivationCode(code, new Date());
          sendEmail(email, code);
          res.status(200).json({ code: code });
        } else {
          res.status(404).send();
        }
      }
    );
  })
  .put((req, res) => {
    const newpass = bcrypt.hashSync(req.body.newpassword, 10);
    conn.query(
      "UPDATE accounts SET pass=? WHERE accountEmail = ?",
      [newpass, req.body.email],
      (error, results, fields) => {
        if (error) {
          console.log(error.message);
          res.status(404).send();
        } else {
          res.redirect("/login");
        }
      }
    );
  });
module.exports = router;
