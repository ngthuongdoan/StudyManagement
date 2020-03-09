const fs = require("fs");
const url = require("url");
const conn = require("../models/connection");
const session = require("../controllers/session");
const popup = require("../controllers/replaceTemplate");
const timetablePage = fs.readFileSync(`${__dirname}/../views/timetable.html`);
let resultPage = timetablePage;

const getDay = num => {
  switch (num) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
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

const displayPage = (req, res) => {
  let option = fs.readFileSync(`${__dirname}/../views/option.html`);
  let timetable = fs.readFileSync(`${__dirname}/../views/timetable-data.html`);
  resultPage = popup.replaceAccountTemplate(req.session, timetablePage);
  resultPage = popup.replaceTemplate("{% TABLE %}", timetable, resultPage);
  resultPage = popup.replaceTemplate("{% OPTION %}", option, resultPage);
  fs.writeFileSync(`${__dirname}/../views/timetable-data.html`, "");
  fs.writeFileSync(`${__dirname}/../views/option.html`, "");
  res.end(resultPage);
};

const timetableData = result => {
  let dataHeader = "<tr>";
  let arr = [];
  for (i = result.startDay; i <= result.endDay; i++) arr.push(getDay(i));
  arr.forEach(el => dataHeader += `<th>${el}</th>`);
  dataHeader += "</tr>";
  fs.appendFileSync(`${__dirname}/../views/timetable-data.html`, dataHeader);
  let dataRow = "";
  for (row = 1; row <= result.periods; row++) {
    dataRow += "<tr>";
    for (col = 1; col <= result.endDay; col++) dataRow += "<td></td>";
    dataRow += "</tr>";
  }
  fs.appendFileSync(`${__dirname}/../views/timetable-data.html`, dataRow);
};

exports.getMethod = (req, res) => {
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
                  timetableData(result);
                  //RES END
                  displayPage(req, res);
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
};
