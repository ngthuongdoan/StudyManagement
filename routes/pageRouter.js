const express = require("express");
const fs = require("fs");
const loginRouter = require("./main-routes/loginRouter");
const timetableRouter = require("./main-routes/timetableRouter");
const subjectRouter = require("./main-routes/subjectRouter");
const eventRouter = require("./main-routes/eventRouter");
const gradeRouter = require("./main-routes/gradeRouter");
const registerRouter = require("./main-routes/registerRouter");
const dashboardRouter = require("./main-routes/dashboardRouter");
const teacherRouter = require("./main-routes/teacherRouter");
const deleteTeacher = require("./funtion-routes/teacherDelete");
const getSubject = require("./funtion-routes/subjectGet");
const deleteSubject = require("./funtion-routes/subjectDelete");
const getEvent = require("./funtion-routes/eventGet");
const deleteEvent = require("./funtion-routes/eventDelete");
const notfound = fs.readFileSync(`${__dirname}/../views/notfound.html`);

const router = express.Router();

//ROOT
router.use("/", dashboardRouter);
router.use("/dashboard", dashboardRouter);
//ROUTE
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/teacher", teacherRouter);
router.use("/timetable", timetableRouter);
router.use("/subject", subjectRouter);
router.use("/event", eventRouter);
router.use("/grade", gradeRouter);


//FORGET PAGE

//FUNCTION
router
  .route("/delete-teacher")
  .post((req, res) => deleteTeacher.postMethod(req, res));
router
  .route("/delete-subject")
  .post((req, res) => deleteSubject.postMethod(req, res));
router
  .route("/delete-event")
  .post((req, res) => deleteEvent.postMethod(req, res));
router.route("/get-subject").get((req, res) => getSubject.getMethod(req, res));
router.route("/get-event").get((req, res) => getEvent.getMethod(req, res));

//404 NOTFOUND
router.route("/notfound").get((req, res) => {
  res.end(notfound);
});

///LOGOUT
router.route("/logout").get((req, res) => {
  //REMOVE SESSION
  req.session.destroy();
  res.redirect("/login");
});


module.exports = router;
