const fs = require("fs");
const express = require("express");
const conn = require("../models/connection");
const popup = require("../controllers/replaceTemplate");
const User = require("../controllers/classes/User");
const router = express.Router();
const register = fs.readFileSync(`${__dirname}/../views/register.html`);

router
  .get("/", (req, res) => {
    res.end(popup.replaceTemplate("{% POPUP %}", "", register));
  })
  .post("/", (req, res) => {
    const user = new User({
      username: req.body.username,
      pass: req.body.password,
      fullname: req.body.fullname,
      email: req.body.email,
      education: req.body.education
    });
    conn.query(
      "INSERT INTO accounts VALUES(?,?,?,?,?,?);",
      user.send(),
      (error, results, fields) => {
        //POPUP ERROR IN REGISTER
        if (error) {
          let content = "All ready have!!!";
          res.send(
            popup.replacePopupTemplate(false, "{% POPUP %}", content, register)
          );
        } else {
          //SUCCESS RETURN LOGIN PAGE
          res.redirect("/login");
        }
      }
    );
  });

module.exports =router;
