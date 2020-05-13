const fs = require("fs");
const express = require("express");
const conn = require("../models/connection");
const session = require("../controllers/session");
const QuickSort = require("../controllers/quicksort");
const popup = require("../controllers/replaceTemplate");
const eventPage = fs.readFileSync(`${__dirname}/../views/event.html`);
let resultPage;
const router = express.Router();

const createEventCards = (results) => {
  for (let j = 0; j < results.length; j++) {
    let card = fs.readFileSync(`${__dirname}/../views/card.html`);
    card = popup.replaceTemplate(/{% ID %}/g, results[j].idSubject, card);
    card = popup.replaceTemplate("{% TARGET %}", results[j].target, card);
    card = popup.replaceTemplate(
      "{% SUBJECTNAME %}",
      results[j].subjectName,
      card
    );
    card = popup.replaceTemplate("COLOR", results[j].color, card);
    card = popup.replaceTemplate(
      "{% TEACHERNAME %}",
      results[j].teacherName,
      card
    );
    fs.appendFileSync(`${__dirname}/../views/subject-data.html`, card);
  }
};

const addTeacher = (results) => {
  results.forEach((el) => {
    let data = `<option value='${el.teacherName}'>${el.teacherName}</option>\n`;
    fs.appendFileSync(`${__dirname}/../views/teacher-name.html`, data);
  });
};

const replaceResultPage = (session) => {
  const teacherData = fs.readFileSync(
    `${__dirname}/../views/teacher-name.html`
  );
  const subjectdata = fs.readFileSync(
    `${__dirname}/../views/subject-data.html`
  );
  resultPage = popup.replaceTemplate("{% TEACHER %}", teacherData, eventPage);
  resultPage = popup.replaceAccountTemplate(session, resultPage);
  resultPage = popup.replaceTemplate("{% CARDS %}", subjectdata, resultPage);
  if (session.notify) {
    resultPage = popup.replaceTemplate(
      "{% NOTIFY %}",
      session.notify,
      resultPage
    );
    session.notify = "";
  }
  fs.writeFileSync(`${__dirname}/../views/teacher-name.html`, "");
  fs.writeFileSync(`${__dirname}/../views/subject-data.html`, "");
};

router.get("/", (req, res) => {
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
      replaceResultPage(req.session);
      res.end(resultPage);
    } else {
      res.redirect("/login");
    }
  } else {
    //PREVENT TO LOGIN /dashboard BY URL
    res.redirect("/login");
  }
});

module.exports = router;
