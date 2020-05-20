const conn = require("../models/connection");

exports.getMethod = (req, res) => {
  conn.query(
    "SELECT * FROM subjects WHERE username=?",
    [req.session.username],
    (error, results, fields) => {
      res.send(results);
    }
  );
};
