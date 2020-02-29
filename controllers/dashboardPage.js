const fs = require("fs");
const session = require("./session");
const popup = require("./replaceTemplate");

const firsttime = fs.readFileSync(`${__dirname}/../views/firsttime.html`);
const common = fs.readFileSync(`${__dirname}/../views/common.html`);
const dashboard = fs.readFileSync(`${__dirname}/../views/dashboard.html`);

exports.getMethod = (req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
      let result = popup.replaceAccountTemplate(req.session, dashboard);
      let content = `<script>
    Swal.fire({
        icon: 'success',
        title: 'Login Success <3',
    });
    </script>`;
      if (req.session.popup) {
        req.session.popup = false;
        result = popup.replaceTemplate("{% POPUP %}", content, result);
      } else {
        result = popup.replacePopupTemplate(true, "{% POPUP %}", "", result);
      }
      if (req.session.firsttime) {
        res.end(popup.replaceTemplate("{% CONTENT %}", firsttime, result));
      }
      res.end(res.end(popup.replaceTemplate("{% CONTENT %}", common, result)));
    } else {
      res.redirect("/login");
    }
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
};
