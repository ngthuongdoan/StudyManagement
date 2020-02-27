const fs = require("fs");
const popup = require("./replaceTemplate");

const firsttime = fs.readFileSync(`${__dirname}/../views/firsttime.html`);
const common = fs.readFileSync(`${__dirname}/../views/common.html`);
const dashboard = fs.readFileSync(`${__dirname}/../views/dashboard.html`);

exports.getMethod = (req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  if (req.session.loggedin) {
    let result = popup.replaceTemplate(
      "{% ACCOUNTNAME %}",
      req.session.fullname,
      dashboard
    );
    result = popup.replaceTemplate("{% AVATAR %}", req.session.avatar, result);
    result = popup.replaceTemplate(
      "{% USERNAME %}",
      req.session.username,
      result
    );
    if (req.session.firsttime) {
      res.end(popup.replaceTemplate("{% CONTENT %}", firsttime, result));
    }
    res.end(res.end(popup.replaceTemplate("{% CONTENT %}", common, result)));
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
};

