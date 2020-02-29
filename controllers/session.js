const conn = require("../models/connection");

exports.sessionCheck = (req, res) => {
  console.log("\x1b[30m\x1b[47m", req.sessionID);
  conn.query(
    `SELECT * FROM sessions WHERE session_id = ?`,
    [req.sessionID],
    (error, results, fields) => {
      if (undefined === results) {
        res.redirect("/logout");
        res.end();
      }
      let data = JSON.parse(results[0].data);
      if (data.username !== req.session.username) {
        res.redirect("/logout");
        res.end();
      }
    }
  );
};
