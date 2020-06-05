const conn = require("../../models/connection");
const Event = require("../../controllers/classes/Event");

exports.getMethod = (req, res) => {
  conn.query(
    "SELECT * FROM events WHERE username=?",
    [req.session.username],
    (error, results, fields) => {
      let events = [];
      results.forEach((result) => {
        const opt = {
          title: result.eventName,
          start: result.eventStartTime,
          end: result.eventEndTime,
          department: result.eventPlace,
          note: result.eventNote,
          backgroundColor: "#" + result.eventColor,
        };
        let event = new Event(opt);
        events.push(event.send());
      });
      res.status(200).send(events);
    }
  );
};
