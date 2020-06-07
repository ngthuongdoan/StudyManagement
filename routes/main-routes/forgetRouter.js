const express = require("express");
const bcrypt = require("bcrypt");
const sendEmail = require("../../controllers/sendEmail");
const fs = require("fs");
const { query } = require("../../models/connection");
// const ActivationCode = require("../../controllers/classes/ActivationCode");
const forgetPage = fs.readFileSync(`${__dirname}/../../views/forget.html`);

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    if (req.session.loggedin) res.redirect("/dashboard");
    res.end(forgetPage);
  })
  .post(async (req, res) => {
    const email = req.body.email;
    const queryemail = await query(
      "SELECT accountEmail FROM accounts WHERE accountEmail = ?",
      [email]
    );
    if (undefined !== queryemail && queryemail.length > 0) {
      const code = Math.floor(100000 + Math.random() * 900000);
      // const activation = new ActivationCode(code, new Date());
      sendEmail(email, code);
      res.status(200).json({ code: code });
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const newpass = bcrypt.hashSync(req.body.newpassword, 10);
    try {
      await query("UPDATE accounts SET pass=? WHERE accountEmail = ?", [
        newpass,
        req.body.email,
      ]);
      res.redirect("/login");
    } catch (e) {
      console.log(e.message);
      res.status(404).send();
    }
  });
module.exports = router;
