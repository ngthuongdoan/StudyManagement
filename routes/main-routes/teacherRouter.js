const fs = require("fs");
const express = require("express");
const popup = require("../../controllers/replaceTemplate");
const session = require("../../controllers/session");
const { query } = require("../../models/connection");
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

router
  .route("/")
  .get(async (req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        const queryteachers = await query(
          "select * from teacher where username=?;",
          [req.session.username]
        );
        createTeacherTable(queryteachers);
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
      } else {
        //PREVENT TO LOGIN /teacher BY URL
        res.redirect("/login");
      }
    } else {
      //PREVENT TO LOGIN /teacher BY URL
      res.redirect("/login");
    }
  })
  .post(async (req, res) => {
    const teacher = new Teacher({
      name: req.body.teacherName,
      email: req.body.teacherEmail,
      number: req.body.teacherNumber,
    });
    try {
      await query("INSERT INTO teacher VALUES(?,?,?,?);", [
        req.session.username,
        teacher.name,
        teacher.email,
        teacher.number,
      ]);
      res.status(200).send();
    } catch (e) {
      res.status(404).send();
    }
  })
  .put(async(req, res) => {
    const teacher = new Teacher({
      name: req.body.teacherName,
      email: req.body.teacherEmail,
      number: req.body.teacherNumber,
    });
    try {
      await query(
        "UPDATE teacher SET teacherEmail = ?, teacherNumber = ? WHERE teacherName = ? and username = ?",
        [teacher.email, teacher.number, teacher.name, req.session.username]
      );
      res.redirect("/teacher");
    } catch (e) {
      res.redirect("/notfound");
    }
  })
  .delete(async (req, res) => {
    const teacher = new Teacher({
      name: req.body.teacherName,
      email: req.body.teacherEmail,
      number: req.body.teacherNumber,
    });
    try {
      await query(
        "DELETE FROM teacher WHERE username=? AND teacherName=? AND teacherEmail=?",
        [req.session.username, teacher.name, teacher.email]
      );
      await query("DELETE FROM subjects WHERE username=? AND teacherEmail=?", [
        req.session.username,
        teacher.email,
      ]);
      res.redirect("/teacher");
    } catch (e) {
      res.redirect("/notfound");
    }
  });

module.exports = router;
