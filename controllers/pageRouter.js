const express = require("express");
const fs = require("fs");
const conn = require("../models/connection");
const popup = require("./replaceTemplate");
const loginRouter = require("./loginPage");
const registerRouter = require("./registerPage");

const dashboard = fs.readFileSync(`${__dirname}/../views/dashboard.html`);
const teacher = fs.readFileSync(`${__dirname}/../views/teacher.html`);
const notfound = fs.readFileSync(`${__dirname}/../views/notfound.html`);
const firsttime = fs.readFileSync(`${__dirname}/../views/firsttime.html`);
const common = fs.readFileSync(`${__dirname}/../views/common.html`);

const router = express.Router();

//ROOT
router.route("/").get((req, res) => loginRouter.getMethod(req, res));

//LOGIN
router
  .route("/login")
  .get((req, res) => loginRouter.getMethod(req, res))
  .post((req, res) => loginRouter.postMethod(req, res));

///LOGOUT
router.route("/logout").get((req, res) => {
  //REMOVE SESSION
  req.session.loggedin = false;
  res.redirect("/login");
});

//REGISTER
router
  .route("/register")
  .get((req, res) => registerRouter.getMethod(req, res))
  .post((req, res) => registerRouter.postMethod(req, res));

//FORGET PAGE
//404 NOTFOUND
router.route("/notfound").get((req, res) => {
  res.end(notfound);
});

//DASHBOARD
router.route("/dashboard").get((req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  if (req.session.loggedin) {
    let result=popup.replaceTemplate("{% ACCOUNTNAME %}", req.session.fullname, dashboard);
    result=popup.replaceTemplate("{% AVATAR %}",req.session.avatar, result);
    result=popup.replaceTemplate("{% USERNAME %}", req.session.username, result);
    if (req.session.firsttime) {
      res.end(popup.replaceTemplate("{% CONTENT %}", firsttime, result));
    }
    res.end(res.end(popup.replaceTemplate("{% CONTENT %}", common, result)));
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
});

router.route("/teacher").get((req, res) => {
  if (req.session.loggedin) {
    res.end(teacher);
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
});

module.exports = router;
