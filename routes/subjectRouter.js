const fs = require("fs");
const express = require("express");
const conn = require("../models/connection");
const session = require("../controllers/session");
const QuickSort = require("../controllers/quicksort");
const popup = require("../controllers/replaceTemplate");
const Subject = require("../controllers/classes/Subject");
const subjectPage = fs.readFileSync(`${__dirname}/../views/subject.html`);
let resultPage;
const router = express.Router();

const sortTeacherByName = results => {
  let arr = [];
  results.forEach(result => arr.push(result.subjectName));
  return QuickSort(arr);
};

const createSubjectCards = (subjectNames, results) => {
  for (i = 0; i < subjectNames.length; i++) {
    for (j = 0; j < results.length; j++) {
      if (results[j].subjectName == subjectNames[i]) {
        let card = fs.readFileSync(`${__dirname}/../views/card.html`);
        card = popup.replaceTemplate(/{% ID %}/g, results[j].idSubject, card);
        card = popup.replaceTemplate("{% TARGET %}", results[j].target, card);
        card = popup.replaceTemplate(
          "{% SUBJECTNAME %}",
          results[j].subjectName,
          card
        );
        card = popup.replaceTemplate(
          "{% TEACHERNAME %}",
          results[j].teacherName,
          card
        );
        fs.appendFileSync(`${__dirname}/../views/subject-data.html`, card);
      }
    }
  }
};

const addTeacher = results => {
  results.forEach(el => {
    let data = `<option value='${el.teacherName}'>${el.teacherName}</option>\n`;
    fs.appendFileSync(`${__dirname}/../views/teacher-name.html`, data);
  });
};

const replaceResultPage = session => {
  const teacherData = fs.readFileSync(
    `${__dirname}/../views/teacher-name.html`
  );
  const subjectdata = fs.readFileSync(
    `${__dirname}/../views/subject-data.html`
  );
  resultPage = popup.replaceTemplate("{% TEACHER %}", teacherData, subjectPage);
  resultPage = popup.replaceAccountTemplate(session, resultPage);
  resultPage = popup.replaceTemplate("{% CARDS %}", subjectdata, resultPage);
  fs.writeFileSync(`${__dirname}/../views/teacher-name.html`, "");
  fs.writeFileSync(`${__dirname}/../views/subject-data.html`, "");
};

router
  .get("/", (req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        conn.query(
          "SELECT * FROM subjects WHERE username=?",
          [req.session.username],
          (error, results, fields) => {
            const subjectNames = sortTeacherByName(results);
            createSubjectCards(subjectNames, results);
            conn.query(
              "SELECT * FROM teacher WHERE username=?",
              [req.session.username],
              (error, results, fields) => {
                addTeacher(results);
                replaceResultPage(req.session);
                res.end(resultPage);
              }
            );
          }
        );
      } else {
        res.redirect("/login");
      }
    } else {
      //PREVENT TO LOGIN /dashboard BY URL
      res.redirect("/login");
    }
  })
  .post("/", (req, res) => {
    conn.query(
      "SELECT teacherEmail FROM teacher WHERE username=? AND teacherName=?",
      [req.session.username, req.body.teacherName],
      (error, results, fields) =>
        (req.session.teacherEmail = results[0].teacherEmail)
    );
    //CREATE SUBJECT OBJ TO POST
    const subject = new Subject({
      id: req.body.idSubject,
      teachername: req.body.teacherName,
      teacheremail: req.session.teacherEmail,
      subjectname: req.body.subjectName,
      room: req.body.room,
      studytime: "a",
      target: req.body.target,
      note: req.body.note
    });
    conn.query(
      `INSERT INTO subjects VALUE('${req.session.username}',?,?,?,?,?,?,?,?)`,
      subject.send(),
      (error, results, fields) => {
        if (error) console.log(error.sql);
      }
    );
    res.redirect("/subject");
  });

module.exports = router;
