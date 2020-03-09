const fs = require("fs");
const express = require("express");
const session = require("../controllers/session");
const popup = require("../controllers/replaceTemplate");
const router = express.Router();
const dashboard = fs.readFileSync(`${__dirname}/../views/dashboard.html`);

router.get("/", (req, res) => {
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
      res.end(result);
    } else {
      res.redirect("/login");
    }
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
});

module.exports = router;
