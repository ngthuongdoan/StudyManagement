const express = require("express");
const fs = require("fs");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const dashboardRouter = require("./dashboardRouter");
const teacherRouter = require("./teacherRouter");
const deleteTeacher = require("./teacherDelete");
const timetableRouter = require("./timetableRouter");
const subjectRouter = require("./subjectRouter");
const eventRouter = require("./eventRouter");
const gradeRouter = require("./gradeRouter");
const addSubjectRouter = require("./addSubjectRouter");
const getSubject = require("./subjectGet");
const getEvent = require("./eventGet");
const deleteSubject = require("./subjectDelete");
const notfound = fs.readFileSync(`${__dirname}/../views/notfound.html`);

const router = express.Router();

//ROOT
router.use("/", dashboardRouter);
router.use("/dashboard", dashboardRouter);
//LOGIN
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/teacher", teacherRouter);
router.use("/timetable", timetableRouter);
router.use("/subject", subjectRouter);
router.use("/event", eventRouter);
router.use("/grade", gradeRouter);

///LOGOUT
router.route("/logout").get((req, res) => {
  //REMOVE SESSION
  req.session.destroy();
  res.redirect("/login");
});

//FORGET PAGE
//404 NOTFOUND
router.route("/notfound").get((req, res) => {
  res.end(notfound);
});

//DASHBOARD
router
  .route("/add-subject")
  .post((req, res) => addSubjectRouter.postMethod(req, res));
router
  .route("/delete-teacher")
  .post((req, res) => deleteTeacher.postMethod(req, res));
router
  .route("/delete-subject")
  .post((req, res) => deleteSubject.postMethod(req, res));
router.route("/get-subject").get((req, res) => getSubject.getMethod(req, res));

router.route("/get-event").get((req, res) => getEvent.getMethod(req, res));

module.exports = router;
