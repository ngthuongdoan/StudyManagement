const conn = require("../models/connection");

exports.postMethod = (req, res) => {
  conn.query(
    "SELECT studyTime FROM subjects WHERE idSubject=? AND username=?",
    [req.body.idSubject, req.session.username],
    (error, results, fields) => {
      let studytime = req.body.studytime;
      if (results[0].studyTime) studytime += ", " + results[0].studyTime;
      console.log(studytime, results);
      conn.query(
        "UPDATE subjects SET studyTime = ? WHERE username=? and idSubject=?;",
        [studytime, req.session.username, req.body.idSubject],
        (error, result) => {
          console.log([studytime, req.session.username, req.body.idSubject]);
          console.log(result, studytime);
          if (!error) res.redirect(req.get("referer"));
        }
      );
    }
  );
};
