const express = require("express");
const fs = require("fs");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const dashboardRouter = require("./dashboardRouter");
const teacherRouter = require("./teacherRouter");
const deleteTeacher = require("./teacherDelete");
const timetableRouter = require("./timetableRouter");
const subjectRouter = require("./subjectRouter");
const gradeRouter = require("./gradeRouter");
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
  .route("/delete-teacher")
  .post((req, res) => deleteTeacher.postMethod(req, res));
router
  .route("/delete-subject")
  .post((req, res) => deleteSubject.postMethod(req, res));


module.exports = router;
