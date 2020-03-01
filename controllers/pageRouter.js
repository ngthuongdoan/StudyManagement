const express = require("express");
const fs = require("fs");
const loginRouter = require("./loginPage");
const registerRouter = require("./registerPage");
const dashboardRouter = require("./dashboardPage");
const teacherRouter = require("./teacherPage");

const notfound = fs.readFileSync(`${__dirname}/../views/notfound.html`);

const router = express.Router();

//ROOT
router.route("/").get((req, res) => dashboardRouter.getMethod(req, res));

//LOGIN
router
  .route("/login")
  .get((req, res) => loginRouter.getMethod(req, res))
  .post((req, res) => loginRouter.postMethod(req, res));

///LOGOUT
router.route("/logout").get((req, res) => {
  //REMOVE SESSION
  req.session.destroy();
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
router
  .route("/dashboard")
  .get((req, res) => dashboardRouter.getMethod(req, res));

router
  .route("/teacher")
  .get((req, res) => teacherRouter.getMethod(req, res))
  .post((req, res) => teacherRouter.postMethod(req, res));

module.exports = router;
