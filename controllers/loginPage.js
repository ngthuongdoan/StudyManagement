const fs = require("fs");
const bcrypt = require("bcrypt");
const conn = require("../models/connection");
const popup = require("./replaceTemplate");
const login = fs.readFileSync(`${__dirname}/../views/login.html`);

exports.getMethod = (req, res) => {
  res.end(popup.replaceTemplate("{% POPUP %}", "", login));
};

exports.postMethod = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  conn.query(
    "SELECT pass,firsttime FROM accounts WHERE username = ?",
    [username],
    (error, results, fields) => {
      if (undefined !== results && results.length > 0) {
        if (bcrypt.compareSync(password, results[0].pass)) {
          req.session.loggedin = true;
          req.session.username = username;
          req.session.firsttime = results[0].firsttime;
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
};
