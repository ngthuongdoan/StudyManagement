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

const createSubjectCards = results => {
  for (let j = 0; j < results.length; j++) {
    let card = fs.readFileSync(`${__dirname}/../views/placeholder/card.html`);
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
    fs.appendFileSync(`${__dirname}/../views/placeholder/subject-data.html`, card);
  }
};

const addTeacher = results => {
  results.forEach(el => {
    let data = `<option value='${el.teacherName}'>${el.teacherName}</option>\n`;
    fs.appendFileSync(`${__dirname}/../views/placeholder/teacher-name.html`, data);
  });
};

const replaceResultPage = session => {
  const teacherData = fs.readFileSync(
    `${__dirname}/../views/placeholder/teacher-name.html`
  );
  const subjectdata = fs.readFileSync(
    `${__dirname}/../views/placeholder/subject-data.html`
  );
  resultPage = popup.replaceTemplate("{% TEACHER %}", teacherData, subjectPage);
  resultPage = popup.replaceAccountTemplate(session, resultPage);
  resultPage = popup.replaceTemplate("{% CARDS %}", subjectdata, resultPage);
  if(session.notify){
    resultPage = popup.replaceTemplate("{% NOTIFY %}", session.notify, resultPage);
    session.notify="";
  }
  fs.writeFileSync(`${__dirname}/../views/placeholder/teacher-name.html`, "");
  fs.writeFileSync(`${__dirname}/../views/placeholder/subject-data.html`, "");
};

router
  .get("/", (req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        conn.query(
          "SELECT * FROM subjects WHERE username=?",
          [req.session.username],
          (error, results, fields) => {
            createSubjectCards(results);
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
      (error, results, fields) => {
        req.session.teacherEmail = results[0].teacherEmail;

        // conn.query(
        //   "SELECT studyTime FROM subjects WHERE username=? ORDER BY studyTime;",
        //   [req.session.username],
        //   (error, results, fields) => {
        //     const allStudyTime = Array.from(
        //       results,
        //       result => result.studyTime
        //     );
        //     const days = {
        //       Monday: 0,
        //       Tuesday: 1,
        //       Wednesday: 2,
        //       Thursday: 3,
        //       Friday: 4,
        //       Saturday: 5,
        //       Sunday: 6
        //     };
        //     const testStudyTime = req.body.studyTime.replace(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/gi, function(matched) {
        //       return days[matched];
        //     });
        //     const [dayTest, periodTest] = testStudyTime.split(" ");
        //     const [startTimeTest, endTimeTest] = periodTest.split("");
        //     // console.log(dayTest,startTimeTest,endTimeTest);
        //     let state = false;
        //     allStudyTime.forEach(el => {
        //       let [dayA, periodA] = el.split(" ");
        //       if (dayA == dayTest) {
        //         let [startTimeA, endTimeA] = periodA.split("");
        //         if (endTimeA >= startTimeTest) {
        //           state = true;
        //         }
        //       }
        //     });

        //     if (state) {
        //       // addTeacher(results);
        //       const notify = `<script>Swal.fire({
        //         icon: "error",
        //         title: "Your input has coincidence"
        //       });
        //       </script>`;
        //       req.session.notify = notify;
        //       res.redirect("/subject");
        //     } else {
              //CREATE SUBJECT OBJ TO POST
              const subject = new Subject({
                id: req.body.idSubject,
                teachername: req.body.teacherName,
                teacheremail: req.session.teacherEmail,
                subjectname: req.body.subjectName,
                room: req.body.room,
                studytime: "",
                target: req.body.target,
                note: req.body.note,
                color: req.body.color
              });
              conn.query(
                `INSERT INTO subjects VALUE('${req.session.username}',?,?,?,?,?,?,?,?,?)`,
                subject.send(),
                (error, results, fields) => {
                  if (error) console.log(error.sql);
                  conn.query(
                    `INSERT INTO include VALUE('${subject.id}','Untitled 1','${req.session.username}')`,
                    (error, results, fields) => {
                      res.redirect("/subject");
                    }
                  );
                }
              );
            }
        );
      }
    );

module.exports = router;
