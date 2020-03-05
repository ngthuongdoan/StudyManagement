const express = require("express");
const fs = require("fs");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const dashboardRouter = require("./dashboardRouter");
const teacherRouter = require("./teacherRouter");
const deleteTeacher = require("./teacherDelete");
const timetableRouter = require("./timetableRouter");
const subjectRouter = require("./subjectRouter");
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

router
  .route("/delete-teacher")
  .post((req, res) => deleteTeacher.postMethod(req, res));

router
  .route("/timetable")
  .get((req, res) => timetableRouter.getMethod(req, res));

router
  .route("/subject")
  .get((req, res) => subjectRouter.getMethod(req, res))
  .post((req, res) => subjectRouter.postMethod(req, res));

module.exports = router;
