const fs = require("fs");
const express = require("express");
const { query } = require("../../models/connection");
const session = require("../../controllers/session");
const popup = require("../../controllers/replaceTemplate");
const Subject = require("../../controllers/classes/Subject");
const subjectPage = fs.readFileSync(`${__dirname}/../../views/subject.html`);
let resultPage;
const router = express.Router();

const createSubjectCards = async (req, results) => {
  for (let j = 0; j < results.length; j++) {
    let startRecur = results[j].subjectStartRecur;
    startRecur.setHours(startRecur.getHours() + 7);
    let endRecur = results[j].subjectEndRecur;
    endRecur.setHours(endRecur.getHours() + 7);
    const currentSubject = new Subject({
      id: results[j].idSubject,
      title: results[j].subjectName,
      teacherEmail: req.session.teacherEmail,
      department: results[j].subjectRoom,
      // week: results[j].subjectWeek,
      day: results[j].subjectDay,
      startRecur: startRecur,
      endRecur: endRecur,
      start: results[j].subjectStartTime,
      end: results[j].subjectEndTime,
      target: results[j].subjectTarget,
      note: results[j].subjectNote,
      backgroundColor: results[j].subjectColor,
    });
    let subjectCard = fs.readFileSync(
      `${__dirname}/../../views/placeholder/subject-card.html`
    );
    subjectCard = popup.replaceTemplate(
      /{% ID %}/g,
      currentSubject.id,
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "{% DATA %}",
      JSON.stringify(currentSubject.send()),
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "{% TARGET %}",
      currentSubject.target,
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "{% SUBJECTNAME %}",
      currentSubject.title,
      subjectCard
    );
    subjectCard = popup.replaceTemplate(
      "COLOR",
      "#" + currentSubject.backgroundColor,
      subjectCard
    );

    const queryteachers = await query(
      `select teacherName from subjects join teacher on subjects.teacherEmail = teacher.teacherEmail
    where teacher.username=? and idSubject=?`,
      [req.session.username, currentSubject.id]
    );
    subjectCard = popup.replaceTemplate(
      "{% TEACHERNAME %}",
      queryteachers[0].teacherName,
      subjectCard
    );
    fs.appendFileSync(
      `${__dirname}/../../views/placeholder/subject-data.html`,
      subjectCard
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
  resultPage = popup.replaceTemplate(
    /{% TEACHER %}/gi,
    teacherData,
    subjectPage
  );
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
  .get(async (req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        const querysubjects = await query(
          "SELECT * FROM subjects WHERE username=?",
          [req.session.username]
        );
        const queryteachers = await query(
          "SELECT * FROM teacher WHERE username=?",
          [req.session.username]
        );
        await createSubjectCards(req, querysubjects);
        addTeacher(queryteachers);
        replaceResultPage(req.session);
        res.end(resultPage);
      } else {
        res.redirect("/login");
      }
    } else {
      //PREVENT TO LOGIN /dashboard BY URL
      res.redirect("/login");
    }
  })
  .post(async (req, res) => {
    const queryteacher = await query(
      "SELECT teacherEmail FROM teacher WHERE username=? AND teacherName=?",
      [req.session.username, req.body.teacherName]
    );
    const subject = new Subject({
      id: req.body.idSubject,
      title: req.body.subjectName,
      teacherEmail: queryteacher[0].teacherEmail,
      department: req.body.subjectRoom,
      day: req.body.subjectDay,
      startRecur: req.body.subjectStartRecur,
      endRecur: req.body.subjectEndRecur,
      start: req.body.subjectStartTime,
      end: req.body.subjectEndTime,
      target: req.body.subjectTarget,
      note: req.body.subjectNote,
      backgroundColor: req.body.subjectColor,
    });
    try {
      await query(
        `INSERT INTO subjects VALUE('${req.session.username}',?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        subject.post()
      );
      res.redirect("/subject");
    } catch (e) {
      res.redirect("/notfound");
    }
  })
  .delete(async (req, res) => {
    const subject = new Subject({
      id: req.body.idSubject,
    });
    try {
      await query("DELETE FROM subjects WHERE username=? AND idSubject=?", [
        req.session.username,
        subject.id,
      ]);
      res.redirect("/subject");
    } catch (e) {
      console.log(e.message);
      res.redirect("/notfound");
    }
  })
  .put(async (req, res) => {
    const queryteachers = await query(
      "SELECT teacherEmail FROM teacher WHERE username=? AND teacherName=?",
      [req.session.username, req.body.teacherName]
    );
    const modifySubject = new Subject({
      id: req.body.idSubject,
      title: req.body.subjectName,
      teacherEmail: queryteachers[0].teacherEmail,
      department: req.body.subjectRoom,
      day: req.body.subjectDay,
      startRecur: req.body.subjectStartRecur,
      endRecur: req.body.subjectEndRecur,
      start: req.body.subjectStartTime,
      end: req.body.subjectEndTime,
      target: req.body.subjectTarget,
      note: req.body.subjectNote,
      backgroundColor: req.body.subjectColor,
    });
    try {
      await query(
        "UPDATE subjects SET subjectRoom=? ,subjectWeek=?, subjectStartTime=?, subjectEndTime=?, subjectStartRecur=?, subjectEndRecur=?, subjectDay=?, teacherEmail=?, subjectTarget=?, subjectNote=?, subjectColor=? WHERE idSubject =? AND username=?",
        [
          modifySubject.department,
          // modifySubject.week,
          "",
          modifySubject.start,
          modifySubject.end,
          new Date(modifySubject.startRecur),
          new Date(modifySubject.endRecur),
          [modifySubject.day],
          modifySubject.teacherEmail,
          +modifySubject.target,
          modifySubject.note,
          modifySubject.backgroundColor,
          modifySubject.id,
          req.session.username,
        ]
      );
      res.redirect("/subject");
    } catch (e) {
      res.redirect("/notfound");
    }
  });
module.exports = router;
