const fs = require("fs");
const express = require("express");
const conn = require("../models/connection");
const session = require("../controllers/session");
const popup = require("../controllers/replaceTemplate");
const timetablePage = fs.readFileSync(`${__dirname}/../views/timetable.html`);
const router = express.Router();

const displayPage = (req, res) => {
  let subjectOnTimetable = fs.readFileSync(
    `${__dirname}/../views/placeholder/subject-on-timetable.html`
  );
  let resultPage = popup.replaceTemplate(
    "{% SUBJECTS %}",
    subjectOnTimetable,
    timetablePage
  );
  fs.writeFileSync(
    `${__dirname}/../views/placeholder/subject-on-timetable.html`,
    ""
  );

  res.end(resultPage);
};

router
  .get("/", (req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        conn.query(
          "SELECT * FROM subjects WHERE username=?",
          [req.session.username],
          (error, results, fields) => {
            results.forEach((result) => {
              let content = `<div class='fc-event fc-subject' style="background-color:${result.color}">${result.subjectName}</div>`;
              fs.appendFileSync(
                `${__dirname}/../views/placeholder/subject-on-timetable.html`,
                content
              );
            });
            displayPage(req, res);
          }
        );
      } else {
        res.redirect("/login");
      }
    }
  })
  .post((req, res) => {
    console.log(req.body);
  });
module.exports = router;
