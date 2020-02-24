const fs = require("fs");
const conn = require("../models/connection");
const popup = require("./replaceTemplate");
const register = fs.readFileSync(`${__dirname}/../views/register.html`);

exports.getMethod = (req, res) => {
  res.end(popup.replaceTemplate("{% POPUP %}", "", register));
};

exports.postMethod = (req, res) => {
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
        let content = "All ready have!";
        res.send(
          popup.replacePopupTemplate(false, "{% POPUP %}", content, register)
        );
      } else {
        //SUCCESS RETURN LOGIN PAGE
        res.redirect("/login");
      }
    }
  );
};
