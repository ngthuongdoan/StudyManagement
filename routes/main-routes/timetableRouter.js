const fs = require("fs");
const express = require("express");
const { query } = require("../../models/connection");
const session = require("../../controllers/session");
const popup = require("../../controllers/replaceTemplate");
const timetablePage = fs.readFileSync(
  `${__dirname}/../../views/timetable.html`
);
const router = express.Router();

const displayPage = (req, res) => {
  let subjectOnTimetable = fs.readFileSync(
    `${__dirname}/../../views/placeholder/subject-on-timetable.html`
  );
  let eventOnTimetable = fs.readFileSync(
    `${__dirname}/../../views/placeholder/event-on-timetable.html`
  );
  let resultPage = popup.replaceTemplate(
    "{% SUBJECTS %}",
    subjectOnTimetable,
    timetablePage
  );
  resultPage = popup.replaceTemplate(
    "{% EVENTS %}",
    eventOnTimetable,
    resultPage
  );
  fs.writeFileSync(
    `${__dirname}/../../views/placeholder/subject-on-timetable.html`,
    ""
  );
  fs.writeFileSync(
    `${__dirname}/../../views/placeholder/event-on-timetable.html`,
    ""
  );

  res.end(resultPage);
};

router.route("/").get(async (req, res) => {
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
      const subjects = await query("SELECT * FROM subjects WHERE username=?", [
        req.session.username,
      ]);
      subjects.forEach((result) => {
        let content = `<div class='fc-event fc-subject' data-subject='{
                "id":"${result.idSubject}",
                "title":"${result.subjectName}",
                "department":"${result.subjectRoom}",
                "week":"${result.subjectWeek}",
                "target":"${result.subjectTarget}",
                "note":"${result.subjectNote}",
                "teacherEmail":"${result.teacherEmail}",
                "daysOfWeek":"${result.subjectDay}",
                "startTime":"${result.subjectStartTime}",
                "endTime":"${result.subjectEndTime}",
                "startRecur":"${result.subjectStartRecur}",
                "endRecur":"${result.subjectEndRecur}",
                "backgroundColor":"${result.subjectColor}",
                "editable":"false"
              }' style="background-color:#${result.subjectColor}">${result.subjectName}</div>`;
        fs.appendFileSync(
          `${__dirname}/../../views/placeholder/subject-on-timetable.html`,
          content
        );
      });
      const events = await query("SELECT * FROM events WHERE username=?", [
        req.session.username,
      ]);
      events.forEach((result) => {
        let content = `<div class='fc-event' data-event='{
                    "title": "${result.eventName}",
                    "start": "${result.eventStartTime}",
                    "end": "${result.eventEndTime}",
                    "extendedProps": {
                      "department": "${result.eventPlace}"
                    },
                    "description": "${result.eventNote}",
                    "backgroundColor": "${result.eventColor}"
                  }' style="background-color:#${result.eventColor}">${result.eventName}</div>`;
        fs.appendFileSync(
          `${__dirname}/../../views/placeholder/event-on-timetable.html`,
          content
        );
      });
      displayPage(req, res);
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
