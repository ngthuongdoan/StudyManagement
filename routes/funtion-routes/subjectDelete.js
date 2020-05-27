const conn = require("../../models/connection");
const Subject = require("../../controllers/classes/Subject");

exports.postMethod = (req, res) => {
  const subject = new Subject({
    idSubject: req.body.idSubject
  });
  conn.query(
    "DELETE FROM subjects WHERE username=? AND idSubject=?",
    [req.session.username, subject.id()],
    (error, results, fields) => {
      console.log(error);
      console.log(results);
      if (error) {
        res.json({message:"Error",data:subject});
      } else {
        res.json({message:"Done",data:subject});
      }
    }
  );
};
