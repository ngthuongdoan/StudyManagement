const fs = require("fs");
const express = require("express");
const url = require("url");
const conn = require("../models/connection");
const session = require("../controllers/session");
const popup = require("../controllers/replaceTemplate");
const timetablePage = fs.readFileSync(`${__dirname}/../views/timetable.html`);
const router = express.Router();

const getDay = num => {
  switch (num) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  }
};

const optionPage = (state, results, req) => {
  if (!state) {
    results.forEach(result => {
      const timetableName = result.timetableName;
      const data = `<option value='${timetableName}' href='/timetable?timetableName=${timetableName}'>${timetableName}</option><br>`;
      fs.appendFileSync(`${__dirname}/../views/option.html`, data);
    });
  } else {
    results.forEach(result => {
      const timetableName = result.timetableName;
      const selected = url.parse(req.url, true).query.timetableName;
      const data =
        selected == timetableName
          ? `<option value='${timetableName}' href='/timetable?timetableName=${timetableName}' selected>${timetableName}</option><br>`
          : `<option value='${timetableName}' href='/timetable?timetableName=${timetableName}'>${timetableName}</option><br>`;
      fs.appendFileSync(`${__dirname}/../views/option.html`, data);
    });
  }
};

const timetableData = (result, req, res) => {
  const startDay = result.startDay;
  const endDay = result.endDay;
  const periods = result.periods;

  let data = new Array(periods)
    .fill("")
    .map(() => new Array(endDay + 1).fill(""));
  let query = `select a.* from subjects as a, include as b
  where
    b.timetableName = ? and
      b.username=? and
      b.idSubject = a.idSubject
  ;`;

  conn.query(
    query,
    [result.timetableName, req.session.username],
    (error, results, fields) => {
        let dataHeader = "<tr>";
        let arr = [];
        for (let i = startDay; i <= endDay; i++) arr.push(getDay(i));
        arr.forEach(el => (dataHeader += `<th>${el}</th>`));
        dataHeader += "</tr>";
        fs.appendFileSync(
          `${__dirname}/../views/timetable-data.html`,
          dataHeader
        );
        results.forEach(result=>{
          let studytime = result.studyTime.split(";");
          studytime.forEach(time => {
            let [day, period] = time.split(" ");
            let [start, end] = period.split("");
            for (let i = start - 1; i <= end - 1; i++) {
              data[i][day] = result.idSubject + " " + result.color;
            }
          });
        });
        
        let dataRow = "";
        for (let row = 0; row < periods; row++) {
          dataRow += "<tr>";
          for (let col = 0; col <= endDay; col++) {
            let [id, color] = data[row][col].split(" ");
            if (id !== "") {
              dataRow += `<td bgcolor='${color}'">${id}</td>\n`;
            } else {
              dataRow += `<td>${id}</td>\n`;
            }
          }
          dataRow += "</tr>\n";
        }

        fs.appendFileSync(`${__dirname}/../views/timetable-data.html`, dataRow);
      // }catch(e){
      //   res.redirect('/timetable')
      // }
        displayPage(req, res);
      
    }
  );
};

const displayPage = (req, res) => {
  let option = fs.readFileSync(`${__dirname}/../views/option.html`);
  let timetable = fs.readFileSync(`${__dirname}/../views/timetable-data.html`);
  let resultPage = popup.replaceAccountTemplate(req.session, timetablePage);
  resultPage = popup.replaceTemplate("{% TABLE %}", timetable, resultPage);
  resultPage = popup.replaceTemplate("{% OPTION %}", option, resultPage);
  fs.writeFileSync(`${__dirname}/../views/timetable-data.html`, "");
  fs.writeFileSync(`${__dirname}/../views/option.html`, "");
  res.end(resultPage);
};

router.get("/", (req, res) => {
  if (session.sessionCheck(req, res)) {
    if (req.session.loggedin) {
      if (req.query.timetableName !== undefined) {
        conn.query(
          "SELECT * FROM timetable WHERE username=?",
          [req.session.username],
          (error, results, fields) => {
            //CREATE OPTION LIST
            optionPage(req.query.timetableName !== undefined, results, req);
            let timetableName = url.parse(req.url, true).query.timetableName;
            conn.query(
              "SELECT * FROM timetable WHERE username=? AND timetableName=?",
              [req.session.username, timetableName],
              (error, results, fields) => {
                results.forEach(result => {
                  //CREATE TIMETABLE
                  timetableData(result, req, res);
                });
              }
            );
          }
        );
      } else {
        conn.query(
          "SELECT * FROM timetable WHERE username=?",
          [req.session.username],
          (error, results, fields) => {
            //CREATE OPTION LIST
            optionPage(req.query.timetableName !== undefined, results, req);
            //RES END
            displayPage(req, res);
          }
        );
      }
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
