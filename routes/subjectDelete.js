const conn = require("../models/connection");
const Subject = require("../controllers/classes/Subject");

exports.postMethod = (req, res) => {
    const subject = new Subject({
      id: req.body.idSubject,
    });
    conn.query(
      "DELETE FROM subjects WHERE username=? AND idSubject=?",
      [req.session.username,subject.id],
      (error, results, fields) => {
        conn.query(
          "DELETE FROM include WHERE username=? AND idSubject=?",
          [req.session.username,subject.id],
          (error, results, fields) => {
            if(!error) res.redirect("/subject");
          });
  });
};