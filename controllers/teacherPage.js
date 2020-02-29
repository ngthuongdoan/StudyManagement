const popup = require("./replaceTemplate");
const session = require("./session");
const conn = require("../models/connection");
const fs = require("fs");
const Teacher = require("./classes/Teacher");
const teacherPage = fs.readFileSync(`${__dirname}/../views/teacher.html`);

exports.getMethod = (req, res) => {
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
      let query = `select a.* from teacher as a, accounts as b, include as c, subjects as d
      where
          b.username=? and
          b.username=c.username and
          c.idSubject= d.idSubject and
          d.teacherName=a.teacherName and
          d.teacherEmail=a.teacherEmail
      ;`;
      conn.query(query, [req.session.username], (error, results, fields) => {
        results.forEach(result => {
          let obj = {
            name: result.teacherName,
            email: result.teacherEmail,
            number: result.teacherNumber
          };
          let teacher = new Teacher(obj);
          let data = `<tr>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.number}</td>
        </tr><br>`;
          fs.appendFileSync(`${__dirname}/../views/teacher-data.html`, data);
        });
        const teacherdata = fs.readFileSync(
          `${__dirname}/../views/teacher-data.html`
        );
        let resultPage = popup.replaceAccountTemplate(req.session, teacherPage);
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
