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
          idSubject: result.idSubject,
          subjectName: result.subjectName,
          teacherEmail: result.teacherEmail,
          subjectRoom: result.subjectRoom,
          subjectWeek: result.subjectWeek,
          subjectDay: result.subjectDay,
          subjectStartRecur: result.subjectStartRecur,
          subjectEndRecur: result.subjectEndRecur,
          subjectStartTime: result.subjectStartTime,
          subjectEndTime: result.subjectEndTime,
          subjectTarget: result.subjectTarget,
          subjectNote: result.subjectNote,
          subjectColor: result.subjectColor,
        };
        let subject = new Subject(opt);
        subjects.push(subject.send());
      });
      res.status(200).send(subjects);
    }
  );
};
