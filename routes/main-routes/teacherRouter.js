const fs = require("fs");
const express = require("express");
const popup = require("../../controllers/replaceTemplate");
const session = require("../../controllers/session");
const conn = require("../../models/connection");
const QuickSort = require("../../controllers/quicksort");
const Teacher = require("../../controllers/classes/Teacher");
const teacherPage = fs.readFileSync(`${__dirname}/../../views/teacher.html`);
let resultPage = teacherPage;

const router = express.Router();

const createTeacherTable = (results) => {
  for (let j = 0; j < results.length; j++) {
    let obj = {
      name: results[j].teacherName,
      email: results[j].teacherEmail,
      number: results[j].teacherNumber,
    };
    let teacher = new Teacher(obj);
    let link = teacher.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "");
    let data = `<tr class='teacher'">
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.number}</td>
        </tr>`;
    fs.appendFileSync(
      `${__dirname}/../../views/placeholder/teacher-data.html`,
      data
    );
  }
};

router.param("teacherName", (req, res, next, teacherName) => {
  req.teacherName = teacherName;
  next();
});

router
  .route("/")
  .get((req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        let query = "select * from teacher where username=?;";
        conn.query(query, [req.session.username], (error, results, fields) => {
          createTeacherTable(results);
          //CREATE TEACHER PAGE
          const teacherdata = fs.readFileSync(
            `${__dirname}/../../views/placeholder/teacher-data.html`
          );
          resultPage = popup.replaceAccountTemplate(req.session, teacherPage);
          resultPage = popup.replaceTemplate(
            "{% DATA %}",
            teacherdata,
            resultPage
          );
          fs.writeFileSync(
            `${__dirname}/../../views/placeholder/teacher-data.html`,
            ""
          );
          res.end(resultPage);
        });
      } else {
        //PREVENT TO LOGIN /teacher BY URL
        res.redirect("/login");
      }
    } else {
      //PREVENT TO LOGIN /teacher BY URL
      res.redirect("/login");
    }
  })
  .post((req, res) => {
    const teacher = new Teacher({
      name: req.body.teacherName,
      email: req.body.teacherEmail,
      number: req.body.teacherNumber,
    });
    conn.query(
      "INSERT INTO teacher VALUES(?,?,?,?);",
      [req.session.username, teacher.name, teacher.email, teacher.number],
      (error, results, fields) => {
        //POPUP ERROR IN TEACHER
        if (error) {
          res.end(
            popup.replacePopupTemplate(
              false,
              "{% POPUP %}",
              "Duplicate",
              resultPage
            )
          );
        } else {
          res.redirect("/teacher");
        }
      }
    );
  })
  .put((req, res) => {
    const teacher = new Teacher({
      name: req.body.teacherName,
      email: req.body.teacherEmail,
      number: req.body.teacherNumber,
    });
    console.log(teacher);
    conn.query(
      "UPDATE teacher SET teacherEmail = ?, teacherNumber = ? WHERE teacherName = ? and username = ?",
      [teacher.email, teacher.number, teacher.name, req.session.username],
      (error, results, fields) => {
        if (!error) {
          res.redirect("/teacher");
        }
      }
    );
  })
  .delete((req, res) => {
    const teacher = new Teacher({
      name: req.body.teacherName,
      email: req.body.teacherEmail,
      number: req.body.teacherNumber,
    });
    conn.query(
      "DELETE FROM teacher WHERE username=? AND teacherName=? AND teacherEmail=?",
      [req.session.username, teacher.name, teacher.email],
      (error, results, fields) => {
        conn.query(
          "DELETE FROM subjects WHERE username=? AND teacherEmail=?",
          [req.session.username, teacher.email],
          (error, results, fields) => {
            if (!error) {
              res.redirect("/teacher");
            }
          }
        );
      }
    );
  });

router.get("/:teacherName", (req, res) => {
  res.redirect("/teacher");
});

module.exports = router;
