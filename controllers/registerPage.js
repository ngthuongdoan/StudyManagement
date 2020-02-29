const fs = require("fs");
const conn = require("../models/connection");
const popup = require("./replaceTemplate");
const User = require("./classes/User");

const register = fs.readFileSync(`${__dirname}/../views/register.html`);

exports.getMethod = (req, res) => {
  res.end(popup.replaceTemplate("{% POPUP %}", "", register));
};

exports.postMethod = (req, res) => {
  const user = new User({
    username:req.body.username,
    pass:req.body.password,
    fullname:req.body.fullname,
    email:req.body.email,
    education:req.body.education,
    firsttime:true
});
  conn.query(
    "INSERT INTO accounts VALUES(?,?,?,?,?,?,?);",
    user.send(),
    (error, results, fields) => {
      //POPUP ERROR IN REGISTER
      console.log(user.send());
      if (error) {
        console.log(error);
        let content = error.sql;
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
