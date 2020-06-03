const express = require("express");
const fs = require("fs");
const loginRouter = require("./main-routes/loginRouter");
const timetableRouter = require("./main-routes/timetableRouter");
const subjectRouter = require("./main-routes/subjectRouter");
const eventRouter = require("./main-routes/eventRouter");
const accountRouter = require("./main-routes/accountRouter");
const registerRouter = require("./main-routes/registerRouter");
const dashboardRouter = require("./main-routes/dashboardRouter");
const teacherRouter = require("./main-routes/teacherRouter");
const getSubject = require("./funtion-routes/subjectGet");
const getEvent = require("./funtion-routes/eventGet");
const changeAvatar = require("./funtion-routes/changeAvatar");
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
router.use("/account", accountRouter);


//FORGET PAGE

//FUNCTION
router.route("/get-subject").get((req, res) => getSubject.getMethod(req, res));
router.route("/get-event").get((req, res) => getEvent.getMethod(req, res));
router.use("/change-avatar", changeAvatar);

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
