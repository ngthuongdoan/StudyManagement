const conn = require("../../models/connection");
const Subject = require("../../controllers/classes/Subject");

exports.getMethod = (req, res) => {
  conn.query(
    "SELECT * FROM subjects WHERE username=?",
    [req.session.username],
    (error, results, fields) => {
      let subjects = [];
      results.forEach((result) => {
        const opt = {
          id: result.idSubject,
          title: result.subjectName,
          teacherEmail: result.teacherEmail,
          department: result.subjectRoom,
          week: result.subjectWeek,
          day: result.subjectDay,
          startRecur: result.subjectStartRecur,
          endRecur: result.subjectEndRecur,
          start: result.subjectStartTime,
          end: result.subjectEndTime,
          target: result.subjectTarget,
          note: result.subjectNote,
          backgroundColor: "#" + result.subjectColor,
        };
        let subject = new Subject(opt);
        subjects.push(subject.send());
      });
      res.status(200).send(subjects);
    }
  );
};
