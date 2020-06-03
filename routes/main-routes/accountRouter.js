const express = require("express");
const bcrypt = require("bcrypt");
const conn = require("../../models/connection");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {})
  .put((req, res) => {
    const checkpassword = req.body.oldpassword;
    conn.query(
      "SELECT pass FROM accounts WHERE username=?",
      [req.session.username],
      (error, results, fields) => {
        const password = results[0].pass;
        if (bcrypt.compareSync(checkpassword, password)) {
          const newpass = bcrypt.hashSync(req.body.newpassword, 10);
          conn.query(
            "UPDATE accounts SET pass=? WHERE username = ?",
            [newpass, req.session.username],
            (error, results, fields) => {
              if (error) {
                console.log(error.message);
                res.status(404).send();
              } else {
                res.redirect("/logout");
              }
            }
          );
        } else{
          res.status(404).send();
        }
      }
    );
  });

module.exports = router;
