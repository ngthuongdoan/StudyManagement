const conn = require("../../models/connection");
const Event = require("../../controllers/classes/Event");

exports.postMethod = (req, res) => {
  const event = new Event({
    eventName: req.body.eventName,
  });
  console.log("Done");
  console.log(event);
  conn.query(
    "DELETE FROM events WHERE username=? AND eventName=?",
    [req.session.username, event.eventName],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.redirect("/notfound");
      } else {
        console.log(results);
        res.redirect("/event");
      }
    }
  );
};
