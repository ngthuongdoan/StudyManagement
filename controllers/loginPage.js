const fs = require("fs");
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
    "SELECT * FROM accounts WHERE username = ? AND pass = ?",
    [username, password],
    (error, results, fields) => {
      if (undefined !== results && results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.firsttime = results[0].firsttime;
        //CHECK TO SHOW INITIAL PAGE
        res.redirect("/dashboard");
      } else {
        let content = "Incorrect username or password!";
        res.send(
          popup.replacePopupTemplate(false, "{% POPUP %}", content, login)
        );
      }
      res.end();
    }
  );
};
