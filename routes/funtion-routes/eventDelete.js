const conn = require("../../models/connection");
const Event = require("../../controllers/classes/Event");

exports.postMethod = (req, res) => {
  const event = new Event({
    eventName: req.body.eventName,
  });
  conn.query(
    "DELETE FROM events WHERE username=? AND eventName=?",
    [req.session.username, event.eventName],
    (error, results, fields) => {
      if (error) {
        res.redirect("/notfound");
      } else {
        res.redirect("/event");
      }
    }
  );
};
