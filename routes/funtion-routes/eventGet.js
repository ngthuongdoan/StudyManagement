const { query } = require("../../models/connection");
const Event = require("../../controllers/classes/Event");

exports.getMethod = async (req, res) => {
  const queryevents = await query("SELECT * FROM events WHERE username=?", [
    req.session.username,
  ]);
  let events = [];
  queryevents.forEach((result) => {
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
};
