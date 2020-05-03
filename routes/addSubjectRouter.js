const express = require("express");
// const session = require("../controllers/session");
const conn = require("../models/connection");
// const router = express.Router();

exports.postMethod = (req, res) => {
  //CHECK IF SESSION NOT EXPERIED
  //   if (session.sessionCheck(req, res)) {
  //     if (req.session.loggedin) {
  conn.query(
    "SELECT studyTime FROM subjects WHERE idSubject=? AND username=?",
    [req.body.idSubject, req.session.username],
    (error, results, fields) => {
      let studytime = req.body.studytime;
      if(results[0].studyTime) studytime += ", "+results[0].studyTime;
      console.log(studytime, results)
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
  //     } else {
  //       //PREVENT TO LOGIN /dashboard BY URL
  //       res.redirect("/login");
  //     }
  //   } else {
  //     //PREVENT TO LOGIN /dashboard BY URL
  //     res.redirect("/login");
  //   }
};
