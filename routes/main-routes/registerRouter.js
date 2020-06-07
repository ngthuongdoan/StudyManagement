const fs = require("fs");
const express = require("express");
const { query } = require("../../models/connection");
const popup = require("../../controllers/replaceTemplate");
const User = require("../../controllers/classes/User");
const router = express.Router();
const register = fs.readFileSync(`${__dirname}/../../views/register.html`);

router
  .get("/", (req, res) => {
    res.end(popup.replaceTemplate("{% POPUP %}", "", register));
  })
  .post("/", async (req, res) => {
    const user = new User({
      username: req.body.username,
      pass: req.body.password,
      fullname: req.body.fullname,
      email: req.body.email,
      education: req.body.education,
    });
    try {
      await query("INSERT INTO accounts VALUES(?,?,?,?,?,?);", user.send());
      res.redirect("/login");
    } catch (e) {
      let content = "All ready have!!!";
      res.send(
        popup.replacePopupTemplate(false, "{% POPUP %}", content, register)
      );
    }
  });

module.exports = router;
