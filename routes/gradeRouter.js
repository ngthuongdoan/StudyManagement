const fs = require("fs");
const express = require("express");
const session = require("../controllers/session");
const popup = require("../controllers/replaceTemplate");
const router = express.Router();
const grade = fs.readFileSync(`${__dirname}/../views/grade.html`);

router.get("/", (req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
        let result = popup.replaceAccountTemplate(req.session, grade);
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
