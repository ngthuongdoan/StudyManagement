const conn = require("../../models/connection");
const Subject = require("../../controllers/classes/Subject");

exports.postMethod = (req, res) => {
  const subject = new Subject({
    idSubject: req.body.idSubject
  });
  console.log(subject);
  conn.query(
    "DELETE FROM subjects WHERE username=? AND idSubject=?",
    [req.session.username, subject.getId()],
    (error, results, fields) => {
      console.log(error);
      console.log(results);
      if (error) {
        res.redirect("/notfound");
      } else {
        res.redirect("/subject");
      }
    }
  );
};
