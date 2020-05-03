const conn = require("../models/connection");

exports.sessionCheck = (req, res) => {
  conn.query(
    "SELECT * FROM sessions WHERE session_id = ?",
    [req.sessionID],
    (error, results, fields) => {
      try {
        // console.log(req);
        let data = JSON.parse(results[0].data);
        if (data.username !== req.session.username) {
          return false;
        }
      } catch (e) {
        if (null === results) {
          return false;
        }
      }
    }
  );
  return true;
};
