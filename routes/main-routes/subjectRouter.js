const fs = require("fs");
const express = require("express");
const conn = require("../../models/connection");
const session = require("../../controllers/session");
const popup = require("../../controllers/replaceTemplate");
const Subject = require("../../controllers/classes/Subject");
const subjectPage = fs.readFileSync(`${__dirname}/../../views/subject.html`);
let resultPage;
const router = express.Router();

const createSubjectCards = (req, results) => {
  for (let j = 0; j < results.length; j++) {
    let subjectCard = fs.readFileSync(
      `${__dirname}/../../views/placeholder/subject-card.html`
    );
    subjectCard = popup.replaceTemplate(
      /{% ID %}/g,
      results[j].idSubject,
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "{% TARGET %}",
      results[j].subjectTarget,
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "{% SUBJECTNAME %}",
      results[j].subjectName,
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "COLOR",
      results[j].subjectColor,
      subjectCard
    );

    conn.query(
      `select teacherName from subjects join teacher on subjects.teacherEmail = teacher.teacherEmail
    where teacher.username=? and idSubject=?`,
      [req.session.username, results[j].idSubject],
      (error, results, fields) => {
        subjectCard = popup.replaceTemplate(
          "{% TEACHERNAME %}",
          results[0].teacherName,
          subjectCard
        );
        fs.appendFileSync(
          `${__dirname}/../../views/placeholder/subject-data.html`,
          subjectCard
        );
      }
    );
  }
};

const addTeacher = (results) => {
  results.forEach((el) => {
    let data = `<option value='${el.teacherName}'>${el.teacherName}</option>\n`;
    fs.appendFileSync(
      `${__dirname}/../../views/placeholder/teacher-name.html`,
      data
    );
  });
};

const replaceResultPage = (session) => {
  const teacherData = fs.readFileSync(
    `${__dirname}/../../views/placeholder/teacher-name.html`
  );
  const subjectdata = fs.readFileSync(
    `${__dirname}/../../views/placeholder/subject-data.html`
  );
  resultPage = popup.replaceTemplate("{% TEACHER %}", teacherData, subjectPage);
  resultPage = popup.replaceAccountTemplate(session, resultPage);
  resultPage = popup.replaceTemplate("{% CARDS %}", subjectdata, resultPage);

  fs.writeFileSync(
    `${__dirname}/../../views/placeholder/teacher-name.html`,
    ""
  );
  fs.writeFileSync(
    `${__dirname}/../../views/placeholder/subject-data.html`,
    ""
  );
};

router
  .route("/")
  .get((req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        conn.query(
          "SELECT * FROM subjects WHERE username=?",
          [req.session.username],
          (error, results, fields) => {
            createSubjectCards(req, results);
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
  .post((req, res) => {
    // console.log(req.body);
    conn.query(
      "SELECT teacherEmail FROM teacher WHERE username=? AND teacherName=?",
      [req.session.username, req.body.teacherName],
      (error, results, fields) => {
        req.session.teacherEmail = results[0].teacherEmail;
        //CREATE SUBJECT OBJ TO POST
        const subject = new Subject({
          idSubject: req.body.idSubject,
          subjectName: req.body.subjectName,
          teacherEmail: req.session.teacherEmail,
          subjectRoom: req.body.subjectRoom,
          subjectWeek: req.body.subjectWeek,
          subjectDay: req.body.subjectDay,
          subjectStartRecur: req.body.subjectStartRecur,
          subjectEndRecur: req.body.subjectEndRecur,
          subjectStartTime: req.body.subjectStartTime,
          subjectEndTime: req.body.subjectEndTime,
          subjectTarget: req.body.subjectTarget,
          subjectNote: req.body.subjectNote,
          subjectColor: "#" + req.body.subjectColor,
        });
        conn.query(
          `INSERT INTO subjects VALUE('${req.session.username}',?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          subject.post(),
          (error, results, fields) => {
            if (error) {
              console.log(error.sql);
              res.redirect("/notfound");
            } else {
              res.redirect("/subject");
            }
          }
        );
      }
    );
  })
  .delete((req, res) => {
    const subject = new Subject({
      idSubject: req.body.idSubject,
    });
    conn.query(
      "DELETE FROM subjects WHERE username=? AND idSubject=?",
      [req.session.username, subject.getId()],
      (error, results, fields) => {
        if (error) {
          console.log(error.message);
          res.redirect("/notfound");
        } else {
          res.redirect("/subject");
        }
      }
    );
  });
module.exports = router;
