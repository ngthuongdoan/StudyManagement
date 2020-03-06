const popup = require("./replaceTemplate");
const session = require("./session");
const conn = require("../models/connection");
const fs = require("fs");
const QuickSort = require("./quicksort");
const Teacher = require("./classes/Teacher");
const teacherPage = fs.readFileSync(`${__dirname}/../views/teacher.html`);
let resultPage = teacherPage;

const sortTeacherByName = results => {
  let arr = [];
  results.forEach(result => arr.push(result.teacherName));
  return QuickSort(arr);
};

const createTeacherTable = (teacherNames, results) => {
  for (i = 0; i < teacherNames.length; i++) {
    for (j = 0; j < results.length; j++) {
      if (results[j].teacherName == teacherNames[i]) {
        let obj = {
          name: results[j].teacherName,
          email: results[j].teacherEmail,
          number: results[j].teacherNumber
        };
        let teacher = new Teacher(obj);
        let data = `<tr class='teacher'>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.number}</td>
        </tr>`;
        fs.appendFileSync(`${__dirname}/../views/teacher-data.html`, data);
      }
    }
  }
};
exports.getMethod = (req, res) => {
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
      let query = `select * from teacher where username=?;`;
      conn.query(query, [req.session.username], (error, results, fields) => {
        const teacherNames = sortTeacherByName(results);
        createTeacherTable(teacherNames, results);
        //CREATE TEACHER PAGE
        const teacherdata = fs.readFileSync(
          `${__dirname}/../views/teacher-data.html`
        );
        resultPage = popup.replaceAccountTemplate(req.session, teacherPage);
        resultPage = popup.replaceTemplate(
          "{% DATA %}",
          teacherdata,
          resultPage
        );
        fs.writeFileSync(`${__dirname}/../views/teacher-data.html`, "");
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
};

exports.postMethod = (req, res) => {
  const teacher = new Teacher({
    name: req.body.teacherName,
    email: req.body.teacherEmail,
    number: req.body.teacherNumber
  });
  console.table(teacher);
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
};
