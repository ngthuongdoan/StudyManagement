const express = require("express");
const bcrypt = require("bcrypt");
const { query } = require("../../models/connection");
const router = express.Router();

router.route("/").put(async (req, res) => {
  const checkpassword = req.body.oldpassword;
  const querypassword = await query(
    "SELECT pass FROM accounts WHERE username=?",
    [req.session.username]
  );
  const password = querypassword[0].pass;
  if (bcrypt.compareSync(checkpassword, password)) {
    const newpass = bcrypt.hashSync(req.body.newpassword, 10);
    try {
      await query(
        "UPDATE accounts SET pass=? WHERE username = ?", 
        [newpass, req.session.username]
      );
      res.redirect("/logout");
    } catch (e) {
      console.log(e.message);
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
});

module.exports = router;
