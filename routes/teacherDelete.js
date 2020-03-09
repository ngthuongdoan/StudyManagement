const conn = require("../models/connection");
const Teacher = require('../controllers/classes/Teacher');

exports.postMethod = (req, res) => {
  const teacher = new Teacher({
    name: req.body.teacherName,
    email: req.body.teacherEmail,
    number: req.body.teacherNumber
  });
  conn.query(
    "DELETE FROM teacher WHERE username=? AND teacherName=? AND teacherEmail=?",
    [req.session.username,teacher.name, teacher.email],
    (error, results, fields) => {
      if(!error) res.redirect("/teacher");
    }
  );
};
